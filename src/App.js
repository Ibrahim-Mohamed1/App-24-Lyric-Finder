import React, { Component } from 'react';
import "./App.css"
import { withData } from './DataProvider';

class App extends Component {
  constructor(){
    super()
    this.state={
      artist: "",
      song: "",
      loading: ""
    }
  }

  componentDidMount(){
    this.props.getLyrics()
  }

  handleArtistChange = (e) => {
    e.preventDefault()
    this.setState({
      artist: e.target.value
    })
  }
  handleSongChange = (e) => {
    e.preventDefault()
    this.setState({
      song: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getLyrics(this.state.artist, this.state.song)
    this.setState({
      song: "",
      artist: "",
      loading: "loading..."
    })
  }

  render() {
    const styles={
      box:{
        textAlign:"center",
        width: 300,
        display:"block",
        margin:"auto",
        height: 350,
        overflowY:'scroll',
        marginTop: 30,
        border:"white solid",
        borderRadius: 10
      },
      form:{
        textAlign:"center",
        zoom: 2,
        marginTop: 5
      },
      button:{
        display: "block",
        margin: "auto",
        marginTop:".5em",
        zoom: .9,
        border:"white solid",
        borderRadius: 5,
        backgroundColor: "gold"
      },
      title:{
        textAlign:"center", 
        width: "90%", 
        display:"block",
        margin:"auto",
        color: "gold"
      }
    }
    return (
      <div>
        <h1 className="title" style={styles.title}>Lyric finder!</h1>
        <form style={styles.form} onSubmit={this.handleSubmit} action="">
          <input 
            style={{outline:"none", borderRadius: 2, border: "white", textAlign:"center"}}
            type="text" 
            name="artist" 
            value={this.state.artist}
            onChange={this.handleArtistChange}
            autoComplete='off'
            placeholder="Artist"
            autoFocus
            required
          />
          <br/>
          <input 
            style={{outline:"none", borderRadius: 2, border: "white", textAlign:"center"}}
            type="text" 
            name="song" 
            value={this.state.song}
            onChange={this.handleSongChange}
            autoComplete='off'
            placeholder="Song"
            required
          />
        <br/>
          <button className='button' style={styles.button}>Search</button>
        </form>
        {this.state.loading === "" ? 
          <h1 style={{color: 'gold', textAlign: "center"}}>Please search a song!</h1> : this.props.song === "" ? 
          <h1 style={{color:"gold", textAlign: "center"}}>{this.state.loading}</h1> : this.props.song !== "" ? 
          <h2 style={{margin: "15px 5%", textAlign: "center", color: "gold"}}>{this.props.song}</h2> : null
        }
      </div>
    );
  }
}

export default withData(App);