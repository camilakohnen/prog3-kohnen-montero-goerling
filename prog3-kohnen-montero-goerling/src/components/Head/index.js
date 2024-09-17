import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Opciones(props){
    return(
        <Link className='opciones' to={props.data.ruta}>
            <li>{props.data.nombre}</li>
        </Link>
    )
}

export default Opciones