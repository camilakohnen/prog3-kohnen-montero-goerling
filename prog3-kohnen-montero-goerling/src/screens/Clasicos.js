import React, { Component } from "react";
import Clasico from "../components/Ver/clasicos";
const APIKEY = '73bbcaff8fd928767c5142a00f422fa2';

class ClasicosConBoton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            peliculas: [],
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
                    peliculas: data.results
                });
                // Cambia el estado de cargando a false después de 3 segundos
                setTimeout(() => {
                    this.setState({ cargando: false });
                }, 3000);
            })
            .catch((err) => console.log(err));
    }

    MasMenosPeliculas() {
        this.setState(prevState => ({
            MasMenos: !prevState.MasMenos
        }));
    }

    render() {
        return (
            <>
                <h2>Clasicos</h2>
                {this.state.cargando ? (
                    <p>Cargando...</p>  // Mensaje de carga
                ) : (
                    <section className="card-container">
                        {this.state.peliculas.slice(0, 5).map((elm) => <Clasico data={elm} key={elm.id} />)}
                        {this.state.MasMenos === true ? <>{this.state.peliculas.slice(5, this.state.peliculas.length).map((elm) => <Clasico data={elm} key={elm.id} />)}</> : null}
                        <button onClick={() => this.MasMenosPeliculas()} className='more'> Mas Peliculas</button>
                    </section>
                )}
            </>
        );
    }
}

export default ClasicosConBoton;
