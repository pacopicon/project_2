import React, { Component } from 'react';
import './Deck.css';

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suits: 'HCDS',
      ranks: 'AKQJT98765432',
      shuffledDeck: '',
      topCard: ''
    }
    this.constructDeck = this.constructDeck.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.flipTopCard = this.flipTopCard.bind(this)
  }

  constructDeck() {
    let 
      { suits, ranks } = this.state,
      currentDeck = []

    for (let i=0; i<ranks.length; i++) {
      for (let j=0; j<suits.length; j++) {
        deck.push(ranks[i] + 'of' + suits[j])
      }
    }
    return currentDeck
  }

  shuffle() {
    let 
      currentDeck = this.constructDeck(),
      shuffledDeck = []

    for (let i=0; i<currentDeck.length; i++) {
      let pos = Math.floor((Math.random() * 52-i) + 1);
      shuffledDeck.push(currentDeck[pos])
    }
    this.setState({
      shuffledDeck
    })
  }


  render() {

    let { }

    return (
      <div className="Deck">
      Hi
      </div>
    );
  }
}

export default Deck;
