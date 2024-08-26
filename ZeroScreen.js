class ZeroScreen extends SimpleScene {
  constructor() {
    super("ZeroScreen");
    this.counter = 0
  }

  preload() {
      document.getElementById("phaser-div").setAttribute("style", "--game-border: red")
  }

  create() {
    zeroOver = true
    // add text
    this.lostText = this.add.text((window.innerWidth/2), (window.innerHeight/2) - (75/2) + 12.5, `Player ${lostPlayer} Lost!`, 0xFFFFFF);
    this.lostText.setOrigin(0.5, 0.5);
    this.lostText.setFontSize(20)
    // add rectangle
    this.loadGame = this.add.rectangle((window.innerWidth/2), (window.innerHeight/2) - (75/2) + 87.5, 150, 75, 0x0000FF);
    let playText = `Play Again!`
    this.loadText = this.add.text((window.innerWidth/2), (window.innerHeight/2) - (75/2) + 87.5, playText, 0xFFFFFF)
    this.loadText.setOrigin(0.5, 0.5);
    this.loadText.setFontSize(20)
    //enable click on square
    this.loadGame.enableClick();
    this.loadText.enableClick();
    // Uncomment line below to draw the grid
    //this.drawGrid();
  }

  update() {
    // check if square was clicked
    if (this.loadGame.wasClicked() || this.loadText.wasClicked()) {
      // move circle to the right
      this.scene.start("ZeroPlayer");
      localStorage.setItem('loadedGame', true)
      location.href = `${location.pathname}?game=Zero`
    }
    if (startZero === true) {
      this.scene.start("ZeroPlayer");
    }
  }
}