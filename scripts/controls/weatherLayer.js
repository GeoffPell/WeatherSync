// import { FXCanvasAnimation } from "../canvasanimation.js";
// import { packageId } from "../constants.js";
// import { easeFunctions } from "../ease.js";

export class WeatherSyncLayer extends CanvasLayer {

  

  constructor() {
    console.log("WeatherSyncLayer")
    
    super();
    this.videos = [];
    this._dragging = false;
    this.ruler = null;
    this.windowVisible = false;
    // Listen to the socket
    game.socket.on(`module.${packageId}`, (data) => {
      this.playVideo(data);
    });
  }

  static get layerOptions() {
    return foundry.utils.mergeObject(super.layerOptions, {
      name: "weather-sync",
      zIndex: 246,
    });
  }

  // /** @override */
  // async draw() {
  //   await super.draw();
  //   this.ruler = this.addChild(new PIXI.Graphics());
  //   this.visible = true;
  //   return this;
  // }


}