import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { getApi } from '../api/apis';
import InicialAdm from './InicialAdm';
import verifyCargo from '../utils/verifyUser';
import { useParams } from 'react-router-dom';

function TimeEspecifico() {

    const [times, setTimes] = useState([])
    const [temOTime, setTemOTime] = useState()
    // const params = window.location.
    const { push } = useHistory();
    const { time } = useParams()

    const getTimes = async () => {
        await getApi(`/partidas/${time}`).then((partidas) => {setTemOTime(true); setTimes(partidas.data);})
        .catch((_err) => push('/times'));
    }


    useEffect(() => {
        getTimes();
    }, [])

    return(
        <div>{ temOTime && times.length > 0 ? (
            <>
            <h3>{`Todas as Partidas do ${time}`}</h3>
            <table>
                <thead>
                    <tr>
                        <th>
                            Time Mandante
                        </th>
                        <th>
                            Time Visitante
                        </th>
                        <th>
                            Placar
                        </th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {times.map((element, index) => {
                        let status;
                        if(element.comecou && !element.terminou) status = 'Andamento'
                        if(!element.comecou && !element.terminou) status = 'Não Comecou'
                        if(element.comecou && element.terminou) status = 'Terminou'
                        return (<tr key={index}>
                            <td>{element.timeCasaName}</td>
                            <td>{element.timeForaName}</td>
                            <td>{`${element.golsTimeCasa} x ${element.golsTimeFora}`}</td>
                            <td>{status}</td>
                        </tr>)
                    })}
                </tbody>
            </table></>
        ): (<h2>{`O ${time} ainda não tem nenhuma partida`}</h2>) }
        </div>
    )
}

export default TimeEspecifico