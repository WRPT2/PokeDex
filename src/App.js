import React, { Component } from 'react';
import axios from 'axios';
import PokemonListDisplay from './components/PokemonListDisplay';
import Header from './components/Header';
import pokedex from './img/pokedex.png';
import Button from './components/Button';
import './css/app.css';

// Will change this from a list to look like a real pokedex

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonNumber: 1,
      pokemonName: '',
      sprite: '',
      types: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonNumber}`)
      .then((res) => {
        this.setState({
          pokemonName: res.data.name,
          sprite: res.data.sprites.front_default,
          types: res.data.types,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlePokemonChange = (value) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .then((res) => {
        this.setState({
          pokemonNumber: res.data.id,
          pokemonName: res.data.name,
          sprite: res.data.sprites.front_default,
          types: res.data.types,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handlePokemonChange = (changeValue) => {
  //   const value = changeValue === 'Next' ? this.state.next : this.state.prev;

  //   axios
  //     .get(value)
  //     .then((res) => {
  //       this.setState({
  //         pokemon: [],
  //         next: res.data.next,
  //         prev: res.data.previous,
  //         show: false,
  //       });
  //       res.data.results.forEach((val) => {
  //         axios
  //           .get(val.url)
  //           .then((res) => {
  //             let oldState = this.state.pokemon;
  //             this.setState({
  //               pokemon: [
  //                 ...oldState,
  //                 {
  //                   name: val.name,
  //                   sprite: res.data.sprites.front_default,
  //                   id: res.data.id,
  //                 },
  //               ],
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // handleShowPokemon = () => {
  //   let list = this.state.pokemon.sort((a, b) => a.id - b.id);
  //   this.setState({
  //     pokemon: list,
  //     show: !this.state.show,
  //   });
  // };

  render() {
    console.log(this.state.pokemonName[0], typeof this.state.pokemonName[0]);
    return (
      <div className="App">
        <Header />
        <div className="pokemonBox">
          <img src={pokedex} alt="pokedex" className="pokedex" />
          <img className="pokemonImg" src={this.state.sprite} alt="" />
          <button
            id="next"
            onClick={() => {
              let num = this.state.pokemonNumber + 1;
              this.handlePokemonChange(num);
            }}
          >
            {`>`}
          </button>
          <button
            id="prev"
            onClick={() => {
              let num = this.state.pokemonNumber - 1;
              this.handlePokemonChange(num);
            }}
          >
            {`<`}
          </button>
          <span id="number"># {this.state.pokemonNumber}</span>
          <p id="name">{this.state.pokemonName}</p>
        </div>
        {/* <button onClick={this.handleShowPokemon}>Show Pokemon</button> */}
        {/* <Button name="Next" buttonFn={this.handlePokemonChange} />
        <Button name="Prev" buttonFn={this.handlePokemonChange} /> */}
        {/* <ol>
          {this.state.show ? (
            <PokemonListDisplay pokemon={this.state.pokemon} />
          ) : null}
        </ol> */}
      </div>
    );
  }
}
