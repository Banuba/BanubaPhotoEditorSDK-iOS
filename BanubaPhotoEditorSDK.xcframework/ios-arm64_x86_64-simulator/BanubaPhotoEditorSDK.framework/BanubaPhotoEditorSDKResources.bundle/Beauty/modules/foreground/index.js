'use strict';
require('bnb_js/global');

const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/foreground/fg.frag";

const vertexShader = "modules/foreground/fg.vert";

class Foreground {
    constructor() {
        Object.defineProperty(this, "_foreground", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.PlaneGeometry(), new modules_scene_index.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    tex_fg: new modules_scene_index.Image(),
                    tex_camera: new modules_scene_index.Scene(),
                    js_fg_mode: new modules_scene_index.Vector4(0)
                },
                state: {
                    blending: "ALPHA",
                    backFaces: true,
                    zWrite: true,
                },
            }))
        });
        modules_scene_index.add(this._foreground);
        this._foreground.visible(false);
    }
    enable() {
        this._foreground.visible(true);
    }
    texture(filename) {
        this._foreground.material.uniforms.tex_fg.load(filename);
    }
    blend(mode) {
        if (typeof mode !== "undefined")
            this._foreground.material.uniforms.js_fg_mode.value(mode);
    }
    disable() {
        this._foreground.visible(false);
    }
}

exports.Foreground = Foreground;
