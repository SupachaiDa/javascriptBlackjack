
var card2 = 'http://res.freestockphotos.biz/thumbs/15/15497-illustration-of-a-two-of-spades-playing-card-th.png'
    ,card3 = 'http://res.freestockphotos.biz/thumbs/15/15522-illustration-of-a-three-of-diamonds-playing-card-th.png'
    ,card4 = 'http://res.freestockphotos.biz/thumbs/15/15495-illustration-of-a-four-of-spades-playing-card-th.png'
    ,card5 = 'http://res.freestockphotos.biz/thumbs/15/15507-illustration-of-a-five-of-hearts-playing-card-th.png'
    ,card6 = 'http://res.freestockphotos.biz/thumbs/15/15493-illustration-of-a-six-of-spades-playing-card-th.png'
    ,card7 = 'http://res.freestockphotos.biz/thumbs/15/15531-illustration-of-a-seven-of-clubs-playing-card-th.png'
    ,card8 = 'http://res.freestockphotos.biz/thumbs/15/15530-illustration-of-an-eight-of-clubs-playing-card-th.png'
    ,card9 = 'http://res.freestockphotos.biz/thumbs/15/15490-illustration-of-a-nine-of-spades-playing-card-th.png'
    ,card10 = 'http://res.freestockphotos.biz/thumbs/15/15528-illustration-of-a-ten-of-clubs-playing-card-th.png'
    ,J = 'http://res.freestockphotos.biz/thumbs/15/15501-illustration-of-a-jack-of-hearts-playing-card-th.png'
    ,Q = 'http://res.freestockphotos.biz/pictures/15/15526-illustration-of-a-queen-of-clubs-playing-card-pv.png'
    ,K = 'http://res.freestockphotos.biz/pictures/15/15499-illustration-of-a-king-of-hearts-playing-card-pv.png'
    ,A = 'http://res.freestockphotos.biz/pictures/15/15524-illustration-of-an-ace-of-diamonds-playing-card-pv.png'

var gameData = {
    'you':{
        'span-point':'#your-blackjack-result',
        'div':'#your-box',
        'score':0
    },
    'dealer':{
        'span-point':'#dealer-blackjack-result',
        'div':'#dealer-box',
        'score':0
    },
    'cards':[[card2,'card2'],[card3,'card3'],[card4,'card4'],[card5,'card5'],[card6,'card6'],[card7,'card7'],[card8,'card8'],[card9,'card9'],[card10,'card10'],[J,'J'],[Q,'Q'],[K,'K'],[A,'A']],
    'cardMap':{'card2':2,'card3':3,'card4':4,'card5':5,'card6':6,'card7':7,'card8':8,'card9':9,'card10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'win':0,
    'losses':0,
    'drew':0,
    'isStand':false,
    'turnsOver':false,
    'isClick':false
}
const YOU = gameData['you']
const DEALER = gameData['dealer']

const swipeSound = new Audio('https://freesound.org/data/previews/219/219004_4072480-lq.mp3')
const winSound = new Audio('https://freesound.org/data/previews/274/274510_3029356-lq.mp3')
const loseSound = new Audio('https://freesound.org/data/previews/418/418262_5121236-lq.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal)

function blackjackHit() {
    if(gameData['isStand'] === false) {
    let x = randomCard()
    let cardUrl =x[0]
    let card = x[1]
    
    showCard(YOU,cardUrl)
    updateScore(YOU,card)
    showScore(YOU)
    }
}

function randomCard() {
    let randomNum = Math.floor(Math.random() * 13)
    return [gameData['cards'][randomNum][0],gameData['cards'][randomNum][1]]
}
 
function showCard(player,card) {
    if(player['score'] <= 21){
    let cardImg = document.createElement('img')
    cardImg.src = card
    swipeSound.play()
    document.querySelector(player['div']).appendChild(cardImg) 
    }
}

function blackjackDeal() {
    if(gameData['turnsOver'] === true) {
        let yourImgs = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImgs = document.querySelector('#dealer-box').querySelectorAll('img')
        gameData['isStand'] = false

        for(i = 0; i < yourImgs.length ; i++) {
            yourImgs[i].remove()
        }
        for(i = 0; i < dealerImgs.length ; i++) {
         dealerImgs[i].remove()
        }
    
         YOU['score'] = 0
        DEALER['score'] = 0
        document.querySelector(YOU['span-point']).textContent = 0
        document.querySelector(YOU['span-point']).style.color = '#ffff'
        document.querySelector(DEALER['span-point']).textContent = 0
        document.querySelector(DEALER['span-point']).style.color = '#ffff'

        document.querySelector('#blackjack-result').textContent = 'Let\'s Play'
        document.querySelector('#blackjack-result').style.color = 'black'

        gameData['turnsOver'] = false
        gameData['isClick'] = false
    }
}

function updateScore(player,Randomcard) {
    if(Randomcard === 'A'){
        if( player['score'] + gameData['cardMap']['A'][1] <= 21) {
            player['score'] += gameData['cardMap']['A'][1]
        } else{
            player['score'] += gameData['cardMap']['A'][0]
        }
    } else{
    player['score'] += gameData['cardMap'][Randomcard]
    }
}

function showScore(player) {
    if(player['score'] > 21) {
        document.querySelector(player['span-point']).textContent = 'BUST !'
        document.querySelector(player['span-point']).style.color = 'red'
    }else {
    document.querySelector(player['span-point']).textContent = player['score']
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function dealerLogic() {
    gameData['isStand'] = true
        while(DEALER['score'] < 16 && gameData['isStand'] === true) {
            let x = randomCard()
            let cardUrl =x[0]
            let card = x[1]
    
            showCard(DEALER,cardUrl)
            updateScore(DEALER,card)
            showScore(DEALER)

            await sleep(1000)
        }

        if(DEALER['score'] > 15 && gameData['isClick'] === false) {
            gameData['turnsOver'] = true
            showResult(computeWinner())
            gameData['isClick'] = true
        }
    
}

function computeWinner() {
    let winner

    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU
            gameData['win']++
        }
        else if(YOU['score'] < DEALER['score']) {
            winner = DEALER
            gameData['losses']++
        }
    }else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        gameData['drew']++
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER
        gameData['losses']++
    }

    return winner
}

function showResult(winner) {
    if(gameData['turnsOver'] === true) {
    let message,messageCollor
    if(winner === YOU) {
        message = 'You Win !'
        messageCollor = 'green'
        winSound.play()

        document.querySelector('#win').textContent = gameData['win']
    }
    else if(winner === DEALER) {
        message = 'You Lose !'
        messageCollor = 'red'
        loseSound.play()

        document.querySelector('#loss').textContent = gameData['losses']
    }
    else {
        message = 'Drew'
        messageCollor = 'black'

        document.querySelector('#drew').textContent = gameData['drew']
    }

    document.querySelector('#blackjack-result').textContent = message
    document.querySelector('#blackjack-result').style.color = messageCollor
}}








