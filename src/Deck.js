import React, { Component } from 'react';
import './Deck.css';
import BofC from './back/BofC.png'
const importAll = (r) => {
  return r.keys().map(r)
}

const cards = importAll(require.context('./cards', false, /\.png$/))

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards,
      suits: 'HCDS',
      ranks: 'AKQJT98765432',
      shuffledDeck: '',
      topCard: '',
      viewDeck: false,
      BofC
    }
    this.constructDeck = this.constructDeck.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.flipTopCard = this.flipTopCard.bind(this)
    this.renderDeck = this.renderDeck.bind(this)
    this.viewDeck =this.viewDeck.bind(this)
  }

  constructDeck() {
    let 
      { suits, ranks } = this.state,
      currentDeck = []

    for (let i=0; i<ranks.length; i++) {
      for (let j=0; j<suits.length; j++) {
        currentDeck.push(ranks[i] + 'of' + suits[j])
      }
    }
    return currentDeck
  }

  shuffle() {
    let 
      { cards, shuffledDeck, viewDeck, BofC } = this.state,
      prevDeck = cards ? [...cards] : [...shuffledDeck],
      newDeck = []

    for (let i=51; i>-1; i--) {
      let pos = Math.round(Math.random() * i)
      newDeck.push(prevDeck[pos])
      prevDeck.splice(pos, 1)
    
      this.setState({
        shuffledDeck: newDeck,
        topCard: !viewDeck ? shuffledDeck[0] : BofC
      })
    }
  }

  viewDeck(){
    this.setState({
      viewDeck: !this.state.viewDeck
    })
  }

  flipTopCard() {
    
    let 
      { 
        shuffledDeck, 
        cards, 
        BofC, 
        topCard,
        viewDeck 
      } = this.state,
      prevDeck = shuffledDeck ? shuffledDeck : cards,
      topOfHeap = ''
    
    if (topCard && !topCard.startsWith('/static/media/BofC') && !viewDeck) {
      topOfHeap = BofC
    } else {
      topOfHeap = prevDeck[0]
    }

    this.setState({
      topCard: topOfHeap
    })

    if (this.state.viewDeck) {
      this.setState({
        viewDeck: false
      })
    }
  }

  renderDeck(){
    let 
      { cards, shuffledDeck } = this.state,
      renderedCards = shuffledDeck ? shuffledDeck : cards

    let deck = renderedCards.map( (card) => 
        <img className='card' key={card} src={card} alt='' />
    )
      
    return (
      <ul className='deck'>{deck}</ul>
    )
  }


  render() {

    let { cards, viewDeck, BofC, topCard } = this.state

    return (
      <div className="Deck">
      <div style={{paddingBottom: '20px'}}>
        <button onClick={this.shuffle}>shuffle deck</button>
        <button onClick={this.viewDeck}>{viewDeck ? 'hide card faces' : 'view card faces'}</button>
        <button onClick={this.flipTopCard}>{viewDeck ? 'gather deck under top card' : 'flip top card'}</button>
      </div>
      <div>
      {
        cards && viewDeck
        ? this.renderDeck()
        : (topCard ? <img className='card' key={topCard} src={topCard} alt='' /> : <img className='card' key={BofC} src={BofC} alt='' />)
      }
      </div>
      </div>
    );
  }
}

export default Deck;
