function cardTypeCheck(cards) {
    let flag = true;
    for (let i = 1; i < cards.length; i++) {
        if (cards[i - 1].icon !== cards[i].icon) {
            flag = false
        }
    }
    return flag;
}

function cardSequenceCheck(cards) {

    var seq = [];
    let flag = true;
    for (let card of cards) {
        seq.push(card.index)
    }
    let sortSq = seq.sort((a, b) => a - b)
    let count = 0;
    for (let i = sortSq[0]; i < sortSq[sortSq.length - 1]; i++) {
        if (sortSq[count] !== i) {
            flag = false
        }
        count++;
    }
    return flag;

}

function set(cards) {

    let flag = true;
    for (let i = 1; i < cards.length; i++) {
        if (cards[i - 1].cardName !== cards[i].cardName) {
            flag = false
        }
    }
    return flag;

}

function PureSequence(cards) {

    if (cardTypeCheck(cards) == true && cardSequenceCheck(cards) == true) {
        return true;
    } else {
        return false;
    }
}

function ImpureSequence() {

}

function Set(cards) {
    if (set(cards) == true) {
        return true;
    } else {
        return false;
    }
}

function PureSet(cards) {
    if (set(cards) == true && cardTypeCheck(cards) == true) {
        return true;
    } else {
        return false;
    }
}

const sequence = (cardArrayForSequence) => {
    if (cardArrayForSequence.length >= 3) {
        if (PureSequence(cardArrayForSequence)) {
            return "PureSequence";
        } else if (ImpureSequence(cardArrayForSequence)) {
            return "ImpureSequence"
        } else if (Set(cardArrayForSequence)) {
            return "Set"
        } else if (PureSet(cardArrayForSequence)) {
            return "PureSet"
        }
    }
}
module.exports = {
    sequence
}
