'use strict';

const prefabs = require("bnb_js/prefabs");

const NULL_IMAGE = "/bnb_prefabs/pe_makeup/null_image.png";

class PeMakeup extends prefabs.Base {
    constructor(faceIdx=0) {
        super();
        const assets = bnb.scene.getAssetManager();
        const materialName = `pe_makeup`;
        const material = assets.findMaterial(materialName);
        if (!material) {
          bnb.log(`[WARN] Unable to find material "${materialName}"`);
          return;
        }
    
        const parameters = material.getParameters();
        this._strength = parameters.find(
            (parameter) => parameter.getName() == "pe_makeup_strength");
        this._blushesStrength = parameters.find(
            (parameter) => parameter.getName() == "pe_blushes_strength");

        this._texture = assets.findImage("pe_makeup").asTexture();
        this._blushesTexture = assets.findImage("pe_blushes").asTexture();
    }
    
    strength(val) {
        this._strength.setVector4(new bnb.Vec4(0, 0, 0, val));
        return this;
    }
    texture(filename) {
        this._texture.load(filename);
        return this;
    }
    blushesStrength(val) {
        this._blushesStrength.setVector4(new bnb.Vec4(0, 0, 0, val));
        return this;
    }
    blushesTexture(filename) {
        this._blushesTexture.load(filename);
        return this;
    }
    clear() {
        this.strength(1);
        this.texture(NULL_IMAGE);
        this.blushesStrength(1);
        this.blushesTexture(NULL_IMAGE);
    }
}

exports = {
    PeMakeup
}
