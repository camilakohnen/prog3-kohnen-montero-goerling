import React, { Component } from "react";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargando: true, 
        };
    }

    componentDidMount() {
                    setTimeout(() => {
                        this.setState({ cargando: false });
                    }, 3000);
    }

    

}

export default Loader;