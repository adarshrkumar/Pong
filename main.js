if (!!localStorage.getItem('loadedGame') === false) {
  localStorage.setItem('loadedGame', false)
}


// Game configuration object 
let config = {
  type: Phaser.AUTO,
  width: window.innerWidth - 16,
  height: window.innerHeight - 16,
  backgroundColor: 0x000000,
  scene: [LoadingScreen, MainGame, EndScreen, OnePlayer, OneScreen, ZeroPlayer, ZeroScreen],
  parent: "phaser-div",
  dom: {
    createContainer: true
  },
  fontFamily: `Arial`,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
};

//global data object
var player1Stats = {
  score: 0,
  //lives: 3,
  //health 100,
  position: {
    x: 0,
    y: 0,
  },
}

var player2Stats = {
  score: 0,
  //lives: 3,
  //health 100,
  position: {
    x: 0,
    y: 0,
  },
}

var players = {
  1: player1Stats,
  2: player2Stats,
}

var startPlayer = 0
var lostPlayer = 0

var startZero = false
var zeroOver = false

var startOne = false
var oneOver = false

setInterval(function() {
  if (Boolean(zeroOver)) {
    setTimeout(function() {
      startZero = true
    }, 5000)
  }
  if (Boolean(oneOver) && playerLost === 2) {
    setTimeout(function() {
      startOne = true
    }, 5000)
  }
}, 500)

//Create a Phaser Game using the config
const game = new Phaser.Game(config);

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var gameMode = urlParams.get('game')
if (!!gameMode) {
  if (gameMode.split('').length <= 4) {
    gameMode = `${gameMode}Player`
  }
  if (localStorage.getItem('loadedGame') === 'false') {
    gameMode = ''
  }
  localStorage.setItem('loadedGame', false)
}