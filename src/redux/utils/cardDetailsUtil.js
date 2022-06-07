const cardType = ["❤", "♣", "♦", "♠"];
const cardNumber = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardDataArray = [];
const shuffleArray = require('array-shuffle')

// let i = Math.floor(Math.random() * 13);
// let joker = cardNumber[i]
// cardNumber.push(joker + 'j')
var colour = "balck";
const createCardData = () => {
    let idx = 1;
    for (let type of cardType) {
        for (let number of cardNumber) {
            if (type === '❤' || type === '♦') {
                colour = "red";
            } else {
                colour = "black"
            }
            let obj = {
                cardName: number, icon: type, color: colour, index: idx, isSelected: false, id: type + number
            }
            cardDataArray.push(obj)
            idx++;
        }
    }

    cardDataArray.push({
        cardName: 'Jkr', icon: '*', color: 'black', index: 53, isSelected: false, id: '*'
    })
}

console.log(cardDataArray)
createCardData()

module.exports = {
    cardDataArray, cardType, cardNumber
}

