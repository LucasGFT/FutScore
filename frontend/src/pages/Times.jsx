import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { getApi } from '../api/apis';
import InicialAdm from './InicialAdm';
import verifyCargo from '../utils/verifyUser';

function Times() {
    
    const [times, setTimes] = useState([])
    const { push } = useHistory();

    const getTimes = async () => {
        const { data } = await getApi('/times');
        console.log(data)
        setTimes(data)
    }


    useEffect(() => {
        getTimes()
    }, [])

    return(
        <div>
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
                    <tr key={index} onClick={() => push(`/times/${element.nome}`)}>
                        <td>{element.nome}</td>
                        <td>{element.estado}</td>
                        <td>{element.quantidadeJogadores}</td>
                        <td>{element.estadio || 'Não Possui'}</td>
                    </tr>
                    )) }
                    </tbody>
            </table>
        </div>
    )
}

export default Times