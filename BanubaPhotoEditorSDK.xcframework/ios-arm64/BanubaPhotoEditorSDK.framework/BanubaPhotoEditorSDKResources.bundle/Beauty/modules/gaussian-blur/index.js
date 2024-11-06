'use strict';

require('bnb_js/global');
const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/gaussian-blur/TriMFG.frag";

const vertexShader = "modules/gaussian-blur/TriMFG.vert";

const BlurMesh = "modules/gaussian-blur/triFG.bsm2";

class GaussianBlur {
    constructor() {
        Object.defineProperty(this, "_face", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.FaceGeometry(), [])
        });
        Object.defineProperty(this, "_gaussian_blur", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.Geometry(BlurMesh), new modules_scene_index.ShaderMaterial({
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
        this._face.add(this._gaussian_blur);
        modules_scene_index.add(this._face, this._gaussian_blur);
        this._gaussian_blur.visible(false);
    }
    enable() {
        this._gaussian_blur.visible(true);
    }
    disable() {
        this._gaussian_blur.visible(false);
    }
}

exports.GaussianBlur = GaussianBlur;
