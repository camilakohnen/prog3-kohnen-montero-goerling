import React, {Component} from "react";
import Clasico from "../Ver/clasicos";
import "./Peliculas.css";
const APIKEY = '73bbcaff8fd928767c5142a00f422fa2'


class ClaSinBoton extends Component{
    constructor(props){
        super(props)
        this.state = {
            verMas : false,
            peliculas:[],
            MasMenos : false, 
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            
            this.setState({
                peliculas: data.results
            })
        })
        .catch((err) => console.log(err))
    }

    MasMenosPersonajes(){
        if(this.state.MasMenos === true){
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
                    {this.state.peliculas.slice(0,5).map((elm)=> <Clasico data={elm}/>)}
                    {this.state.MasMenos === true ? <>{this.state.peliculas.slice(5, this.state.peliculas.length).map((elm)=> <Clasico data={elm}/>)}</> : null }
                </section>
            </>
        )
    }
}

export default ClaSinBoton;