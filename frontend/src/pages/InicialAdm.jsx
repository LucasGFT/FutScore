import { useHistory } from 'react-router';


function InicialAdm() {
    const { push } = useHistory();

    return(
        <div>
            <div onClick={() => {
                console.log('as')
            }}>
                <h2>Editar Times</h2>
            </div>
            <div onClick={() => push('/tabela')}>
                <h2>Ver Tabelas</h2>
            </div>
            <div onClick={() => push('register/times')}>
                Cadastrar Times
            </div>
            <br />
            <br />
            <br />
            <div onClick={() => push('register/partidas')}>
                Cadastrar partidas
            </div>
            <br />
            <br />
            <br />
            <div onClick={() => push('partidas')}>
                Ver partidas
            </div>
        </div>
    )
}

export default InicialAdm