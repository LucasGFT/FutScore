import { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import verifyUser from '../utils/verifyUser';
import { getApi, postApi } from '../api/apis';
import '../css/PartidaRegister.css'


function CadastrarTime() {    
    const { push } = useHistory();
    const [date, setDate] = useState("");
    const [messageRegistrar, setMessageRegistrar] = useState("")
    const [timeSelecionado1, setTimeSelecionado1] = useState("");
    const [timeSelecionado2, setTimeSelecionado2] = useState("");
    const [times, setTimes] = useState([])

    const handleClickButton = async () => {
        await postApi('/partida/register', {
            timeCasaName: timeSelecionado1,
            timeForaName: timeSelecionado2,
            horario: date,
            golsTimeCasa: 0,
            golsTimeFora: 0,
        }).then(response => setMessageRegistrar('Criado com sucesso'))
        .catch((erro) => setMessageRegistrar(erro.response.data))
        // push('/inicial')
    }

    const handleDate = ({target}) => {
        setDate(new Date(target.value))
    }

    const handleTimeChange1 = (event) => {
        setTimeSelecionado1(event.target.value);
    }

    const handleTimeChange2 = (event) => {
        setTimeSelecionado2(event.target.value);
    }

    const opcoes1 = times.filter(time => time !== timeSelecionado2).map(time => (
        <option key={time} value={time}>{time}</option>
    ));

    const opcoes2 = times.filter(time => time !== timeSelecionado1).map(time => (
        <option key={time} value={time}>{time}</option>
    ));
  
    const cargo = async () => {
        const tes = await verifyUser();
        if (!tes) push('/login')
    }

    useEffect(() => {
        getTimes()
        cargo();
    }, [])

    const getTimes = async () => {
        const { data } = await getApi('/times');
        return setTimes(data.map((element) => element.nome));
    };

    return(
        <div id='divPartidasRegister'>
            <h2 id='h2PartidasRegister'>Registrar Partida</h2>
            <form id='formPartidasRegister'>
                <label className='labelPartidasRegister'>
                    Time Mandante:
                    <select className='selectPartidasRegister' id="select1" name="select1" value={timeSelecionado1} onChange={handleTimeChange1}>
                        <option value="">Selecione uma opção</option>
                        {opcoes1}
                    </select>
                </label>
                <label className='labelPartidasRegister'>
                    Time Visitante:
                    <select className='selectPartidasRegister' id="select2" name="select2" value={timeSelecionado2} onChange={handleTimeChange2}>
                        <option value="">Selecione uma opção</option>
                        {opcoes2}
                    </select>
                </label>
                <label className='labelPartidasRegister'>
                    Horario:
                    <input id='inputPartidaRegister' min={new Date().toISOString().split("T")[0]} type='datetime-local' onChange={handleDate}></input>
                </label>
                <button id='buttonPartidasRegister' type='button' onClick={handleClickButton}>Criar Partida</button>
            </form> 
            { messageRegistrar !== '' && (<h4>{messageRegistrar}</h4>) }
        </div>
    )
}

export default CadastrarTime