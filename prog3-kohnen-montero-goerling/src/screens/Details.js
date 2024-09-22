import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            pelicula: null,
            esFavorito: false,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params; // Obtener el ID desde los parámetros de la URL
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log('Data de la película:', data);
                this.setState({
                    pelicula: data
                });
                // Verificar si la película es favorita al cargar
                this.verificarFavorito(data.id);
            })
            .catch((err) => console.log('Error al obtener datos:', err));
    }

    verificarFavorito(id) {
        let storage = localStorage.getItem('pelisFavs');
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            if (storageParseado.includes(id)) {
                this.setState({ esFavorito: true });
            }
        }
    }

    agregarAStorage() {
        const { pelicula } = this.state;
        if (pelicula) {
            const id = pelicula.id;
            let storage = localStorage.getItem('pelisFavs');
            if (storage !== null) {
                let storageParseado = JSON.parse(storage);
                if (!storageParseado.includes(id)) {
                    storageParseado.push(id);
                    let storageStringificado = JSON.stringify(storageParseado);
                    localStorage.setItem('pelisFavs', storageStringificado);
                    this.setState({ esFavorito: true });
                }
            } else {
                let arrFavs = [id];
                let favsStringificado = JSON.stringify(arrFavs);
                localStorage.setItem('pelisFavs', favsStringificado);
                this.setState({ esFavorito: true });
            }
        }
    }

    sacarDeStorage() {
        const { pelicula } = this.state;
        if (pelicula) {
            const id = pelicula.id;
            let storage = localStorage.getItem('pelisFavs');
            if (storage !== null) {
                let storageParseado = JSON.parse(storage);
                let filtrado = storageParseado.filter(idFav => idFav !== id);
                let storageStringificado = JSON.stringify(filtrado);
                localStorage.setItem('pelisFavs', storageStringificado);
                this.setState({ esFavorito: false });
            }
        }
    }

    verMasVerMenos() {
        this.setState(prevState => ({
            verMas: !prevState.verMas
        }));
    }

    render() {
        const { pelicula, verMas, esFavorito } = this.state;

        if (!pelicula) {
            return null; // No muestra nada si no hay datos de película
        }

        return (
            <div className="character-card">
                <img src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`} alt={pelicula.title} />
                <h2>{pelicula.title}</h2>
                <section className='extra'>
                    <p>Adultos: {pelicula.adult ? "atp" : "+18"}</p>
                    <p>{pelicula.release_date}</p>
                    
                    {esFavorito ? (
                        <button onClick={() => this.sacarDeStorage()}>
                            Sacar de favs
                        </button>
                    ) : (
                        <button onClick={() => this.agregarAStorage()}>
                            Agregar a favoritos
                        </button>
                    )}
                </section>
                {
                        this.state.verMas === true ? <p>{pelicula.overview}</p> : null 
                }
                <button onClick={ () => this.verMasVerMenos()} className='more'> Ver mas</button>
            </div>
        );
    }
}

export default withRouter(Details);
