import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { postApi } from '../api/apis';
// import useLocalStorage from '../hooks/useLocalStorage';

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
    <div>
      <h1>nome app</h1>
      <form>
      <label>
        Email:
        <input
        onChange={({ target }) => setEmail(target.value)}
        value={email}
        type="email"
        placeholder="teste@teste.com"
        />
      </label>
      <label>
        Senha:
        <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        type="password"/>
      </label>
      <button
      type="button"
      onClick={()=> handleClick()}>
        Fazer Login
      </button>
      </form>
      { mensagemErroLogin && <h5>{mensagemErroLogin}</h5> }
      <button type="button" onClick={ () => push('/register')} >Ainda não tem cadastro</button>
    </div>
  );
}
export default Login;
