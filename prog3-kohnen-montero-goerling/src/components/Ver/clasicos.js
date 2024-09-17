import React,  {Component}  from "react";
import { Link } from "react-router-dom";

class Clasico extends Component {
    constructor(props){
        super(props)
        this.state = {
            verMas : false,
            esFavorito : false,
        }
    }

    componentDidMount(){
        let storage = localStorage.getItem('pelisFavs')
        if(storage !== null){
            let arrParseado = JSON.parse(storage) 
            let estaMiId = arrParseado.includes(this.props.data.id) 
            if(estaMiId){ 
                this.setState({
                    esFavorito: true 
                })
            }
        }
    }

    verMasVerMenos(){
        if(this.state.verMas === true){
            this.setState({
                verMas: false 
            })
        } else {
            this.setState({
                verMas: true, 
            })
        }
    }

    agregarAStorage(id){
        let storage = localStorage.getItem('pelisFavs')
        if(storage !== null){ 
            let storageParseado = JSON.parse(storage) 
            storageParseado.push(id) 
            let storageStringificado = JSON.stringify(storageParseado) 
            localStorage.setItem('pelisFavs',storageStringificado ) 
        }else{ 
            let arrFavs = [id]
            let favsStringificado = JSON.stringify(arrFavs) 
            localStorage.setItem('pelisFavs', favsStringificado) 
        }

        this.setState({
            esFavorito : true 
        })
    }



    sacarDeStorage(id){
        let storage = localStorage.getItem('pelisFavs')
        if(storage !== null ){
            let storageParseado = JSON.parse(storage) 
            let filtrado = storageParseado.filter( idFav => idFav !== id)
            let storageStringificado = JSON.stringify(filtrado) 
            localStorage.setItem('pelisFavs', storageStringificado) 
            this.setState({
                esFavorito : false 
            })
        }
    }

    render(){
        console.log(this.props);
        
        return(
            <div className="character-card">
                <img src= {`https://image.tmdb.org/t/p/w342/${this.props.data.poster_path}`} alt="" />
                <Link to={`/detalle/id/${this.props.data.id}`}>
                    <h2>{this.props.data.title}</h2>
                </Link>               
                <section className='extra'>
                     <p> Adultos: {this.props.data.adult ? "+18" : "atp"}</p>
                </section>  
                {
                    this.state.esFavorito ? 
                        <button onClick={() => {this.sacarDeStorage(this.props.data.id)}}> 
                            Sacar de favs 
                        </button>
                    :
                        <button onClick={() => {this.agregarAStorage(this.props.data.id)}}>
                            Agregar a favoritos
                        </button>
                }             
                <p>{this.props.data.release_date}</p>
                {
                        this.state.verMas === true ? <p>{this.props.data.overview}</p> : null 
                }
                <button onClick={ () => this.verMasVerMenos()} className='more'> Ver mas</button>
            </div>
        )
    }
}

export default Clasico