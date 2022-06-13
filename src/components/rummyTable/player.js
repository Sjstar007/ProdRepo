import React from 'react';
import {useEffect, useState} from "@types/react";
import userData from "./userData";
import {useSelector} from "react-redux";

export default function Player(){
    const [user, setUser] = useState(userData)
    const [currentPlayerChance, setCurrentPlayerChance] = useState(0)
    const [totalPlayer, setTotalPlayer] = useState(userData.length - 1)
    const [timer, setTimer] = useState(0)
    const [cardDetail, setCardDetail] = useState(useSelector(state => state.card_data))

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

    return(
        <>
            <div className="time" key={user.userId}>
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
            </div>
        </>
    )
}