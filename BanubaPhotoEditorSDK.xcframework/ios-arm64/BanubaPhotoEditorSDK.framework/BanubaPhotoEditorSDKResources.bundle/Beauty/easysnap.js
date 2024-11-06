'use strict';

require('bnb_js/global');
require('./modules/scene/index.js');
const modules_faceMorph_index = require('./modules/face-morph/index.js');
const modules_hair_index = require('./modules/hair/index.js');
const background = require('bnb_js/background');
const modules_index = require('./modules/index.js');
const modules_backgroundStreaks_index = require('./modules/background-streaks/index.js');
const modules_cameraDuplicate_index = require('./modules/camera-duplicate/index.js');
const modules_cameraFrame_index = require('./modules/camera-frame/index.js');
const modules_eyeBags_index = require('./modules/eye-bags/index.js');
const modules_eyelashes_index = require('./modules/eyelashes/index.js');
const modules_eyes_index = require('./modules/eyes/index.js');
const modules_facecopy_index = require('./modules/facecopy/index.js');
const modules_filter_index = require('./modules/filter/index.js');
const modules_foreground_index = require('./modules/foreground/index.js');
const modules_gaussianBlur_index = require('./modules/gaussian-blur/index.js');
const modules_lips_index = require('./modules/lips/index.js');
const modules_makeup_index = require('./modules/makeup/index.js');
const modules_skin_index = require('./modules/skin/index.js');
const modules_softlight_index = require('./modules/softlight/index.js');
const modules_teeth_index = require('./modules/teeth/index.js');
const modules_neurofilters_index = require('./modules/neurofilters/index.js');


function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const background__default = /*#__PURE__*/_interopDefaultLegacy(background);

bnb.log(`\n\nEasysnap Makeup API version: ${"1.4.0-bd811a3a6e625dbbf744cbdc0f51eb091a9aaf8f"}\n`);
const Skin = new modules_skin_index.Skin();
const Eyes = new modules_eyes_index.Eyes();
const Teeth = new modules_teeth_index.Teeth();
const Lips = new modules_lips_index.Lips();
const Makeup = new modules_makeup_index.Makeup();
const Eyelashes = new modules_eyelashes_index.Eyelashes();
const Softlight = new modules_softlight_index.Softlight();
const Hair = new modules_hair_index.Hair();
const FaceMorph = new modules_faceMorph_index.FaceMorph();
const EyeBagsRemoval = new modules_eyeBags_index.EyeBagsRemoval();
const GaussianBlur = new modules_gaussianBlur_index.GaussianBlur();
const FaceCopy = new modules_facecopy_index.FaceCopy();
const CameraFrame = new modules_cameraFrame_index.CameraFrame();
const Filter = new modules_filter_index.Filter();
const Foreground = new modules_foreground_index.Foreground();
const Foundation = {
    set(filename) {
    },
    clear() {
    },
};
const Streaks = {
    apply(threshold = 0.95, streaks_color = "1. 1. 1. 1.") {
        const color = streaks_color.split(" ");
        const lightStreaks = require("bnb_js/light_streaks.js");
        const assetManager = bnb.scene.getAssetManager();
        const rin = bnb.scene.getAssetManager().findRenderTarget("_scene_render_target10");
        const ain = rin.getAttachments()[0];
        const cam2 = assetManager.findImage("camera");
        lightStreaks.BNBApplyLightStreaks(cam2, ain, threshold, color, bnb.BlendingMode.SCREEN);
    },
    applyBackground(threshold = 0.95, streaks_color = "1. 1. 1. 1.") {
        BackgroundStreaks.enable();
        const color = streaks_color.split(" ");
        const lightStreaks = require("bnb_js/light_streaks.js");
        const rin = bnb.scene.getAssetManager().findRenderTarget("_scene_render_target10");
        const ain = rin.getAttachments()[0];
        const rout = bnb.scene.getAssetManager().findRenderTarget("_scene_render_target12");
        const aout = rout.getAttachments()[0];
        lightStreaks.BNBApplyLightStreaks(aout, ain, threshold, color, bnb.BlendingMode.SCREEN);
    },
};
const CameraDuplicate = new modules_cameraDuplicate_index.CameraDuplicate();
const BackgroundStreaks = new modules_backgroundStreaks_index.BackgroundStreaks();
const Neurofilters = new modules_neurofilters_index.Neurofilters();

