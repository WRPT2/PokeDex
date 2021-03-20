import React, { Component } from 'react';

export default class PokemonListDisplay extends Component {
  render() {
    console.log(this.props.pokemon);
    return (
      <>
        {this.props.pokemon.map((val) => {
          return (
            <li key={val.sprite}>
              Name : {val.name} sprite:{' '}
              <img src={val.sprite} alt="pokemon sprite" /> ID : {val.id}
            </li>
          );
        })}
      </>
    );
  }
}
