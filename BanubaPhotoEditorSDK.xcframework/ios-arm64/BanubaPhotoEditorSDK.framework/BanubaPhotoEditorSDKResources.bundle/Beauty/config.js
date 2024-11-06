'use strict';

const easysnap = require('./easysnap.js');

Object.assign(globalThis, easysnap.m);
/* Feel free to add your custom code below */


test();

function test(){
    /* Base beauty effect */

    // Softlight.strength(1) // applysoftLight()/applySoftlightAlpha()
    // Softlight.clear()

    // Skin.softening(1) // applySkinSofting()
    // FaceMorph.face(1)// applyCheeksMorphing();
    // FaceMorph.eyes(1) // applyEyesMorphing();
    // FaceMorph.nose(value) // applyNoseMorphing();
    // Eyes.whitening(value) // applyEyesColoring();
    // Teeth.whitening(value) // applyTeethWhitening();


    /* Lut */
    // Filter.set("test_textures/lut.png")
    // Filter.clear()

    /* Makeups */
    // Makeup.set("test_textures/makeup_halloween1.png") // only both eyes makeups
    // clear()

    /* Face frame functionality */
    // CameraFrame.enable();

    /* Hair color functionality */

    // Hair.color("1 0 0 1") // set single color.
    // Hair.color(["1 0 0 1","0 1 0 1"]) // set multiple(up to 4) gradient hair color, from up to down.

    // Hair.strands("0.80 0.40 0.40 1.0") // set single strands color.
    // Hair.strands([ set multiple (up to 5) strands color.
    //     "0.80 0.40 0.40 1.0",
    //     "0.83 0.40 0.40 1.0",
    //     "0.85 0.75 0.75 1.0",
    //     "0.87 0.60 0.60 1.0",
    //     "0.99 0.65 0.65 1.0"])

    // Hair.clear()

    /* Lips color functionality */
    // setLipsColor("1 0 0 1") // for matt lips
    // setShinyLipsColor("1 0 1 1") // for shiny lips color (default params)
    // setShinyLipsParams("1 1 1 1") // custom shiny lips params
    // Lips.clear();

    /* Eyes color functionality */
    // Eyes.color("0 1 0 1")
    // Eyes.clear() // remove Eyes color

    /* Backdrops functionality */
    // Background.texture("preview.png")
    // Background.blur(0.2);
    // Background.clear() // remove Background

    /* Eyebags functionality */

    /* Neurobeauty features functionality */
    // Neurobeauty.enable();
    // Neurobeauty.setParameters(params); // for params json or each param individually as mentioned below
    /*  Params' names are being generated from json keys values, e.g. "blush_auto_correction" -> "blushAutoCorrection", "eye_path" -> "eyePath": */
        // Neurobeauty.lutPath(path)
        // Neurobeauty.lutOnlySkin(false)
        // Neurobeauty.tonePath(path)
        // Neurobeauty.blushPath(path)
        // Neurobeauty.blushAutoCorrection(true)
        // Neurobeauty.eyePath(path)
        // Neurobeauty.applyScleraMod(true)
        // Neurobeauty.applyEyeFiltration(true)
        // Neurobeauty.eyelashPath(path)
        // Neurobeauty.applyLipsMorphing(false)
        // Neurobeauty.lipsMorphingMode(1)
        // Neurobeauty.lipsMorphingCoef(1)
        // Neurobeauty.lipsPaint(true);
        // Neurobeauty.lipsColorR(0);
        // Neurobeauty.lipsColorG(0);
        // Neurobeauty.lipsColorB(1);
    // Neurobeauty.disable();

    /* FaceCopy functionality */
    // FaceCopy.enable()
    // FaceCopy.disable()

    /* GaussianBlur functionality */
    // GaussianBlur.enable()
    // GaussianBlur.disable()

    /* Streaks functionality */
    // Streaks.apply(0.95, "1. 1. 1. 1.") // Apply streaks to whole camera image. (0.95 - threshold, "1. 1. 1. 1." - color) - optional
    // Streaks.applyBackground(0.95, "1. 1. 1. 1.") // Apply streaks only to background. (0.95 - threshold, "1. 1. 1. 1." - color) - optional

    /* Foregreund functionality */
    // Foreground.enable()
    // Foreground.disable()
    // Foreground.texture("path/to/texture")
    // Foreground.blend(1) // 0 to 6


}

function enableRecognizerFeatures(features) {
    var settings = JSON.parse(features);

    if (settings.includes("eyes_coloring")) {
        bnb.scene.enableRecognizerFeature(bnb.FeatureID.EYES);
    }
    if (settings.includes("lips_coloring")) {
        bnb.scene.enableRecognizerFeature(bnb.FeatureID.LIPS);
        bnb.scene.enableRecognizerFeature(bnb.FeatureID.LIPS_SHINE);
    }
    if (settings.includes("hair_coloring")) {
        bnb.scene.enableRecognizerFeature(bnb.FeatureID.HAIR);
    }
    if (settings.includes("backdrop")) {
        bnb.scene.enableRecognizerFeature(bnb.FeatureID.BACKGROUND);
    }
}

