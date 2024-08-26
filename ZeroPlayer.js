class ZeroPlayer extends SimpleScene {
  constructor() {
    super("ZeroPlayer");
    this.size = 4
    this.sizeChange = 1
    this.playerHeight = 65
    this.playerWidth = 25
    this.ballVertDirs = [
      'U',
      'D',
      'U', 
      'D', 
    ]
    this.ballVertDir = this.ballVertDirs[Math.floor(Math.random() * this.ballVertDirs.length)]
    this.ballHorizDirs = [
      'L',
      'R',
      'L', 
      'R', 
    ]
    this.ballHorizDir = this.ballHorizDirs[Math.floor(Math.random() * this.ballHorizDirs.length)]
    this.origBallMvSclFactor = 3
    this.ballMvSclFactor = this.origBallMvSclFactor
    this.ballSize = 10
    this.paddlePadding = 5
    this.isInArea = false
  }

  preload() {
    this.load.image("fullscreen", "assets/fullscreen.png");
    document.getElementById("phaser-div").setAttribute("style", "--game-border: #0078D7")
    this.load.audio("tone", "assets/sounds/tone1.ogg");
  }

  create() {
    this.tone = this.sound.add("tone");
    this.line = this.add.rectangle((window.innerWidth - 16)/2, 0, 1, (window.innerHeight - 16)*2, 0xFFFFFF)
    // add text
    // this.info = this.add.text(10, 10, "This is MainGame.js", 0xFFFFFF);
    // add circle
    this.ball = this.add.circle((window.innerWidth-16)/2, (window.innerHeight-16)/2, this.ballSize, 0xFFFFFF);  
    // add rectangle
    this.player1 = this.add.rectangle(0 + (this.playerWidth/2), (window.innerHeight-16)/2, this.playerWidth, this.playerHeight, 0x0000FF);
    this.player2 = this.add.rectangle(((window.innerWidth - 16) - (this.playerWidth/2)), (window.innerHeight-16)/2, this.playerWidth, this.playerHeight, 0x0000FF);

    //enable click on square

    this.up = this.add.key("w");
    this.down = this.add.key("s");
    /*    this.left = this.add.key("a");
        this.right = this.add.key("d");    */
    this.upArrowKey = this.add.key("UP");
    this.downArrowKey = this.add.key("DOWN");
    /*    this.leftArrowKey = this.add.key("LEFT");
        this.rightArrowKey = this.add.key("RIGHT");    */
    this.fullscreenButton = this.add.sprite(25, 25, "fullscreen");
    this.fullscreenButton.enableClick();
    this.fullscreenButton.setScale(0.25);
    // Uncomment line below to draw the grid
   // this.drawGrid();
  }

  update() {
    if (this.player1.y < 0 + (this.playerHeight / 2)) {
      this.player1.y = 0 + (this.playerHeight / 2)
    }

    if (this.player1.y > window.innerHeight - 16 - (this.playerHeight / 2)) {
      this.player1.y = window.innerHeight - 16 - (this.playerHeight / 2)
    }

    if (this.player2.y < 0 + (this.playerHeight / 2)) {
      this.player2.y = 0 + (this.playerHeight / 2)
    }
    if (this.player2.y > window.innerHeight - 16 - (this.playerHeight / 2)) {
      this.player2.y = window.innerHeight - 16 - (this.playerHeight / 2)
    }

    // ball movement
    if (this.ballVertDir === 'U') {
      this.ball.y -= this.ballMvSclFactor
    }
    if (this.ballVertDir === 'D') {
      this.ball.y += this.ballMvSclFactor
    }

    if (this.ballHorizDir === 'L') {
      this.ball.x -= this.ballMvSclFactor
    }
    if (this.ballHorizDir === 'R') {
      this.ball.x += this.ballMvSclFactor
    }
    this.topPos = 0
    this.botPos = (window.innerHeight - 16)
    if (this.player1.y - (this.playerHeight/2) >= this.topPos && this.player1.y + (this.playerHeight/2) <= this.botPos && this.ball.x <= (window.innerWidth - 16)/2) {
      if (this.ballVertDir === 'U') {
        this.player1.y -= this.ballMvSclFactor;
      }
      else if (this.ballVertDir === 'D') {
        this.player1.y += this.ballMvSclFactor;
      }
    }
    if (this.player2.y - (this.playerHeight/2) >= this.topPos && this.player2.y + (this.playerHeight/2) <= this.botPos && this.ball.x >= (window.innerWidth - 16)/2) {
      if (this.ballVertDir === 'U') {
        this.player2.y -= this.ballMvSclFactor;
      }
      else if (this.ballVertDir === 'D') {
        this.player2.y += this.ballMvSclFactor;
      }
    }
    // is ball at paddles?
    // paddle 1
    if (this.ball.x - (this.ballSize / 2) <= 0 + (this.playerWidth/2) + (this.playerWidth / 2)) {
      if (this.ball.y + (this.ballSize / 2) >= this.player1.y - (this.playerHeight / 2) - this.paddlePadding) {
        if ((this.ball.y - (this.ballSize / 2) <= this.player1.y + (this.playerHeight / 2) + this.paddlePadding)) {
          this.switchBallDir(1)
        }
        else {
          this.isInArea = false
        }
      }
    }
    // paddle 2
    if (this.ball.x + (this.ballSize / 2) >= ((window.innerWidth - 16) - (this.playerWidth/2)) - (this.playerWidth / 2)) {
      if ((this.ball.y + (this.ballSize / 2) >= this.player1.y - (this.playerHeight / 2) - this.paddlePadding)) {
        if (this.ball.y - (this.ballSize / 2) >= this.player1.y + (this.playerHeight / 2) + this.paddlePadding) {
          this.switchBallDir(2)
        }
        else {
          this.isInArea = false
        }
      }
    }

    // check if at top/bottom bounds
    if (this.ball.y < 0 + (this.ballSize / 2)) {
      this.ballVertDir = 'D'
    }

    if (this.ball.y > window.innerHeight - 16 - (this.ballSize / 2)) {
      this.ballVertDir = 'U'
    }

    if (this.fullscreenButton.wasClicked()) {
      this.toggleFullscreen()
    }
    if (this.ball.x + (this.ballSize/2) < 0) {
      lostPlayer = 1
      this.scene.start("ZeroScreen");
      this.ballMvSclFactor = this.ballOrigMvSclFactor
    }
    if (this.ball.x - (this.ballSize/2) > window.innerWidth - 16) {
      lostPlayer = 2
      this.scene.start("ZeroScreen");
      this.ballMvSclFactor = this.ballOrigMvSclFactor
    }
  }

  toggleFullscreen() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    }
    else {
      this.scale.startFullscreen();
    }
  }
  switchBallDir(player) {
    let players = {
      1: player1Stats, 
      2: player2Stats, 
    }
    if (this.ballHorizDir === 'L'/* && this.isInArea !== true*/) {
      this.ballHorizDir = 'R'
      if (this.ballMvSclFactor < 5) {
        this.ballMvSclFactor+=1
      }
    }
    else if (this.ballHorizDir === 'R'/* && this.isInArea !== true*/) {
      this.ballHorizDir = 'L'
      if (this.ballMvSclFactor < 5) {
        this.ballMvSclFactor+=1
      }
    }
    if (this.ballVertDir === 'U'/* && this.isInArea !== true*/) {
//      this.ballVertDir = 'D'
    }
    else if (this.ballVertDir === 'D'/* && this.isInArea !== true*/) {
//      this.ballVertDir = 'U'
    }
    this.isInArea = true
    players[player].score+=1
//    `Player ${player}: ${players[player].score} points!`
    this.tone.play();
  }
}