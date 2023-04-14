import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import InicialAdm from './InicialAdm';
import verifyCargo from '../utils/verifyUser';

function Inicial() {

    const { push } = useHistory();
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [password, setPassword] = useState('');
    const [emailJaEmUso, setEmailJaEmUso] = useState(false);

    const user = async () => {
        const result = await verifyCargo()
        if (!result) return push('/login')
        setCargo(result)
    }

    useEffect(() => {
        user()
    }, [])

    return(
        <div>
            <h2>Pagina Inicial</h2>
            { (cargo === 'administrador') ? (
            <InicialAdm />
            ) : (
                <div>
                    <h3 onClick={ () => push('/tabela') }>Ver tabelas</h3>
                    <h3 onClick={ () => push('/partidas') }>Ver partidas</h3>
                    <h3>Ver times</h3>
                </div>
            ) }
        </div>
    )
}

export default Inicial