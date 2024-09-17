import React from "react";
import "./nav.css";
import Opciones from "../Head";

const opcion = [
    {nombre: 'Home',ruta: '/'}, 
    {nombre:"Favoritos", ruta:'/favoritos'},
    {nombre:"Novedades", ruta:'/novedades'},
    {nombre:"Clásicos", ruta:'/clasicos'}
]

function Header(){
    return (
        <nav>
            <ul className="main-nav">
                {opcion.map((elm)=><Opciones data={elm}/>)}
            </ul>
            <ul className="user">
                <li> Movies <img src="./images/movies-icon-png-8.jpg" alt=""/></li>
            </ul>
        </nav>
    )
}

export default Header