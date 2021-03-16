import React from 'react';
import "./page-home.css";
import logo from "./logo.svg";

import Modal from "./components/modal.js";

class PageHome extends React.Component{
    handleSubmit = e =>{
        e.preventDefault();
        this.props.history.push("/busqueda?"+ this.state.busqueda);
    };
    handleChange= e =>{
        this.setState({
            busqueda: e.target.value
        });
        
    }
    state = {
        busqueda: ""
    };
    render(){
        return (
            <div className="container">
                <div className="row centrado">
                    <div className="col-md-6 centrar">
                    <img src={logo} alt="" id="logo"/>
                    <form 
                    className="form-inline" 
                    onSubmit={this.handleSubmit} 
                    name="Form">
                        <div className="busqueda">
                            <input 
                                name="busqueda"
                                type="text" 
                                id="buscar" 
                                value={this.props.busqueda}
                                placeholder="Busca una banda" 
                                onChange={this.onChange}
                                />
</div>
<div className="actions">
    <button className="btng" type="sumbit">
        Search Similar Artisti
    </button>
    <button className="btng">Escuela DevRock</button>
</div>
</form>
                        </div>
                    </div>
                    
                </div>
            );
    }
}
export default PageHome;