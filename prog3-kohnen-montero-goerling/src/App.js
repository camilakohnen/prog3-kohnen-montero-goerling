import Home from "../src/screens/Home";
import {Route, Switch} from 'react-router-dom'
import NotFound from "./screens/NotFound";
import Details from "./screens/Details";
import Navbar from "./components/Header";
import Favoritos from "./screens/Favoritos";
import NovedadesConBoton from "./screens/Novedades";
import ClasicosConBoton from "./screens/Clasicos";
import Resultados from "./screens/Resultados";
import Footer from "./components/Footer";

function App(props){
  console.log('Estas son las props de la aplicacion');
  return (
    <>
      <Navbar/>
      <Switch>
        <Route path='/' exact={true} component={Home}></Route>
        <Route path='/favoritos' component={Favoritos}></Route>
        <Route path='/novedades' component={NovedadesConBoton}></Route>
        <Route path='/clasicos' component={ClasicosConBoton}></Route>
        <Route path='/detalle/id/:id' component={Details}></Route>
        <Route path='/results' exact={true} component={Resultados}></Route>
        <Route path='' component={NotFound}></Route>
      </Switch>
      <Footer/>
    </>
  )
}

export default App;