/** ----- FaceMorph API ------ **/
function applyCheeksMorphing(value) {
    FaceMorph.face(value)
}

function applyEyesMorphing(value) {
    FaceMorph.eyes(value)
}

function applyNoseMorphing(value) {
    FaceMorph.nose(value)
}

function applyEyesColoring(value) {
    Eyes.whitening(value)
}

function applyTeethWhitening(value) {
   Teeth.whitening(value)
}

/** ----- Foregrounds ------ **/
function setForegroundTexture(path){
    Foreground.enable();
    Foreground.texture(path);
}

function deleteForeground(){
    Foreground.disable();
    Foreground.blend(0);
}

function setForegroundBlending(blendingMode){
    let blendModeValue;
    switch (blendingMode) {
        case "normal":
            blendModeValue = 0;
            break;
        case "multiply":
            blendModeValue = 1;
            break;
        case "screen":
            blendModeValue = 2;
            break;
        case "softlight":
            blendModeValue = 3;
            break;
        case "overlay":
            blendModeValue = 4;
            break;
        case "colordodge":
            blendModeValue = 5;
            break;
        case "lighten":
            blendModeValue = 6;
            break;
    }
    Foreground.blend(blendModeValue);
}

/** ----- Makeups ------- **/
function setMakeup(makeupPath) {
    Makeup.set(makeupPath);
}

function removeMakeup() {
    Makeup.clear();
}

/** ----- Lut filter ------- **/
function setLutFilter(filterPath) {
    Filter.set(filterPath);
}

function setLutFilterStrength(value) {
    Filter.strength(parseFloat(value));
}

function removeLutFilter() {
    Filter.clear();
}

/** ----- Camera frame ------ **/
function enableCameraFrame(enable) {
    if (enable === 'true') {
        CameraFrame.enable();
        CameraFrame.texture("modules/camera-frame/camera_frame.png");
    } else {
        CameraFrame.disable();
    }
}

/** ----- Lips size ------- **/

function setLipsSize(value) {
    FaceMorph.lips(parseFloat(value));
}

/** ----- Hair coloring ------- **/
function setHairColor(colors) {
    var colorsComponents = colors.split(" ");
    var colorsCount = Math.floor(colorsComponents.length / 4);

    var color1 = colorsComponents.slice(0, 4).join(" ");
    var color2 = colorsComponents.slice(4, 8).join(" ");
    var color3 = colorsComponents.slice(8, 12).join(" ");
    var color4 = colorsComponents.slice(12, 16).join(" ");
    var color5 = colorsComponents.slice(16, 20).join(" ");

    switch (colorsCount) {
        case 1:
            Hair.color(color1);
            break;
        case 2:
            Hair.color(color1, color2);
            break;
        case 3:
            Hair.color(color1, color2, color3);
            break;
        case 4:
            Hair.color(color1, color2, color3, color4);
            break;
        case 5:
            Hair.color(color1, color2, color3, color4, color5);
            break;
    }
}

function removeHairColoring() {
    Hair.clear();
}

/** ----- Eyes coloring ------- **/
function setEyesColor(color) {
    Eyes.color(color);
}

function removeEyesColoring() {
    Eyes.clear();
}

/** ----- Lips coloring ------- **/
function setLipsColor(color) {
    Lips.matt(color)
}

function setShinyLipsColor(color) {
    Lips.shiny(color)
}

function setShinyLipsParams(params) {
    var shinyLipsParams = params.split(" ");

    var saturation = shinyLipsParams[0];
    var shineIntensity = shinyLipsParams[1];
    var shineBleeding = shinyLipsParams[2];
    var brightness = shinyLipsParams[3];

    Lips.saturation(saturation);
    Lips.shineIntensity(shineIntensity);
    Lips.shineBleeding(shineBleeding);
    Lips.brightness(brightness);
}

function removeLipsColoring() {
    Lips.clear();
}

/** ----- Bacground ------- **/
function setBackground(backgroundPath) {
    Background.texture(backgroundPath);
}

function removeBackground() {
    Background.clear();
}

function setBlurBackground(value) {
    Background.blur(parseFloat(value));
} 

/** ----- Beauty tools ------- **/
function applyBeautySettings(params) {
    var settings = JSON.parse(params);

    if ("softlight_alpha" in settings)
    {
        Softlight.strength(settings["softlight_alpha"]);
    }
    if ("skin_soft_str" in settings)
    {
        Skin.softening(settings["skin_soft_str"]);
    }
    if ("morph_cheeks_str" in settings)
    {
        FaceMorph.face(settings["morph_cheeks_str"]);
    }
    if ("morph_eyes_str" in settings)
    {
        FaceMorph.eyes(settings["morph_eyes_str"]);
    }
    if ("morph_nose_str" in settings)
    {
        FaceMorph.nose(settings["morph_nose_str"]);
    }
    if ("teeth_whitening_str" in settings)
    {
        Teeth.whitening(settings["teeth_whitening_str"]);
    }
}

function enableEyebagsProcessing(enable) {
    if (enable === 'true') {
        EyeBagsRemoval.enable();
    } else {
        EyeBagsRemoval.disable();
    }
}