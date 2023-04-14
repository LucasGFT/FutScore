// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useHistory } from 'react-router';
// import { getApi, postApi } from '../api/apis';

import { useState, useEffect } from "react"
import { calcularPontuacao } from "../utils/CalcularPontuacao"


function Tabela() {
        const [timesPontuacao, setTimesPontuacao] = useState([])

        const pontuacao = async () => {
            const result = await calcularPontuacao()
            console.log(result)
            setTimesPontuacao(result)
        }

    useEffect(() => {
        pontuacao()
    }, [])

    return(
        <div>
            <h2>Tabela</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            Time
                        </th>
                        <th>
                            Vitorias
                        </th>
                        <th>
                            Empates
                        </th>
                        <th>
                            Derrotas
                        </th>
                        <th>
                            Total Partidas
                        </th>
                        <th>
                            Pontos
                        </th>
                    </tr>
                </thead>
                <tbody>
                { timesPontuacao.map((element, index) => (
                <tr key={index}>
                    <td>{element.time}</td>
                    <td>{element.vitorias}</td>
                    <td>{element.empates}</td>
                    <td>{element.derrotas}</td>
                    <td>{element.partidasJogadas}</td>
                    <td>{element.pontos}</td>
                </tr>    
            )) }
                </tbody>
            </table>
            
        </div>
    )
}

export default Tabela