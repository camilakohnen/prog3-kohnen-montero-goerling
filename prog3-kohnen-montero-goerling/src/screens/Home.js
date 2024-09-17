import React from "react";
import NovSinBoton from "../components/VerTodos/NovSinBoton";
import ClaSinBoton from "../components/VerTodos/ClaSinBoton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
    console.log('Este es mi jSon')
    return (
        <React.Fragment>
            <main>
                <Link to={"/novedades"}><h2>Novedades</h2></Link>
                <NovSinBoton/>
                <Link to={"/clasicos"}><h2>Mira los clásicos</h2></Link>    
                <ClaSinBoton/>
            </main>
        </React.Fragment>
    );
  }
  
  export default Home;