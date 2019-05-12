import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            song: ""
        }
    }

    getLyrics = (artist, song)=> {
        this.setState({
            song: "Loading..."
        })
        axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res => {
            if(res.data.lyrics === "" || res.data === null){
                this.setState({
                    song: "No Song Found"
                })
            }else{
                this.setState({
                    song: res.data.lyrics
                })
            }
        }).catch(function(error) {
            window.location.reload()
        });  
    }

    render() {
        return (
            <Provider value={{
                getLyrics: this.getLyrics,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}