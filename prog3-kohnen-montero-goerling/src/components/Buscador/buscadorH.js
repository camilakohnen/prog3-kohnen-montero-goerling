import React, {Component} from 'react';

class BuscadorH extends Component{
    constructor(props){
        super(props)
        this.state = {
            busqueda: ''
        }
    }

    evitarsubmit(event){
        event.preventDefault()
        this.props.history.push('/results', {busqueda: this.state.busqueda}) // nos redirecciona a la pantalla que digamos
    }

    contorlarInput(event){
        this.setState({busqueda: event.target.value})
    }

    render(){
        return(
            <form onSubmit={(e) => this.evitarsubmit(e)}>
                <input 
                    value={this.state.busqueda}
                    onChange={(event)=> this.contorlarInput(event)} 
                />
                <button type='submit'>Enviar</button>
           </form>
        )
    }
}

export default BuscadorH;