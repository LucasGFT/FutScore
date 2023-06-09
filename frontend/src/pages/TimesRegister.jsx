import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import verifyCargo from '../utils/verifyUser';
import { getApi, postApi } from '../api/apis';
import '../css/TimeRegister.css'



function CadastrarTime() {    
    const { push } = useHistory();
    const [nome, setNome] = useState('');
    const [jaTemTime, setJaTemTime] = useState(false);
    const [nomeEstadio, setNomeEstadio] = useState('');
    const [quantidadeJogadores, setQuantidadeJogadores] = useState(11);
    const [possuiEstadio, setPossuiEstadio] = useState(false);
    const [arrayEstados, setArrayEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState();
    const [cargo, setCargo] = useState('');

    const user = async () => {
        const result = await verifyCargo()
        if (!result) return push('/login')
        if (result !== 'administrador') return push('/inicial')
        setCargo(result)
    }

    useEffect(() => {
        estados();
        user();
    }, [])

    const post = async (event) => {
        const times = await getApi('/times');
        const jaTem = times.data.find((element) => element.nome.toLowerCase() === nome.toLowerCase())
        if (jaTem) return setJaTemTime(true)
        const objBody = {
                nome,
                estado: estadoSelecionado,
                quantidadeJogadores,
                partidas: [],
            }
        if (nomeEstadio !== '') objBody.estadio = nomeEstadio
        await postApi('/times/register',  objBody, { timeout: 5000 })
        push('/inicial')
    };

    const estados = async () => {
        await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
        const estados = response.data.map(estado => estado.nome);
        setArrayEstados(estados.sort())
    })
        .catch(error => {
        console.error(error);
        });
    }

    return(
        <div id='divTimeRegister'>
            { cargo === 'administrador' ? (

                <><h2 className='h2TimeRegister'>Registrar Time</h2><form id='formTimeRegister'>
                    <label className='labelTimeRegister'>
                        nome:
                        <input className='inputTimeRegister' value={nome} onChange={({ target }) => setNome(target.value)} type="text" placeholder="escreva o nome do time" />
                    </label>
                    <label className='labelTimeRegister'>
                        estado:
                        <select id='selectTimeRegister' value={estadoSelecionado} onChange={({ target }) => setEstadoSelecionado(target.value)}>
                            {arrayEstados.map((element) => (
                                <option key={element} value={element}>{element}</option>
                            ))}
                        </select>
                    </label>
                    <label className='labelTimeRegister'>
                        Quantidade de jogadores:
                        <input className='inputTimeRegister' min="11" max="50" value={quantidadeJogadores} onChange={({ target }) => setQuantidadeJogadores(target.value)} type="number" placeholder="escreva quantidade de jogadores" />
                    </label>
                    <label className='labelTimeRegister'>
                        possui estadio?
                        <input className='inputTimeRegister' type="radio" id="input1" name="estadio" onChange={() => setPossuiEstadio(true)} value="sim"></input>Sim
                        <input className='inputTimeRegister' type="radio" id="input2" name="estadio" onChange={() => setPossuiEstadio(false)} value="não"></input>Não
                    </label>
                    <br />
                    {possuiEstadio && (
                        <label className='labelTimeRegister'>
                            nome do estadio:
                            <input className='inputTimeRegister' value={nomeEstadio} onChange={({ target }) => setNomeEstadio(target.value)} type="text" placeholder="nome do estadio" />
                        </label>
                    )}
                    <button id='buttonTimeRegister' onClick={post} type="button">Cadastrar</button>
                </form></> 
                    ) : (
                        <h2>Não tem Acesso</h2>
                    ) }
            { jaTemTime && <h3>Ja foi criado esse time</h3> }
        </div>
    )
}

export default CadastrarTime