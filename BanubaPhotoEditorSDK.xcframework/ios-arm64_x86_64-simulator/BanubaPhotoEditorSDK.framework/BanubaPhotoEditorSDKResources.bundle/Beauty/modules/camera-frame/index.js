'use strict';

require('bnb_js/global');
const modules_scene_index = require('../scene/index.js');

const fragmentShader = "modules/camera-frame/camera_frame.frag";

const CameraFrameAlphaImage = "modules/camera-frame/camera_frame.png";

const vertexShader = "modules/camera-frame/camera_frame.vert";

const CameraMesh = "modules/camera-frame/quad.bsm2";

class CameraFrame {
    constructor() {
        Object.defineProperty(this, "_face", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.FaceGeometry(), [])
        });
        Object.defineProperty(this, "_camera_frame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new modules_scene_index.Mesh(new modules_scene_index.Geometry(CameraMesh), new modules_scene_index.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    tex_cameraFrame: new modules_scene_index.Image(CameraFrameAlphaImage),
                },
                state: {
                    blending: "ALPHA",
                    backFaces: true,
                    zWrite: true,
                },
            }))
        });
        this._face.add(this._camera_frame);
        modules_scene_index.add(this._face, this._camera_frame);
        this._camera_frame.visible(false);
    }
    enable() {
        this._camera_frame.visible(true);
    }
    texture(filename) {
        this._camera_frame.material.uniforms.tex_cameraFrame.load(filename);
    }
    disable() {
        this._camera_frame.visible(false);
    }
}

exports.CameraFrame = CameraFrame;
