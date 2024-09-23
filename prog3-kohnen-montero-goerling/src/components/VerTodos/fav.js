import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Peliculas.css";

const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculaExpandidaId: null, 
            peliculas: [],
            cargando: true, 
            esFavorito: true,
        };
    }

    componentDidMount() {
        let storage = localStorage.getItem('pelisFavs');
        if (storage) {
            console.log('Películas en storage:', storage);
            let arrParseado = JSON.parse(storage);
            if (arrParseado.length) {
                Promise.all(arrParseado.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`)
                        .then((resp) => resp.json())
                        .catch((err) => console.log('Error al obtener película:', err))
                ))
                .then((peliculas) => {
                    console.log('Películas cargadas:', peliculas); 
                    this.setState({ peliculas });
                    // Cambia el estado de cargando a false después de 3 segundos
                    setTimeout(() => {
                        this.setState({ cargando: false });
                    }, 3000);
                })
                .catch((err) => {
                    console.log('Error al cargar películas:', err);
                    this.setState({ cargando: false }); 
                });
            } else {
                this.setState({ cargando: false }); 
            }
        } else {
            this.setState({ cargando: false }); 
        }
    }

    sacarDeStorage(id) {
        let storage = localStorage.getItem('pelisFavs');
        if (storage) {
            let storageParseado = JSON.parse(storage);
            let filtrado = storageParseado.filter(idFav => idFav !== id);
            let storageStringificado = JSON.stringify(filtrado);
            localStorage.setItem('pelisFavs', storageStringificado);
            this.setState(prevState => ({
                peliculas: prevState.peliculas.filter(pelicula => pelicula.id !== id),
                esFavorito: false
            }));
        }
    }

    verMasVerMenos(id) {
        this.setState(prevState => ({
            peliculaExpandidaId: prevState.peliculaExpandidaId === id ? null : id
        }));
    }

    render() {
        return (
            <>
                <h2>Favoritos</h2>
                {this.state.cargando ? (
                    <p>Cargando...</p>
                ) : (
                    <section className="card-container">
                        {this.state.peliculas.map(e => (
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
                                {this.state.peliculaExpandidaId === e.id && <p>{e.overview}</p>}
                                <button onClick={() => this.verMasVerMenos(e.id)} className='more'>
                                    {this.state.peliculaExpandidaId === e.id ? 'Ver menos' : 'Ver más'}
                                </button>
                            </div>
                        ))}
                    </section>
                )}
            </>
        );
    }
    
}

export default Fav;
