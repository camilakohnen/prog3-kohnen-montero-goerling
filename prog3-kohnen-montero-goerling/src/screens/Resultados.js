import React, { Component } from 'react';
import { Link } from "react-router-dom";
const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

export default class Resultados extends Component {
    constructor(props){
        super(props)
        this.state = { 
            resultados : [],
        }
    }

    componentDidMount(){
        const loQueBuscaElUsuario = this.props.history.location.state.busqueda
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${loQueBuscaElUsuario}`)
                .then((resp) => resp.json())
                .then(data => {
                    console.log('data', data);
                    this.setState({resultados: data.results})
                })
                .catch((err) => console.log('Error al obtener película:', err))
    }
  render() {
    return (
        <section className="card-container">
        {
            this.state.resultados.length > 0 ? 
            this.state.resultados.map(e => 
            <div className="character-card" key={e.id}>
                <img src={`https://image.tmdb.org/t/p/w342/${e.poster_path}`} alt={e.title} />
                <Link to={`/detalle/id/${e.id}`}>
                    <h2>{e.title}</h2>
                </Link>
                <section className='extra'>
                    <p>Adultos: {e.adult ? "atp" : "+18"}</p>
                </section>
                <button onClick={() => this.sacarDeStorage(e.id)}>
                    Sacar de favs
                </button>
                <p>{e.release_date}</p>
                {this.state.verMas && <p>{e.overview}</p>}
               
                {
            this.state.verMas === true ? <p>{this.props.data}</p> : null 
            }
            <button onClick={ () => this.verMasVerMenos()} className='more'> Ver mas</button>
            </div>) 
            : <h1> No hay reusltados de busqueda</h1>
        }
        </section>
    )
  }
}