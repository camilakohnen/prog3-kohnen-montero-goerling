import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
            esFavorito: false,
            cargando: true,  // Estado de cargando
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params; // Obtener el ID desde los parámetros de la URL
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log('Data de la película:', data);
                this.setState({ pelicula: data });
                this.verificarFavorito(data.id);
                setTimeout(() => {
                    this.setState({ cargando: false });
                }, 3000);
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

    render() {
        const { pelicula, esFavorito } = this.state;

        return pelicula ? (
            this.state.cargando ? (
                <p>Cargando...</p>  // Mensaje de carga
            ) : (
            <div className="character-card-details">
                <img src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`} alt={pelicula.title} />
                <h2><strong>{pelicula.title}</strong></h2>
                <section className='extra'>
                    <p><strong>Fecha de estreno:</strong> {pelicula.release_date}</p>
                    <p><strong>Duración:</strong> {pelicula.runtime}</p>
                    <p><strong>Rating:</strong> {pelicula.popularity}</p>
                    <p><strong>Género:</strong> {pelicula.genres[0]?.name}</p>
                    <p><strong>Descripción:</strong> {pelicula.overview}</p>
                    <button onClick={() => esFavorito ? this.sacarDeStorage() : this.agregarAStorage()}>
                        {esFavorito ? "Sacar de favs" : "Agregar a favoritos"}
                    </button>
                </section>
            </div>
            )
        ) : null;
    }
}

export default withRouter(Details);