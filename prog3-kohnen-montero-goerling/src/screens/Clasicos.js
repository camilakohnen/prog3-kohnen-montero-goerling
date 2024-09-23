import React, { Component } from "react";
import Clasico from "../components/Ver/clasicos";
import Buscador from '../components/Buscador/buscador'
const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class ClasicosConBoton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            peliculas: [],
            peliculasb: [],
            paginaACargar: 2,
            MasMenos: false,
            cargando: true,  // Estado de cargando
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    peliculas: data.results,
                    peliculasb: data.results
                });
                // Cambia el estado de cargando a false después de 3 segundos
                setTimeout(() => {
                    this.setState({ cargando: false });
                }, 3000);
            })
            .catch((err) => console.log(err));
    }

    filtrarPeliculas(nombrePelicula){
        const peliculasFiltradas = this.state.peliculasb.filter(
            (elm) => elm.title.toLowerCase().includes(nombrePelicula.toLowerCase())
        )
        this.setState({
            peliculas: peliculasFiltradas
        })
    }

    MasMenosPeliculas(){
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&page=${this.state.paginaACargar}`)
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                MasMenos: true,
                peliculas: this.state.peliculas.concat(data.results),
                peliculasb: this.state.peliculasb.concat(data.results),
                paginaACargar : this.state.paginaACargar + 1
            })
        })
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <>
                <h2>Clásicos</h2>
                {this.state.cargando ? (
                    <p>Cargando...</p>  // Mensaje de carga
                ) : (
                    <>
                    <Buscador filtrarPeliculas={(nombre) => this.filtrarPeliculas(nombre)}/>
                    <section className="card-container">
                        {this.state.peliculas.slice(0, 5).map((elm) => <Clasico data={elm} key={elm.id} />)}
                        {this.state.MasMenos === true ? <>{this.state.peliculas.slice(5, this.state.peliculas.length).map((elm) => <Clasico data={elm} key={elm.id} />)}</> : null}
                    </section>
                    <button onClick={() => this.MasMenosPeliculas()} className='more'> Mas Peliculas</button>
                    </>
                )}
            </>
        );
    }
}

export default ClasicosConBoton;
