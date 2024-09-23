import React, { Component } from 'react';
import Novedades from '../components/Ver/novedades';

const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class NovedadesConBoton extends Component {
    constructor(props){
        super(props)
        this.state = {
            verMas : false,
            peliculas:[],
            MasMenos : false, 
        }
    }

    componentDidMount() {
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
                <h2>Novedades</h2> 
                <section className="card-container">
                    {this.state.peliculas.slice(0,5).map((elm)=> <Novedades data={elm}/>)}
                    {this.state.MasMenos === true ? <>{this.state.peliculas.slice(5, this.state.peliculas.length).map((elm)=> <Novedades data={elm}/>)}</> : null }
                </section>
                <button onClick={ () => this.MasMenosPeliculas()} className='more'> Mas Peliculas</button>
            </>
        )
    }

}

export default NovedadesConBoton;
