import React from "react";
import NovSinBoton from "../components/VerTodos/NovSinBoton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
    console.log('Este es mi jSon')
    return (
        <React.Fragment>
            <main>
                <Link to={"/novedades"}><h2>Novedades</h2></Link>
                <NovSinBoton/>
            </main>
        </React.Fragment>
    );
  }
  
  export default Home;