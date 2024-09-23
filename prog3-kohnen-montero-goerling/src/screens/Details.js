import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                this.setState({ pelicula: data });
                this.verificarFavorito(data.id);
            })
            .catch((err) => console.log('Error al obtener datos:', err));
    }

    verificarFavorito(id) {
        const storage = localStorage.getItem('pelisFavs');
        this.setState({ esFavorito: storage ? JSON.parse(storage).includes(id) : false });
    }

    agregarAStorage() {
        const { pelicula } = this.state;
        pelicula 
            ? (() => {
                const id = pelicula.id;
                const storage = localStorage.getItem('pelisFavs');
                const storageParseado = storage ? JSON.parse(storage) : [];
                !storageParseado.includes(id)
                    ? (() => {
                        localStorage.setItem('pelisFavs', JSON.stringify([...storageParseado, id]));
                        this.setState({ esFavorito: true });
                    })()
                    : null;
            })()
            : null;
    }

    sacarDeStorage() {
        const { pelicula } = this.state;
        pelicula 
            ? (() => {
                const id = pelicula.id;
                const storage = localStorage.getItem('pelisFavs');
                const storageParseado = storage ? JSON.parse(storage) : [];
                const filtrado = storageParseado.filter(idFav => idFav !== id);
                localStorage.setItem('pelisFavs', JSON.stringify(filtrado));
                this.setState({ esFavorito: false });
            })()
            : null;
    }

    render() {
        const { pelicula, esFavorito } = this.state;

        return pelicula ? (
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
        ) : null;
    }
}

export default withRouter(Details);
