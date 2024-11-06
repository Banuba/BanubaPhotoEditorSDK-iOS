'use strict';
require('bnb_js/global');

const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/neurofilters/filters.frag";

const vertexShader = "modules/neurofilters/filters.vert";

class Neurofilters {
    constructor() {
        Object.defineProperty(this, "_neurofilters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.PlaneGeometry(), new modules_scene_index.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    tex_camera: new modules_scene_index.Scene(),
                    filter_brightness_contrast_saturation: new modules_scene_index.Vector4(0,0,0,0),
                    filter_noise_strength_monochromatic_sharpen_amount_radius: new modules_scene_index.Vector4(0,0,0,0),
                },
            }))
        });
        this._neurofilters.visible(false);
        modules_scene_index.add(this._neurofilters);
    }
    brightness(strength) {
        this._neurofilters.visible(true);

        if (typeof strength !== "undefined")
            this._neurofilters.material.uniforms.filter_brightness_contrast_saturation.x(strength);
        return this._neurofilters.material.uniforms.filter_brightness_contrast_saturation.x;
    }

    contrast(strength) {
        this._neurofilters.visible(true);

        if (typeof strength !== "undefined")
            this._neurofilters.material.uniforms.filter_brightness_contrast_saturation.y(strength);
        return this._neurofilters.material.uniforms.filter_brightness_contrast_saturation.y;
    }

    saturation(strength) {
        this._neurofilters.visible(true);

        if (typeof strength !== "undefined")
            this._neurofilters.material.uniforms.filter_brightness_contrast_saturation.z(strength);
        return this._neurofilters.material.uniforms.filter_brightness_contrast_saturation.z;
    }

    noise(strength, monochromatic) {
        this._neurofilters.visible(true);

        if (typeof strength !== "undefined"){
            this._neurofilters.material.uniforms.filter_noise_strength_monochromatic_sharpen_amount_radius.x(strength);
            this._neurofilters.material.uniforms.filter_noise_strength_monochromatic_sharpen_amount_radius.y(monochromatic || 0);
        }
        return this._neurofilters.material.uniforms.filter_noise_strength_monochromatic_sharpen_amount_radius.x;
    }

    sharpen(strength, radius) {
        this._neurofilters.visible(true);

        if (typeof strength !== "undefined"){
            this._neurofilters.material.uniforms.filter_noise_strength_monochromatic_sharpen_amount_radius.z(strength);
            this._neurofilters.material.uniforms.filter_noise_strength_monochromatic_sharpen_amount_radius.w(radius || 0);
        }
        return this._neurofilters.material.uniforms.filter_noise_strength_monochromatic_sharpen_amount_radius.z;
    }
    /** Resets any settings applied */
    clear() {
        this.brightness(0);
        this.contrast(0);
        this.noise(0, 0);
        this.sharpen(0,0);

    }
}

exports.Neurofilters = Neurofilters;
