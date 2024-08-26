class LoadingScreen extends SimpleScene {
  constructor() {
    super("LoadingScreen");
  }

  preload() {
    document.getElementById("phaser-div").setAttribute("style", "--game-border: lightgray")
    if (Boolean(startZero) === true) {
      this.scene.start("ZeroPlayer");
    }
  }

  create() {
    // add text
    // this.info = this.add.text(10, 10, "This is Loadingwindow.innerjs", 0xFFFFFF);
    // add rectangle
    this.loadGame = this.add.rectangle((window.innerWidth/2), (window.innerHeight/2), 150, 75, 0x0000FF);
    let playText = 'Play!'
    this.loadText = this.add.text((window.innerWidth/2), (window.innerHeight/2), playText, 0xFFFFFF)
    this.loadText.setOrigin(0.5, 0.5);
    this.loadText.setFontSize(20)
    //enable click on square
    this.loadGame.enableClick();
    this.loadText.enableClick();
    
    this.onePlayer = this.add.rectangle((window.innerWidth - 16) - 10, (window.innerHeight - 16) - 10, 10, 10, 0x000000)
    this.oneText = this.add.text((window.innerWidth - 16) - 10, (window.innerHeight - 16) - 10, 1, 0xFFFFFF)
    this.oneText.setOrigin(0.5, 0.5)
    this.onePlayer.enableClick()
    this.oneText.enableClick()
      
    this.zeroPlayer = this.add.rectangle((window.innerWidth - 16) - 10, 0, 10, 10, 0x000000)
    this.zeroText = this.add.text((window.innerWidth - 16) - 10, 8, 0, 0xFFFFFF)
    this.zeroText.setOrigin(0.5, 0.5)
    this.zeroPlayer.enableClick()
    this.zeroText.enableClick()
    // Uncomment line below to draw the grid
    //this.drawGrid();
  }

  update() {
    // check if square was clicked
    if (this.loadGame.wasClicked() || this.loadText.wasClicked()) {
      this.scene.start("MainGame");
    }
    if (this.onePlayer.wasClicked() || this.oneText.wasClicked()) {
      this.scene.start("OnePlayer");
    }
    if (this.zeroPlayer.wasClicked() || this.zeroText.wasClicked()) {
      this.scene.start("ZeroPlayer");
    }
    if (!!gameMode) {
      this.scene.start(gameMode)
      localStorage.setItem('loadedGame', true)
    }
  }
}