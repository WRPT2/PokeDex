import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      show: false,
    };
  }

  componentDidMount = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((res) => {
        res.data.results.forEach((val) => {
          axios
            .get(val.url)
            .then((res) => {
              let oldState = this.state.pokemon;
              this.setState({
                pokemon: [
                  ...oldState,
                  {
                    name: val.name,
                    sprite: res.data.sprites.front_default,
                    id: res.data.id,
                  },
                ],
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleShowPokemon = (params) => {
    let list = this.state.pokemon.sort((a, b) => a.id - b.id);
    this.setState({
      pokemon: list,
      show: !this.state.show,
    });
  };

  render() {
    // console.log(this.state);

    const pokemonList = this.state.pokemon.map((val) => {
      return (
        <li key={val.sprite}>
          Name : {val.name} sprite:{' '}
          <img src={val.sprite} alt="pokemon sprite" /> ID : {val.id}
        </li>
      );
    });

    return (
      <div>
        <button onClick={this.handleShowPokemon}>Show Pokemon</button>
        <ol>{this.state.show ? pokemonList : null}</ol>
      </div>
    );
  }
}
