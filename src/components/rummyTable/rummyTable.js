import React, {useEffect, useState, useTransition} from "react";
import "./main.css";
import userData from './userData';
import Dnd from './DragNDrop/index';
import {useSelector, useDispatch} from "react-redux";
import {setOrSequenceCards} from './setCardsUtils';
import {
    dropedCardsByPlayer,
    removeDropedCardByPlayer,
    insterNewCardToPlayer,
    removeClosedCards,
    setCardsInSeqAndSet,
    sortCards
} from '../../redux/actions/index'

export default function Index() {
    let dispatch = useDispatch();
    const [user, setUser] = useState(userData)
    const [currentPlayerChance, setCurrentPlayerChance] = useState(0)
    const [totalPlayer, setTotalPlayer] = useState(userData.length)
    const [timer,setTimer] = useState(0)
    const [cardDetail, setCardDetail] = useState(useSelector(state => state.card_data))
    const clone = useSelector(state => state.card_data);
    const [wildCardArray,setWildCardArray] = useState([])
    const [toolTipOption,setToolTipOption] = useState(false)

    const getWildCard = () =>{
        let wildCardArray = [];
        for(let i=0;i<52;i+=13){
            wildCardArray.push(cardDetail.wildCards+i)
        }
        setWildCardArray(wildCardArray)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const setTimerForPlayer = async (playerInfo) => {
        for (let i = 1; i <= 35; i++) {
            // setTimeout(() => {
            //     let seconds = document.getElementById(playerInfo.userPlayTime);
            //     let ss = document.getElementById(playerInfo.userName)
            //     seconds.innerHTML = (35 - i);
            //     ss.style.strokeDashoffset = i * 12.5
            // }, i * 1000)
            let seconds = document.getElementById(playerInfo.userPlayTime);
            let ss = document.getElementById(playerInfo.userName)
            seconds.innerHTML = (35 - i);
            ss.style.strokeDashoffset = i * 12.5
            await sleep(1000);
        }
        if (currentPlayerChance < totalPlayer) {
            setCurrentPlayerChance(1)
            return
        } else {
            console.log("got it")
            setCurrentPlayerChance(0)
            return
        }
    }

    useEffect(() => {
        getWildCard()
    },[])

    const startGame = async () => {
        // setInterval(() => {
        //     setTimerForPlayer(user[currentPlayerChance])
        // }, 36000)
        while (true){
            await setTimerForPlayer(user[currentPlayerChance])
            await sleep(36000);
        }
    }

    const setOrSequence = (event,cards) => {
        event.preventDefault()
        let setAndSeuqence = setOrSequenceCards(cards,cardDetail.wildCards,cardDetail.handCards)
        console.log(setAndSeuqence)
        dispatch(setCardsInSeqAndSet(setAndSeuqence))
    }
    const dropSelectedCards = (event, cards) => {
        event.preventDefault();
        console.log(cards)
        let keys = [];
        Object.values(cards.handCards).map(card => {
            if (card.isSelected == true) {
                keys.push(card.index)
            }
        })
        dispatch(dropedCardsByPlayer(keys))
        let newColumn = {}
        // delete clone.handCards[keys[0]]
        Object.keys(clone.columns).map((column,id)=>{
            return  Object.values(clone.columns[column].cardsId).map((data,index) => {
                if(data === keys[0]) {
                    clone.columns[column].cardsId.splice(index,1)
                }
            })
        })
        console.log(clone)
        // dispatch(removeDropedCardByPlayer(clone.tasks))

    }
    const getPlayer = (user) => {
        return (<div className="time" key={user.userId}>
            {/* <div className="circle" > */}
            <div className="circle" style={{"--clr ": "#04fc43"}}>
                <svg>
                    <circle cx="70" cy="70" r="70"/>
                    <circle cx="70" cy="70" r="70" id={user.userName}/>
                </svg>
                <div>
                    <img src="https://img.icons8.com/nolan/64/user.png"/>
                    <h5>{user.userName}</h5>
                    <h6>{user.userCash}$</h6>
                </div>
            </div>
            <div id={user.userPlayTime}>35</div>
        </div>)
    }
    const doAddCardToplayer = (event, card) => {
        let clickedCardData = cardDetail.restCards[card.index];
        dispatch(insterNewCardToPlayer(clickedCardData))
        delete cardDetail.restCards[card.index]
        dispatch(removeClosedCards(cardDetail.restCards))
    }
    const getClosedCards = (card) => {
        return (<div className="closedCard" onClick={e => doAddCardToplayer(e, card)}>
            {card.index === 53 ? <img src="https://img.icons8.com/color/48/undefined/joker.png"/>:card.id}
        </div>)
    }
    const getDropedCards = (cards) => {
        return (
            <div className="closedCard">
                <span className="number top">{cardDetail.handCards[cards].cardName}</span>
                <p className="suit_top">{cardDetail.handCards[cards].icon}</p>
                <p className="suit">{cardDetail.handCards[cards].icon}</p>
                <span className="number bottom">{cardDetail.handCards[cards].cardName}</span>
            </div>
        )

    }

    const getWildCards = (card) =>{
        return (
            <div className="closedCard">
                <span className="number top">{cardDetail.deckOfCards[card].cardName}</span>
                <p className="suit_top">{cardDetail.deckOfCards[card].icon}</p>
                <p className="suit"><img src="https://img.icons8.com/color/48/undefined/joker.png"/></p>
                <span className="number bottom">{cardDetail.deckOfCards[card].cardName}</span>
            </div>
        )
    }
    const showToolTip = (event) =>{
        event.preventDefault();
        setToolTipOption(!toolTipOption)
    }
    return (<div className="main">
        <div className="GameNav">
            <div className="AddCash">
                <span>Win Real Cash Prizes!</span>
                <button type="button" className="">
                    Add Cash
                </button>
            </div>
            <div className="TableInfo">
                <div className="gameId">
                    <h3>#72964782364</h3>
                </div>
                <div className="RummyInfo">Points Rummy - 2 Deck</div>
                <div className="RummyChips">
                    <h4>
                        <span>svg</span>10
                    </h4>
                </div>
            </div>
            <div className="Settings">
                <button className="">Settings</button>
            </div>
            <div className="Exit">
                <h5>Leave Table</h5>
            </div>
            <button onClick={startGame()}>Start Game</button>
        </div>
        <div className="TablePool">
            <div className="multiPlayer"/>
            <div className="cardSection">
                <div className="deckSetion">
                    <div className="closedDeck">
                        <div >
                            <button className="checkWildCard" onMouseUpCapture={e => showToolTip(e)}>?</button>
                        </div>
                        <div className="wildCards" >
                            {wildCardArray.map(card=> getWildCards(card))}
                        </div>
                        {Object.values(cardDetail.restCards).reverse().map((card) => getClosedCards(card))}
                        {toolTipOption && (<div className="messageBox">
                                Working
                            </div>)}
                    </div>
                    <div className="openDeck">
                        {clone.DropedCards.reverse().map((card) => getDropedCards(card))}
                    </div>
                    <div className="finishSlot">
                        <h3>Finish Slot</h3>
                    </div>
                </div>
                <Dnd currentPlayerChance={currentPlayerChance} />
            </div>
            <div className="singlePlayer">
                {!!userData.length && userData.map(user => getPlayer(user))}
                <div className="playerOptions">
                    <button onClick={event => setOrSequence(event,cardDetail)} className="sortbtn">Sort</button>
                    <button className="dropbtn" onClick={e => dropSelectedCards(e, cardDetail)}>Drop</button>
                </div>
            </div>
        </div>
    </div>);
}

// export default Index;
