import React, { Component } from 'react';
import axios from 'axios';
import PokemonListDisplay from './components/PokemonListDisplay';
import Button from './components/Button';

// Will change this from a list to look like a real pokedex

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      show: false,
      next: '',
      prev: '',
    };
  }

  componentDidMount = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((res) => {
        this.setState({
          next: res.data.next,
          prev: res.data.previous,
        });
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

  handlePokemonChange = (changeValue) => {
    const value = changeValue === 'Next' ? this.state.next : this.state.prev;

    axios
      .get(value)
      .then((res) => {
        this.setState({
          pokemon: [],
          next: res.data.next,
          prev: res.data.previous,
          show: false,
        });
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

  handleShowPokemon = () => {
    let list = this.state.pokemon.sort((a, b) => a.id - b.id);
    this.setState({
      pokemon: list,
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleShowPokemon}>Show Pokemon</button>
        <Button name="Next" buttonFn={this.handlePokemonChange} />
        <Button name="Prev" buttonFn={this.handlePokemonChange} />
        <ol>
          {this.state.show ? (
            <PokemonListDisplay pokemon={this.state.pokemon} />
          ) : null}
        </ol>
      </div>
    );
  }
}
