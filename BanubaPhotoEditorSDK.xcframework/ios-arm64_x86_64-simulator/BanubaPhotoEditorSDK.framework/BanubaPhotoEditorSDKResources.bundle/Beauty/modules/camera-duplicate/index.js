'use strict';

require('bnb_js/global');
const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/camera-duplicate/camera_duplicate.frag";

const vertexShader = "modules/camera-duplicate/camera_duplicate.vert";

class CameraDuplicate {
    constructor() {
        Object.defineProperty(this, "_camera_duplicate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.PlaneGeometry(), new modules_scene_index.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    tex_camera: new modules_scene_index.Scene(),
                },
                state: {
                    blending: "ALPHA",
                    backFaces: true,
                    zWrite: true,
                },
            }))
        });
        modules_scene_index.add(this._camera_duplicate);
        this._camera_duplicate.visible(false);
    }
    enable() {
        this._camera_duplicate.visible(true);
    }
    disable() {
        this._camera_duplicate.visible(false);
    }
}

exports.CameraDuplicate = CameraDuplicate;
