import React, {Component} from "react";
import Novedad from "../Ver/novedades";
import "./Peliculas.css";
const APIKEY = '73bbcaff8fd928767c5142a00f422fa2'

class NovSinBoton extends Component{
    constructor(props){
        super(props)
        this.state = {
            verMas : false,
            peliculas:[],
            MasMenos : false, 
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
                MasMenos: false 
            })
        } else {
            this.setState({
                MasMenos: true, 
            })
        }
    }


    render(){
        return (
            <>
                <section className="card-container">
                    {this.state.peliculas.slice(0,3).map((elm)=> <Novedad data={elm}/>)}
                    {this.state.MasMenos === true ? <>{this.state.peliculas.slice(3, this.state.peliculas.length).map((elm)=> <Novedad data={elm}/>)}</> : null }
                </section>
            </>
        )
    }
    
}

export default NovSinBoton;