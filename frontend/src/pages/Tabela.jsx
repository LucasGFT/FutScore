import { useHistory } from 'react-router';
import { useState, useEffect } from "react"
import { calcularPontuacao } from "../utils/CalcularPontuacao"
import '../css/Tabela.css'


function Tabela() {
        const [timesPontuacao, setTimesPontuacao] = useState([])
        const { push } = useHistory();

        const pontuacao = async () => {
            const result = await calcularPontuacao()
            setTimesPontuacao(result)
        }

    useEffect(() => {
        pontuacao()
    }, [])

    return(
        <div className='divTabela'>
            <h2 className='h2Tabela'>Tabela</h2>
            <table>
                <thead>
                    <tr>
                        <th className='thTabela'>
                            Time
                        </th>
                        <th className='thTabela'>
                            Vitorias
                        </th>
                        <th className='thTabela'>
                            Empates
                        </th>
                        <th className='thTabela'>
                            Derrotas
                        </th>
                        <th className='thTabela'>
                            Total Partidas
                        </th>
                        <th className='thTabela'>
                            Pontos
                        </th>
                    </tr>
                </thead>
                <tbody>
                { timesPontuacao.map((element, index) => (
                <tr className='trTabela'  key={index} onClick={() => push(`/times/${element.time}`)} >
                    <td className='tdTabela' >{element.time}</td>
                    <td className='tdTabela' >{element.vitorias}</td>
                    <td className='tdTabela' >{element.empates}</td>
                    <td className='tdTabela' >{element.derrotas}</td>
                    <td className='tdTabela' >{element.partidasJogadas}</td>
                    <td className='tdTabela' >{element.pontos}</td>
                </tr>    
            )) }
                </tbody>
            </table>
            
        </div>
    )
}

export default Tabela