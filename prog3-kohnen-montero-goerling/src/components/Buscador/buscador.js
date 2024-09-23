import React, {Component} from 'react';

class Buscador extends Component{
    constructor(props){
        super(props)
        this.state = {
            filtrar: ''
        }
    }

    evitarsubmit(event){
        console.log(event);
        event.preventDefault()
    }

    contorlarInput(event){
        this.setState({filtrar: event.target.value}, () => 
            this.props.filtrarPeliculas(this.state.filtrar)
        )
    }

    render(){
        return(
            <form onSubmit={(e) => this.evitarsubmit(e)}>
                <input 
                    value={this.state.filtrar}
                    onChange={(event)=> this.contorlarInput(event)} 
                />
                <button type='submit'>Enviar</button>
           </form>
        )
    }
}

export default Buscador;