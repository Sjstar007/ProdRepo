function cardTypeCheck(cards) {
    let flag = true;
    for (let i = 1; i < cards.length; i++) {
        if (cards[i - 1].index === 53) {
            break;
        }
        if (cards[i - 1].icon !== cards[i].icon) {
            flag = false
        }
    }
    return flag;
}

function cardTypeCheckForImpure(cards) {
    let flag = true;
    for (let i = 1; i < cards.length; i++) {
        if (cards[i - 1].index === 53) {
            continue;
        }
        if (cards[i - 1].icon !== cards[i].icon) {
            flag = false
        }
    }
    return flag;
}

function cardImpureSequenceCheck(cards, wildCard) {
    const seq = [];
    for (let card of cards) {
        seq.push(card.index)
    }
    let sortSq = seq.sort((a, b) => a - b)
    for (let i = 0; i < sortSq.length - 1; i++) {
        // console.log(seq[i]);
        if (sortSq[i] === 53 || wildCard.includes(sortSq[i]) || wildCard.includes(sortSq[i + 1])) {
        } else if (sortSq[i + 1] - sortSq[i] !== 1) {
            // && (!wildCard.includes(sortSq[i + 1]) && wildCard.includes(sortSq)) && ()) { //  10,11,22  9,22,35,48
            return false
        }
    }
    return true;
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
        if (cards[i - 1].cardName !== (cards[i].index == 13 ? cards[i - 1].cardName : cards[i].cardName)) {
            flag = false
        }
    }
    return flag;
}

function PureSequence(cards) {
    if (cardTypeCheck(cards) === true && cardSequenceCheck(cards) === true) {
        return true;
    } else {
        return false;
    }
}

function ImpureSequence(cards, wildCard) {
    return cardImpureSequenceCheck(cards, wildCard)
}

function Set(cards) {
    if (set(cards) === true) {
        return true;
    } else {
        return false;
    }
}

function PureSet(cards) {
    if (set(cards) === true && cardTypeCheck(cards) === true) {
        return true;
    } else {
        return false;
    }
}

const sequence = (cardArrayForSequence, wildCard) => {
    if (cardArrayForSequence.length >= 3) {
        if (PureSequence(cardArrayForSequence)) {
            return "PureSequence";
        } else if (ImpureSequence(cardArrayForSequence, wildCard)) {
            return "ImpureSequence"
        } else if (Set(cardArrayForSequence)) {
            return "Set"
        } else if (PureSet(cardArrayForSequence)) {
            return "PureSet"
        } else {
            return "Invalid"
        }
    }
}

module.exports = {
    sequence
}
