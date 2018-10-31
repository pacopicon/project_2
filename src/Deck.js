import React, { Component } from 'react';
import './Deck.css';
import BofC from './back/BofC.png'
const importAll = (r) => {
  return r.keys().map(r)
}

const setDeck = () => {
  return importAll(require.context('./cards', false, /\.png$/))
}

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: setDeck(),
      suits: 'HCDS',
      ranks: 'AKQJT98765432',
      topCard: BofC,
      isTopCardFaceUp: false,
      viewDeck: false,
      BofC,
      hand: []
    }
    this.shuffle = this.shuffle.bind(this)
    this.flipTopCard = this.flipTopCard.bind(this)
    this.renderCards = this.renderCards.bind(this)
    this.viewDeck = this.viewDeck.bind(this)
    this.dealCard = this.dealCard.bind(this)
    this.setButtonStyle = this.setButtonStyle.bind(this)
  }

  shuffle() {
    let 
      { deck, hand } = this.state,
      prevDeck = [...deck],
      newDeck = []

    if (hand.length > 0 || deck.length < 52) {
      prevDeck = setDeck()
    }

    for (let i=51; i>-1; i--) {
      let pos = Math.round(Math.random() * i)
      newDeck.push(prevDeck[pos])
      prevDeck.splice(pos, 1)
    }
    
      this.setState({
        deck: newDeck,
        hand: []
      }, () => {
        let { isTopCardFaceUp, deck, BofC } = this.state
        if (isTopCardFaceUp) {
          this.setState({
            topCard: deck[0]
          })
        } else {
          this.setState({
            topCard: BofC
          })
        }
      })
    
  }

  viewDeck(){
    const { viewDeck } = this.state
    this.setState({
      viewDeck: !viewDeck
    }, () => {
      let { isTopCardFaceUp, deck } = this.state
      if (isTopCardFaceUp) {
        this.setState({
          topCard: deck[0]
        })
      }
    })
  }

  flipTopCard() {
    let 
      { viewDeck, isTopCardFaceUp, BofC, deck} = this.state,
      topOfHeap = ''
    if (isTopCardFaceUp) {
      topOfHeap = BofC
    } else {
      topOfHeap = deck[0]
    }

    this.setState({
      isTopCardFaceUp: !isTopCardFaceUp,
      topCard: topOfHeap
    })

    if (viewDeck) {
      this.setState({
        viewDeck: false
      })
    }
  }

  renderCards(stackOfCards){
    let cards = stackOfCards.map( (card, i) => 
        <img className='card' key={i} src={card} alt='' />
      )
    return (
      <ul className='deck'>{cards}</ul>
    )
  }

  dealCard() {
    let 
      { deck }  = this.state, 
      dealtCard = [deck[0]],
      hand      = [...this.state.hand,...dealtCard]
    
    this.setState({
      hand,
      viewDeck: false,
      deck: deck.splice(1, deck.length-1)
    }, () => {
      let { isTopCardFaceUp, deck } = this.state
      if (isTopCardFaceUp) {
        this.setState({
          topCard: deck[0]
        })
      }
      if (deck.length === 0) {
        this.setState({
          topCard: ' '
        })
      }
    })

  }

  setButtonStyle() {
    let 
      { hand, viewDeck } = this.state,
      colNum = 4,
      width = 200

    if (hand.length == 52) {
      colNum = 1
      width = 800
    } else if (hand.length > 0 && hand.length < 52 || viewDeck) {
      colNum = 3
      width = 266.66
    }

    
    let style = { gridTemplateColumns: `repeat(${colNum}, ${width}px)` }
    
    return style
  }


  render() {

    let { deck, viewDeck, BofC, topCard, hand } = this.state

    let 
      variableWidth = !viewDeck || hand.length>0 ? { width: '200px' } : {},
      btnVarStyle = this.setButtonStyle()
      
      

    return (
      <div className="deckContainer">
        <div className='buttons' style={btnVarStyle} >
          <button className='btn shuffle' onClick={this.shuffle}>shuffle deck</button>
          {
            hand.length>0
            ? null
            : <button className='btn hideView' onClick={this.viewDeck}>{viewDeck ? 'hide card faces' : 'view card faces'}</button>
          }
          {
            hand.length>51 || viewDeck
            ? null
            : <button className='btn flip' onClick={this.flipTopCard}>flip top card</button>
          }
          {
            hand.length>51
            ? null
            : <button className='btn deal' onClick={this.dealCard}>deal card</button>
          }
        </div>
        <div style={variableWidth} className="cardContainer"> 
        {
          deck && viewDeck
          ? this.renderCards(deck)
          : (topCard ? <img className='topCard' key={topCard} src={topCard} alt='' /> : <img className='topCard' key={BofC} src={BofC} alt='' />)
        }
        </div>
        {
          hand.length>0
          ? <div className="handContainer">
              {this.renderCards(hand)}
            </div> 
          : ''
        }
      </div>
    );
  }
}

export default Deck;
