const assets = bnb.scene.getAssetManager()

const ContentMode = {
  /* 0 */ SCALE_TO_FILL: 0,
  /* 1 */ FILL: 1,
  /* 2 */ FIT: 2,
}

exports = new class Background {
  constructor() {
    const camera = assets.findImage("camera") || assets.findImage("camera_image")
    if (!camera) throw new Error("Unable to find 'camera' or 'camera_image' image which is mandatory")

    const proceduralTexture = camera.asProceduralTexture()
    if (!proceduralTexture)
      throw new Error(
        "The Background feature requires 'camera' image to be of type 'procedural_texture'",
      )
    const composer = proceduralTexture.asCameraComposer()

    this._background = composer
  }

  /**
   * Sets the background color
   * @param {string} color - "R G B A" color
   */
  color(color) {
    throw new Error("Background.color() in not implemented yet")
  }

  /**
   * Sets the background transparency from 0 to 1
   * @param {number} value - transparency value in [0, 1] range
   */
  transparency(value) {
    this._background.setTransparencyFactor(1 - value)
  }

  /**
   * Sets the file (image or video) as background texture
   * @param {string|null} filename - path to the file to be loaded
   * @param {boolean} play - play video after load finished
   * @param {boolean} loop - loop video playback
   */
  texture(filename, play = true, loop = true) {
    this._background.setBackgroundImage(filename || "", play, loop)
  }

  /**
   * Sets the file (image) as background texture
   * @param {int} fd - file descriptor
   */
  textureImageByFd(fd) {
    this._background.setBackgroundImageByFd(fd)
  }

  /**
   * Sets the file (video) as background texture
   * @param {int} fd - file descriptor
   * @param {boolean} play - play video after load finished
   * @param {boolean} loop - loop video playback
   */
  textureVideoByFd(fd, play = true, loop = true) {
    this._background.setBackgroundVideoByFd(fd, play, loop)
  }

  /**
   * Rotates the background texture clockwise in degrees
   * @param {number} angle - rotation angle in degrees
   */
  rotation(angle) {
    this._background.setRotation(-angle)
  }

  /**
   * Scales the background texture
   * @param {number} factor - scale factor
   */
  scale(factor) {
    this._background.setScale(factor, factor)
  }

  /**
   * Sets the texture content mode
   * @param {"scale_to_fill" | "fill" | "fit"} mode - content mode
   */
  contentMode(mode) {
    this._background.setContentMode(ContentMode[mode.toUpperCase()])
  }

  /**
   * Sets the background blur radius
   * @param {number} [radius=0.5] - blur radius in [0, 1] range
   */
  blur(radius = 0.5) {
    radius *= 5
    this._background.enableBlur(radius > 0)
    this._background.setBlurRadius(radius)
  }

  /**
   * Sets the Bokeh blur radius
   * @param {number} radius - Bokeh blur radius
   */
  bokeh(radius = 1) {
    throw new Error("Background.bokeh() in not implemented yet")
  }

  /**
   * Access to underlying video object 
   */
  getBackgroundVideo() {
      return this._background.getBackgroundVideo()
  }

  /** Removes the background color and texture, resets any settings applied */
  clear() {
    // this.color("0 0 0 0")
    this.transparency(0)
    this.texture(null)
    this.rotation(0)
    this.scale(1)
    this.contentMode("fill")
    this.blur(0)
    // this.bokeh(0)
  }
}
