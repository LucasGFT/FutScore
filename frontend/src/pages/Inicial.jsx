import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import InicialAdm from './InicialAdm';
import verifyCargo from '../utils/verifyUser';
import '../css/Inicial.css'


function Inicial() {

    const { push } = useHistory();
    const [cargo, setCargo] = useState('');

    const user = async () => {
        const result = await verifyCargo()
        if (!result) return push('/login')
        setCargo(result)
    }

    useEffect(() => {
        user()
    }, [])

    
    return(
        <div className='divPrincipal'>
            <h2>Pagina Inicial</h2>
            { (cargo === 'administrador') ? (
            <InicialAdm />
            ) : (
                <div id='inicial'>
                    <div onClick={ () =>  push('/tabela') }>Ver tabelas</div>
                    <div onClick={ () =>  push('/partidas') }>Ver partidas</div>
                    <div onClick={ () =>  push('/times') } >Ver times</div>
                </div>
            ) }
        </div>
    )
}

export default Inicial