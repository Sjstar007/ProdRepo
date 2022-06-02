import React, {useEffect, useState, useTransition} from "react";
import "./main.css";
import userData from './userData';
import Dnd from './DragNDrop/index';
import {useSelector, useDispatch} from "react-redux";
import {setOrSequenceCards} from './setCardsUtils';
import {
    dropedCardsByPlayer, removeDropedCardByPlayer, insterNewCardToPlayer, removeClosedCards, setCardsInSeqAndSet
} from '../../redux/actions/index'

export default function Index() {
    let dispatch = useDispatch();
    const [user, setUser] = useState(userData)
    const [currentPlayerChance, setCurrentPlayerChance] = useState(0)
    const [totalPlayer, setTotalPlayer] = useState(userData.length - 1)
    const [timer, setTimer] = useState(0)
    const [cardDetail, setCardDetail] = useState(useSelector(state => state.card_data))
    const clone = useSelector(state => state.card_data);
    const setTimerForPlayer = (playerInfo) => {
        if (currentPlayerChance < totalPlayer) {
            setCurrentPlayerChance(currentPlayerChance + 1)
        } else {
            console.log("go it")
            setCurrentPlayerChance(0)
        }
        for (let i = 1; i <= 35; i++) {
            setTimeout(() => {
                let seconds = document.getElementById(playerInfo.userPlayTime);
                let ss = document.getElementById(playerInfo.userName)
                seconds.innerHTML = (35 - i);
                ss.style.strokeDashoffset = i * 12.5
            }, i * 1000)
        }
    }

    useEffect(() => {
        console.log(cardDetail)
        setInterval(() => {
            setTimerForPlayer(user[currentPlayerChance])
        }, 35000)

    }, [])

    const setOrSequence = (event,cards) => {
        event.preventDefault()
        let setAndSeuqence = setOrSequenceCards(cards.tasks)
        dispatch(setCardsInSeqAndSet(setAndSeuqence))
    }
    const dropSelectedCards = (event, cards) => {
        event.preventDefault();
        let keys = [];
        Object.values(cards.tasks).map(card => {
            if (card.isSelected == true) {
                keys.push(card.id)
            }
        })
        dispatch(dropedCardsByPlayer(keys))
        // delete clone.tasks[keys[0]]
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
        let clickedCardData = cardDetail.restCards[card.id];
        dispatch(insterNewCardToPlayer(clickedCardData))
        delete cardDetail.restCards[card.id]
        dispatch(removeClosedCards(cardDetail.restCards))
    }
    const getClosedCards = (card) => {
        return (<div className="closedCard" onClick={e => doAddCardToplayer(e, card)}>
            {card.id}
        </div>)
    }
    const getDropedCards = (cards) => {
        return (<div className="closedCard">
            {cards}
        </div>)
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
        </div>
        <div className="TablePool">
            <div className="multiPlayer"/>
            <div className="cardSection">
                <div className="deckSetion">
                    <div className="closedDeck">
                        {Object.values(cardDetail.restCards).map((card) => getClosedCards(card))}
                    </div>
                    <div className="openDeck">
                        {clone.DropedCards.map((card) => getDropedCards(card))}
                    </div>
                    <div className="finishSlot">
                        <h3>Finish Slot</h3>
                    </div>
                </div>
                <Dnd currentPlayerChance={currentPlayerChance}/>
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
