import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import TimesRegister from './pages/TimesRegister';
import PartidasRegister from './pages/PartidasRegister';
import Partidas from './pages/Partidas';
import Register from './pages/Register';
import Tabela from './pages/Tabela';
import Inicial from './pages/Inicial';
import Times from './pages/Times';
import TimeEspecifico from './pages/TimeEspecifico';

function App() {
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
