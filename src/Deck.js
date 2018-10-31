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
      hand: [],
      howToUse: false
    }
    this.shuffle = this.shuffle.bind(this)
    this.flipTopCard = this.flipTopCard.bind(this)
    this.renderCards = this.renderCards.bind(this)
    this.viewDeck = this.viewDeck.bind(this)
    this.dealCard = this.dealCard.bind(this)
    this.setButtonStyle = this.setButtonStyle.bind(this)
    this.renderHowToUse = this.renderHowToUse.bind(this)
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
      { hand, viewDeck, howToUse } = this.state,
      colNum = 5,
      width = 200

    if (hand.length == 52 || howToUse) {
      colNum = 1
      width = 1000
    } else if (hand.length > 0 && hand.length < 52 || viewDeck) {
      colNum = 4
      width = 250
    }

    
    let style = { gridTemplateColumns: `repeat(${colNum}, ${width}px)` }
    
    return style
  }

  renderHowToUse() {
    this.setState({
      howToUse: !this.state.howToUse
    })
  }


  render() {

    let { deck, viewDeck, BofC, topCard, hand, howToUse } = this.state

    let 
      variableWidth = !viewDeck || hand.length>0 ? { width: '200px' } : {},
      btnVarStyle = this.setButtonStyle()
      
      

    return (
      <div className="deckContainer">
        <div className='buttons' style={btnVarStyle} >
          <button className='btn shuffle' onClick={this.renderHowToUse}>{howToUse ? 'Back' : 'About'}</button>
          {
            howToUse
            ? null
            : <button className='btn shuffle' onClick={this.shuffle}>shuffle deck</button>
          }
          {
            hand.length>0 || howToUse
            ? null
            : <button className='btn hideView' onClick={this.viewDeck}>{viewDeck ? 'hide card faces' : 'view card faces'}</button>
          }
          {
            hand.length>51 || viewDeck || howToUse
            ? null
            : <button className='btn flip' onClick={this.flipTopCard}>flip top card</button>
          }
          {
            hand.length>51 || howToUse
            ? null
            : <button className='btn deal' onClick={this.dealCard}>deal card</button>
          }
        </div>
        {
          howToUse 
          ? <div className='howToUse'>
              <p>
                Besides attempting to fulfill the spirit of the code challenge with a visual rendition of the sought after javascript logic, this project aims also to demonstrate how to handle as many use cases as may arise from the clicking of the UI buttons in random combinations.  The typical React code challenge asks for some sort of UI object that can be manipulated by the user and seeks to ascertain the programmer's skill at rendering these user manipulations.  But what happens when the user insists on manipulating the UI beyond the simple, linear tabulation of UI interactions and adopting a different combination from what may have seemed typical usage?  Edge cases may be found and the code may break.
              </p> 
                
              <p>
                This project tries to handle as many of these edge scenarios as possible. In order to test, don't just shuffle the deck or deal cards, shuffle the deck and deal cards with the top card flipped.  Deal 5 cards.  Deal 7 cards.  Deal all the cards.  What happens when they've all been dealt?  What happens if I try to shuffle when viewing all of the cards?  What happens to the deck state when I've dealt cards and then decide to shuffle?  (I recommend using React devtools and looking at state all the while clicking buttons)
              </p>
            </div>
          : <div>
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
            }
      </div>
    );
  }
}

export default Deck;
