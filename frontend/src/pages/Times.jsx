import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { getApi } from '../api/apis';
import '../css/Times.css'

function Times() {
    
    const [times, setTimes] = useState([])
    const { push } = useHistory();

    const getTimes = async () => {
        const { data } = await getApi('/times');
        setTimes(data)
    }


    useEffect(() => {
        getTimes()
    }, [])

    return(
        <div>
            {times.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>
                            Time
                        </th>
                        <th>
                            Estado
                        </th>
                        <th>
                            Quantidade de Jogadores
                        </th>
                        <th>
                            Estadio
                        </th>
                    </tr>
                </thead>
                <tbody>
            { times.map((element, index) => (
                    <tr className='trTimes' key={index} onClick={() => push(`/times/${element.nome}`)}>
                        <td>{element.nome}</td>
                        <td>{element.estado}</td>
                        <td>{element.quantidadeJogadores}</td>
                        <td>{element.estadio || 'Não Possui'}</td>
                    </tr>
                    )) }
                    </tbody>
            </table>
            ): <h5>Não possui nenhum time</h5>}
        </div>
    )
}

export default Times