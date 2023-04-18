import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { postApi } from '../api/apis';
import '../css/Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagemErroLogin, setMensagemErroLogin] = useState('')
  const { push } = useHistory();

  const handleClick = async () => {
    try {
      const response = await postApi(`/user/login`, {
        email,
        password   
      })
      const token = response.data.token;
      localStorage.setItem('user', JSON.stringify({
        email,
        password,
        token,
      }));  
      push('/inicial')
    } catch (error) {
      setMensagemErroLogin(error.response.data);
    }
  }

  return (
    <div id='divLogin'>
      <h1 id='nomeProject'>FutScore</h1>
      <form id='formLogin'>
        <label className='labelLogin'>
          Email:
          <input
          className='inputLogin'
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          type="email"
          placeholder="teste@teste.com"
          />
        </label>
        <label className='labelLogin'>
          Senha:
          <input
          className='inputLogin'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"/>
        </label>
        <button
        type="button"
        id='buttonLogin'
        onClick={()=> handleClick()}>
          Fazer Login
        </button>
      </form>
      { mensagemErroLogin && <h5>{mensagemErroLogin}</h5> }
      <button id='buttonParaRegister'  type="button" onClick={ () => push('/register')} >Ainda não tem cadastro</button>
    </div>
  );
}
export default Login;
