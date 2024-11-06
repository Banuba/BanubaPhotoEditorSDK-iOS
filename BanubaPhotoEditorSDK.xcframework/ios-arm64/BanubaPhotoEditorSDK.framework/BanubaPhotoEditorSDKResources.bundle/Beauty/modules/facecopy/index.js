'use strict';

require('bnb_js/global');
const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/facecopy/TriMat.frag";

const vertexShader = "modules/facecopy/TriMat.vert";

const AlphaMaskImage = "modules/facecopy/mask.png";

class FaceCopy {
    constructor() {
        Object.defineProperty(this, "_face", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.FaceGeometry(), [])
        });
        Object.defineProperty(this, "_facecopy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.PlaneGeometry(), new modules_scene_index.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    tex_nask: new modules_scene_index.Image(AlphaMaskImage),
                    tex_camera: new modules_scene_index.Scene(),
                },
                state: {
                    blending: "ALPHA",
                    backFaces: true,
                    zWrite: true,
                },
            }))
        });
        this._face.add(this._facecopy);
        modules_scene_index.add(this._face, this._facecopy);
        this._facecopy.visible(false);
    }
    enable() {
        this._facecopy.visible(true);
    }
    disable() {
        this._facecopy.visible(false);
    }
}

exports.FaceCopy = FaceCopy;
