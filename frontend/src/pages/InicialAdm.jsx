import { useHistory } from 'react-router';
import '../css/InicialAdm.css'


function InicialAdm() {
    const { push } = useHistory();

    return(
            <div className='container'>
                <div onClick={() => push('/tabela')}>
                    <p>Ver Tabelas</p>
                </div>
                <div onClick={() => push('register/times')}>
                    <p>Cadastrar Times</p>
                </div>
                <div onClick={() => push('register/partidas')}>
                    <p>Cadastrar partidas</p>
                </div>
                <div onClick={() => push('/partidas')}>
                    <p>Ver partidas</p>
                </div>
                <div onClick={() => push('/times')}>
                    <p>Ver times</p>
                </div>
            </div>
    )
}

export default InicialAdm