'use strict';

require('bnb_js/global');
const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/background-streaks/background.frag";

const vertexShader = "modules/background-streaks/background.vert";

class BackgroundStreaks {
    constructor() {
        Object.defineProperty(this, "_background", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.PlaneGeometry(), new modules_scene_index.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    tex_camera: new modules_scene_index.Scene(),
                    segmentation_mask: new modules_scene_index.SegmentationMask("BACKGROUND"),
                },
                state: {
                    blending: "ALPHA",
                    backFaces: true,
                    zWrite: true,
                }
            }))
        });
        modules_scene_index.add(this._background);
        this._background.visible(false);
    }
    enable() {
        this._background.material.uniforms.segmentation_mask.enable();
        this._background.visible(true);
    }
    disable() {
        this._background.material.uniforms.segmentation_mask.disable();
        this._background.visible(false);
    }
}

exports.BackgroundStreaks = BackgroundStreaks;
