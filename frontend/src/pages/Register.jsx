import { useState } from 'react'
import { useHistory } from 'react-router';
import { getApi, postApi } from '../api/apis';
import '../css/Register.css'


function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailJaEmUso, setEmailJaEmUso] = useState(false);
    const { push } = useHistory();

    const cadastrarNovoUser = async () => {
        let token;
        const test = await getApi(`/user/${email}`)
        if (test.status === 201) return setEmailJaEmUso(true)
        try {
            await postApi('/register', {
                 email,
                 password 
            }, { timeout: 5000 }).then((c) => token = c.data.token)
            push('/inicial')
        } catch (error) {
            console.log(error)
        }

    localStorage.setItem('user', JSON.stringify({
      email,
      password,
      token,
    }));
    }

    return(
        <div id='divRegister' >
            <h2 id='h2Register'>Register</h2>
            <form className='formRegister'>
                <label className='labelRegister' >
                    email:
                    <input className='inputRegister' value={email} onChange={({target}) => setEmail(target.value)} type="email" placeholder="escreva seu email" />
                </label>
                <label className='labelRegister' >
                    senha:
                    <input className='inputRegister' value={password} onChange={({target}) => setPassword(target.value)} type="password" placeholder="escreva sua senha" />
                </label>
                <button id='buttonRegister' type="button" onClick={() => {
                    setEmailJaEmUso(false)
                    cadastrarNovoUser(email, password);
                    setEmail('');
                    setPassword('');
                    }}>Cadastrar</button>
            </form>
            {(emailJaEmUso !== undefined && emailJaEmUso) && <h5 id='h5Register'>Esse email ja tem usuario</h5>}
        </div>
    )
}

export default Register