/**
 * @example
 * ```py
 * settings = {
 *   // "feature_name": {
 *   //   "param_name": default_value, // example_value
 *   // },
 *   "Neurobeauty": {
 *     "skinSmoothStrength": 0.0,     // 1.0
 *     "lutPath": "",                 // "neuro_beauty/luts/lut3.png"
 *     "lutOnlySkin": false,          // true
 *     "tonePath": "",                // "neuro_beauty/tone_texts/1"
 *     "toneStrength": 0.0,           // 1.0
 *     "blushPath": "",               // "neuro_beauty/blush_texts/4"
 *     "blushAutoCorrection": false,  // true
 *     "eyePath": "",                 // "neuro_beauty/eye_texts/1b"
 *     "shadowsPath": "",             // "neuro_beauty/shadows_texts/6_1"
 *     "shadowsAlpha": 0.0,           // 0.8
 *     "applyScleraMod": false,       // true
 *     "applyEyeFiltration": false,   // true
 *     "eyelashPath": "" ,            // e.g. "neuro_beauty/lashes_texts/lashes_tex1.png/"
 *     "lipsPaint": false,            // true
 *     "lipsColorR": 0.0,             // 0.812
 *     "lipsColorG": 0.0,             // 0.0
 *     "lipsColorB": 0.0,             // 0.14
 *   },
 *   "Eyes": {
 *     "color": "0.0 0.0 0.0 0.0", // "0 0 1.0 1.0"
 *     "whitening": 0.0,           // 1.0
 *     "flare": 0.0,               // 1.0
 *   },
 *   "Teeth": {
 *     "whitening": 0.0, // 1.0
 *   },
 *   "Lips": {
 *     "color": "0.0 0.0 0.0 0.0", // "1.0 0.12 0.14 1.0",
 *     "saturation": 1,            // 1.5
 *     "brightness": 1,            // 1.2
 *     "shineIntensity": 0,        // 0.9
 *     "shineBleeding": 0,         // 0.6
 *     "shineScale": 0,            // 1.1
 *     "glitterGrain": 0,          // 0.4
 *     "glitterIntensity": 0,      // 1.0
 *     "glitterBleeding": 0,       // 1.0
 *   },
 *   "Makeup": {
 *     contour: "0.0 0.0 0.0 0.0",     // "0.0 0.0 0.0 1.0"
 *     blushes: "0.0 0.0 0.0 0.0",     // "0.0 0.0 0.0 1.0"
 *     highlighter: "0.0 0.0 0.0 0.0", // "0.0 0.0 0.0 1.0"
 *     eyeshadow: "0.0 0.0 0.0 0.0",   // "0.0 0.0 0.0 1.0"
 *     eyeliner: "0.0 0.0 0.0 0.0",    // "0.0 0.0 0.0 1.0"
 *     lashes: "0.0 0.0 0.0 0.0",      // "0.0 0.0 0.0 1.0"
 *   },
 *   "Softltght": {
 *     "strength": 0.0, // 1.0
 *   },
 *   "Hair": {
 *     "color": "0.0 0.0 0.0 0.0", // one color "0.0 1.0 0.0 1.0" or up to 5 colors as array ["0.0 1.0 0.0 1.0", "1.0 0.0 0.0 1.0"]
 *   },
 *   "Skin": {
 *     "color": "0.0 0.0 0.0 0.0", // "0 1.0 0 1.0"
 *     "softening": 0.0,           // 1.0
 *   },
 *   "Filter": {
 *     noise: 0.0,      // 0.25
 *     sharpen: 0.0,    // 0.475
 *     brightness: 0.0, // 0.15
 *     contrast: 0.0,   // 0.2
 *     saturation: 0.0, // -0.15
 *     lut: "",         // "luts/lut1.png"
 *   },
 *   "FaceMorph": {
 *     "face": 0.0, // 1.0
 *     "eyes": 0.0, // 1.25,
 *     "nose": 0.0, // 1.0
 *     "lips": 0.0, // 1.5
 *   },
 * }
 *
 * state = json.dumps(settings)
 *
 * effect.evalJs(f"setState({state})")
 * ```
 * @see
 * {@link https://docs.banuba.com/face-ar-sdk-v1/effect_api/face_beauty}
 * {@link https://docs.banuba.com/face-ar-sdk-v1/effect_api/makeup}
 */
const setState = modules_index.createSetState({
    Skin,
    Eyes,
    Teeth,
    Lips,
    Makeup,
    Softlight,
    Hair,
    Filter,
    FaceMorph,
    Foundation,
    Eyelashes,
    Foreground,
    Neurofilters
});

const m = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Background: background__default['default'],
    Skin: Skin,
    Eyes: Eyes,
    Teeth: Teeth,
    Lips: Lips,
    Makeup: Makeup,
    Softlight: Softlight,
    Hair: Hair,
    FaceMorph: FaceMorph,
    EyeBagsRemoval: EyeBagsRemoval,
    GaussianBlur: GaussianBlur,
    FaceCopy: FaceCopy,
    CameraFrame: CameraFrame,
    Filter: Filter,
    Foundation: Foundation,
    Eyelashes: Eyelashes,
    Streaks: Streaks,
    CameraDuplicate: CameraDuplicate,
    BackgroundStreaks: BackgroundStreaks,
    Foreground: Foreground,
    Neurofilters:Neurofilters,
    setState: setState
});

exports.m = m;
