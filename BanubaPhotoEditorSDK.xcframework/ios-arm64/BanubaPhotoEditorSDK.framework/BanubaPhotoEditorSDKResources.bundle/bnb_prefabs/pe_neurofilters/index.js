'use strict';

const prefabs = require("bnb_js/prefabs");

class PeNeurofilters extends prefabs.Base {
    constructor() {
        super();
        const assets = bnb.scene.getAssetManager();
        const material = assets.findMaterial("filters");

        if (!material) {
              bnb.log(`[WARN] Unable to find material "filters"`);
              return;
        }
    
        const parameters = material.getParameters();

        this._fbcs = parameters.find((parameter) => 
            parameter.getName() == "filter_brightness_contrast_saturation"
        ); 
        this._fbcsv = new bnb.Vec4(0, 0, 0, 0);

        this._fnsmsar = parameters.find((parameter) => parameter.getName() 
            == "filter_noise_strength_monochromatic_sharpen_amount_radius"
        ); 
        this._fnsmsarv = new bnb.Vec4(0, 0, 0, 0);
    }

    brightness(strength) {
        this._fbcsv.x = strength;
        this._fbcs.setVector4(this._fbcsv);
        return this;
    }

    contrast(strength) {
        this._fbcsv.y = strength;
        this._fbcs.setVector4(this._fbcsv);
        return this;
    }

    saturation(strength) {
        this._fbcsv.z = strength;
        this._fbcs.setVector4(this._fbcsv);
        return this;
    }

    noise(strength_monochromatic) {
        [this._fnsmsarv.x, this._fnsmsarv.y] = 
            strength_monochromatic.split(" ").map((c) => parseFloat(c));
        this._fnsmsar.setVector4(this._fnsmsarv);
        return this;
    }

    sharpen(strength_radius) {
        [this._fnsmsarv.z, this._fnsmsarv.w] = 
            strength_radius.split(" ").map((c) => parseFloat(c));
        this._fnsmsar.setVector4(this._fnsmsarv);
        return this;
    }
    
    clear() {
        this.brightness(0);
        this.contrast(0);
        this.noise("0 0");
        this.sharpen("0 0");
    }
}

exports = {
    PeNeurofilters
}
