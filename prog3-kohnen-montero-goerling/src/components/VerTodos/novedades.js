import React, {Component} from "react";
import Novedad from "../Ver/novedades";
import "./Peliculas.css";
const APIKEY = '73bbcaff8fd928767c5142a00f422fa2'

class Novedades extends Component{
    constructor(props){
        super(props)
        this.state = {
            verMas : false,
            peliculas:[],
            MasMenos : false, 
            NombreBoton : "Más Peliculas",
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            
            this.setState({
                peliculas: data.results
            })
        })
        .catch((err) => console.log(err))
    }

    MasMenosPeliculas(){
        if(this.state.MasMenos === true){
            console.log(this.state);
            
            this.setState({
                MasMenos: false,
                NombreBoton : "Más Peliculas"
            })
        } else {
            this.setState({
                MasMenos: true, 
                NombreBoton : "Menos Peliculas"
            })
        }
    }

    

    render(){
        return (
            <>
                <h2>Novedades</h2>            
                <section className="card-container">
                    {this.state.peliculas.slice(0,3).map((elm)=> <Novedad data={elm}/>)}
                    {this.state.MasMenos === true ? <>{this.state.peliculas.slice(3, this.state.peliculas.length).map((elm)=> <Novedad data={elm}/>)}</> : null }
                </section>
                
                <button onClick={ () => this.MasMenosPeliculas()} className='more'> {this.state.NombreBoton}</button>
            </>
        )
    }
    
}

export default Novedades;