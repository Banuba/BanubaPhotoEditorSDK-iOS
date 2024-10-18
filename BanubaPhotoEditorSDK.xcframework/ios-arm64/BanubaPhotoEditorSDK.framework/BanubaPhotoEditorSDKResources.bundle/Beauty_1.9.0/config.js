'use strict';

const easysnap = require('./easysnap.js');

Object.assign(globalThis, easysnap.m);
/* Feel free to add your custom code below */


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
    Makeup.set("");
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
