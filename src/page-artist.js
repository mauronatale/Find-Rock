import React, { Component } from "react";
import SearchBar from "./components/search-bar.js";
import SimilarArtist from "./components/similar-artist.js"
import "./page-artist.css"
import Loading from "./components/loading.js";
import Error from "./components/error.js";
class PageSearchResult extends Component {
state ={
    data:{
        artist: {
            image: [
                {"#text": ""},
                {"#text": ""},
                {"#text": ""},
                {"#text": ""},
                {"#text": ""},
            ],
            bio: {
                summary:""
            },
            similar:{
                artist: [
                    {
                        name:"",
                        url:"",
                        image:[
                            {"#text":""},
                            {"#text":""},
                            {"#text":""},
                            {"#text":""},
                            {"#text":""},
                        ]
                    }
                ]
            }
        }
    }
};
componentDidUpdate(prevProps){
    if(this.props.location !== prevProps.location){
        this.fetchData();
    }
}


changeHandle = e => {
    this.setState({
    [e.target.name]: e.target.value
    });
};
componentDidMount(){
    this.fetchData();
}



fetchData = async ()=>{ 
    let artista= this.props.history.location.search.substr(1);
    let url= "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+
    artista+
    "&api_key=ede58f106aeac99609a8956dea286e7d&format=json";
    this.setState({
        loading: true
    });
    const response = await fetch (url);
    const data = await response.json();
    console.log(data, "Lo que trae la api")
    if(data.error){
    this.setState({  
    loading: false,
    error: true,
    errorMEnsaje: data.message
    });
    }else{
        this.setState({
            error: false,
            loading: false,
            data: data
        });
    }
    };


render() {
    return(
    <React.Fragment> 
        <SearchBar 
        onChange={this.changeHandle} 
        busqueda={this.state.busqueda}
        />
    {this.state.loading && <Loading />}
    {this.state.error && <Error errorMEnsaje={this.state.errorMEnsaje}></Error>}
        <div className="container">
            <div className="row centrar">
            <div className="col-md-3" />
            <div className="col-md-6">
            <img 
            src={this.state.data.artist.image[3]["#text"]} 
            alt=""
            className="pic-artist margenes50"
            />

            <h2>{this.state.data.artist.name}</h2>
            <p>{this.state.data.artist.bio.summary}</p>
            
            </div>
        </div>
        
        <SimilarArtist data={this.state.data.artist.similar.artist}/>
        </div>
        </React.Fragment>
    );
    }
}
    
export default PageSearchResult;
