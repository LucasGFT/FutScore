import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login.jsx';
import TimesRegister from './pages/TimesRegister.jsx';
import PartidasRegister from './pages/PartidasRegister.jsx';
import Partidas from './pages/Partidas.jsx';
import Register from './pages/Register.jsx';
import Tabela from './pages/Tabela.jsx';
import Inicial from './pages/Inicial.jsx';
import Times from './pages/Times.jsx';
import TimeEspecifico from './pages/TimeEspecifico.jsx';

function App() {
  document.title = 'FutScore'
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register/times" component={ TimesRegister } />
        <Route exact path="/register/partidas" component={ PartidasRegister } />
        <Route exact path="/partidas" component={ Partidas } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/inicial" component={ Inicial } />
        <Route exact path="/tabela" component={ Tabela } />
        <Route exact path="/times" component={ Times } />
        <Route exact path="/times/:time" component={ TimeEspecifico } />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
