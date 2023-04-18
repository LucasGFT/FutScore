import { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { getApi, putApi } from '../api/apis';
import verifyCargo from '../utils/verifyUser';
import '../css/Partidas.css'



function CadastrarTime() {    
    const { push } = useHistory();
    const [allPartidas, setAllPartidas] = useState();
    const [partidasNaoComecou, setPartidasNaoComecou] = useState({});
    const [naoTemUmaPartida, setNaoTemUmaPartida] = useState(true);
    const [partidasAndamento, setPartidasAndamento] = useState({});
    const [partidasTerminou, setPartidasTerminou] = useState({});
    const [mostrarAlterarPlacar, setMostrarAlterarPlacar] = useState(false)
    const [indexMostrarAlterar, setIndexMostrarAlterar] = useState()
    const urlStatusPartida = '/partida/status'
    const [cargo, setCargo] = useState("");

    useEffect(() => {
        user();
        getPartidas()
    }, [])

    const atualizarGanhoPartida = async (id) => {
        await putApi('/partida/pontos', {
            id,
        })
    }

    const atualizarStatus = async (id, keyAtualizar, valorAtualizar) => {
        await putApi(urlStatusPartida, {
            id,
            keyAtualizar,
            valorAtualizar,
        })
    }

    const trocarPlacar = async ({target}, {_id}) => {
        setMostrarAlterarPlacar(false)
        const gols1 = target.parentNode.children[0].value
        const gols2 = target.parentNode.children[1].value
        target.parentNode.parentNode.parentNode.children[1].innerHTML = `${gols1} x ${gols2}`
        await putApi('/partida/placar', {
            id: _id,
            golsTimeCasa: gols1,
            golsTimeFora: gols2,
        })
    }

    const removerPartidaAndamentoDoSetState = (obj) => {
        const result = partidasAndamento.filter((element) => element._id !== obj._id)
        setPartidasAndamento(result);
        setPartidasTerminou([...partidasTerminou, obj])
    }

    const removerPartidaNaoComecouDoSetState = (obj) => {
        const result = partidasNaoComecou.filter((element) => element._id !== obj._id)
        setPartidasNaoComecou(result);
        setPartidasAndamento([...partidasAndamento, obj])
    }

    const handleClickButton = async (index) => {
        setIndexMostrarAlterar(index)
        if (!mostrarAlterarPlacar) return setMostrarAlterarPlacar(true)
        setMostrarAlterarPlacar(false)
    };
  
    const user = async () => {
        const result = await verifyCargo()
        if (!result) return push('/login')
        setCargo(result)
    }

    const getPartidas = async () => {
        const { data } = await getApi(urlStatusPartida)
        const arrays = Object.values(data);
        if (arrays[0].length !== 0 || arrays[1].length !== 0 || arrays[2].length !== 0) setNaoTemUmaPartida(false)
        setAllPartidas(data)
        setPartidasNaoComecou(data.naoComecou)
        setPartidasAndamento(data.andamentos)
        setPartidasTerminou(data.terminadas)
    }

    

    return(
        <div>
            { allPartidas ?  (
                <div>
                    {partidasNaoComecou.length > 0 && (
                        <><h2>Partidas que nao comecaram</h2><table>
                            <thead>
                                <tr>
                                    <th>
                                        Times Mandante
                                    </th>
                                    <th>
                                        Time Visitante
                                    </th>
                                    <th>
                                        Horario
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {partidasNaoComecou.map((element, index) => {
                                    const data = new Date(element.horario);
                                    return (
                                        <tr className='trPagina' key={index}>
                                            <td>{element.timeCasaName}</td>
                                            <td>{element.timeForaName}</td>
                                            <td>{data.toLocaleString()}</td>
                                            { cargo === 'administrador' && (
                                                <td><button id='buttonComecarPartidas' type="button" onClick={() => {
                                                    atualizarStatus(element._id, 'comecou', true);
                                                    removerPartidaNaoComecouDoSetState(element)
                                                    }}>Comecar Partida</button></td>
                                            ) }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table></>
                    )}
                    {partidasAndamento.length > 0 && (
                        <><h2>Partidas em Andamento</h2><table>
                            <thead>
                                <tr>
                                    <th>
                                        Times Mandante
                                    </th>
                                    <th>
                                        Placar
                                    </th>
                                    <th>
                                        Time Visitante
                                    </th>
                                    {/* <th> </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {partidasAndamento.map((element, index) => {
                                    return (
                                        <tr className='trPagina' key={index}>
                                            <td>{element.timeCasaName}</td>
                                            <td id="placarEmAndamento">{`${element.golsTimeCasa} x ${element.golsTimeFora}`}</td>
                                            <td>{element.timeForaName}</td>
                                            { cargo === 'administrador' && (<>
                                            <td>
                                                <button id='btnAlterarPlacar' onClick={() => handleClickButton(index)}>AlterarPlacar</button>
                                                {mostrarAlterarPlacar && indexMostrarAlterar === index && (
                                                    <div id='inputsTrocaPlacar' >
                                                        <input type="number"></input>
                                                        <input type="number"></input>
                                                        <button onClick={(event) => trocarPlacar(event, element)}>Trocar</button>
                                                    </div>
                                                )}
                                            </td>
                                                <td><button id='btnTerminarPartida' type="button" onClick={async () => {
                                                    atualizarStatus(element._id, 'terminou', true);
                                                    removerPartidaAndamentoDoSetState(element);
                                                    await atualizarGanhoPartida(element._id)
                                                }}>Terminar Partida</button></td>
                                                </>
                                            ) }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table></>
                        )}
                        {partidasTerminou.length > 0 && (
                            <><h2>Partidas que terminou</h2><table>
                            <thead>
                                <tr>
                                    <th>
                                        Times Mandante
                                    </th>
                                    <th>
                                        Time Visitante
                                    </th>
                                    <th>
                                        Horario
                                    </th>
                                    <th>
                                        Placar
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {partidasTerminou.map((element, index) => {
                                    const data = new Date(element.horario);
                                    return (
                                        <tr className='trPagina' key={index}>
                                            <td>{element.timeCasaName}</td>
                                            <td>{element.timeForaName}</td>
                                            <td>{data.toLocaleString()}</td>
                                            <td>{`${element.golsTimeCasa} x ${element.golsTimeFora}`}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table></>
                        )}
                        { naoTemUmaPartida && (
                        <h2>Não tem nenhuma partida salva</h2>
                    ) }
            </div>
            ) : (
                <p>Carregando...</p>
            ) }
        </div>
    )
}

export default CadastrarTime