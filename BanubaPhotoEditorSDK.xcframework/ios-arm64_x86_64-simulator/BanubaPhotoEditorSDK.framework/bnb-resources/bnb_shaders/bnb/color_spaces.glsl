// https://github.com/tobspr/GLSL-Color-Spaces/blob/master/ColorSpaces.inc.glsl
// https://github.com/graypegg/chromatism

#ifndef BNB_COLOR_SPACES_GLSL
#define BNB_COLOR_SPACES_GLSL

// D65
const vec3 bnb_color_spaces_WHITE = vec3(0.95047, 1.0000, 1.08883);
const float bnb_color_spaces_EPSILON = 216. / 24389.;
const float bnb_color_spaces_KAPPA = 24389. / 27.;
const float bnb_color_spaces_PI = 3.1415926538;

// clang-format off
const mat3 bnb_color_spaces_RGB_TO_XYZ = mat3(
    0.4124564, 0.2126729, 0.0193339, 
    0.3575761, 0.7151522, 0.1191920, 
    0.1804375, 0.0721750, 0.9503041
);

const mat3 bnb_color_spaces_XYZ_TO_RGB = mat3(
    3.2404542, -0.9692660, 0.0556434, 
    -1.5371385, 1.8760108, -0.2040259, 
    -0.4985314, 0.0415560, 1.0572252
);
// clang-format on

const float bnb_color_spaces_YUV2RGB_RED_CrV = 1.402;
const float bnb_color_spaces_YUV2RGB_GREEN_CbU = 0.3441;
const float bnb_color_spaces_YUV2RGB_GREEN_CrV = 0.7141;
const float bnb_color_spaces_YUV2RGB_BLUE_CbU = 1.772;

vec3 bnb_sRGB_to_linear(vec3 srgb)
{
    return vec3(
        srgb.r <= 0.04045 ? srgb.r / 12.92 : pow((srgb.r + 0.055) / 1.055, 2.4),
        srgb.g <= 0.04045 ? srgb.g / 12.92 : pow((srgb.g + 0.055) / 1.055, 2.4),
        srgb.b <= 0.04045 ? srgb.b / 12.92 : pow((srgb.b + 0.055) / 1.055, 2.4)
    );
}

vec3 bnb_linear_to_sRGB(vec3 lrgb)
{
    return vec3(
        lrgb.r <= 0.0031308 ? lrgb.r * 12.92 : 1.055 * pow(lrgb.r, 1.0 / 2.4) - 0.055,
        lrgb.g <= 0.0031308 ? lrgb.g * 12.92 : 1.055 * pow(lrgb.g, 1.0 / 2.4) - 0.055,
        lrgb.b <= 0.0031308 ? lrgb.b * 12.92 : 1.055 * pow(lrgb.b, 1.0 / 2.4) - 0.055
    );
}


/* yuva */


vec4 bnb_rgba_to_yuva(vec4 rgba)
{
    vec4 yuva = vec4(0.);

    yuva.x = rgba.r * 0.299 + rgba.g * 0.587 + rgba.b * 0.114;
    yuva.y = rgba.r * -0.169 + rgba.g * -0.331 + rgba.b * 0.5 + 0.5;
    yuva.z = rgba.r * 0.5 + rgba.g * -0.419 + rgba.b * -0.081 + 0.5;
    yuva.w = rgba.a;

    return yuva;
}

vec4 bnb_yuva_to_rgba(vec4 yuva)
{
    float y = yuva.x;
    float u = yuva.y - 0.5;
    float v = yuva.z - 0.5;

    float r = y + bnb_color_spaces_YUV2RGB_RED_CrV * v;
    float g = y - bnb_color_spaces_YUV2RGB_GREEN_CbU * u - bnb_color_spaces_YUV2RGB_GREEN_CrV * v;
    float b = y + bnb_color_spaces_YUV2RGB_BLUE_CbU * u;

    return vec4(r, g, b, yuva.a);
}


/* XYZ */


vec3 bnb_rgb_to_XYZ(vec3 rgb)
{
    return bnb_color_spaces_RGB_TO_XYZ * rgb;
}

vec3 bnb_XYZ_to_rgb(vec3 xyz)
{
    return clamp(bnb_color_spaces_XYZ_TO_RGB * xyz, 0., 1.);
}


/* Luv */

// https://www.easyrgb.com/en/math.php
// http://www.brucelindbloom.com/index.html?Math.html

vec2 bnb_color_spaces_chrome_coords(vec3 c)
{
    return c.xy * vec2(4., 9.) / (c.x + 15. * c.y + 3. * c.z);
}

vec3 bnb_XYZ_to_Luv(vec3 xyz)
{
    float yr = xyz.y / bnb_color_spaces_WHITE.y;

    float L = yr > bnb_color_spaces_EPSILON
                  ? (116. * pow(yr, 1. / 3.)) - 16.
                  : bnb_color_spaces_KAPPA * yr;

    vec2 uv_ = bnb_color_spaces_chrome_coords(xyz);
    vec2 uv_r = bnb_color_spaces_chrome_coords(bnb_color_spaces_WHITE);

    vec2 uv = 13. * L * (uv_ - uv_r);

    return vec3(L, uv);
}

vec3 bnb_Luv_to_XYZ(vec3 luv)
{
    vec2 uv0 = bnb_color_spaces_chrome_coords(bnb_color_spaces_WHITE);

    float a = (1. / 3.) * (52. * luv.x / (luv.y + 13. * luv.x * uv0.x) - 1.);

    float Y = luv.x > (bnb_color_spaces_KAPPA * bnb_color_spaces_EPSILON)
                  ? (pow(((luv.x + 16.) / 116.), 3.))
                  : luv.x / bnb_color_spaces_KAPPA;

    float b = -5. * Y;
    float d = Y * (((39. * luv.x) / (luv.z + ((13. * luv.x) * uv0.y))) - 5.);

    float X = (d - b) / (a - (-1. / 3.));
    float Z = (X * a) + b;

    return vec3(X, Y, Z);
}


/* LCh */


vec3 bnb_Luv_to_LCh(vec3 luv)
{
    float L = luv.x;
    float C = sqrt(pow(luv.y / 100., 2.) + pow(luv.z / 100., 2.));

    float h = atan(luv.z, luv.y);

    if (h < 0.)
        h += (2. * bnb_color_spaces_PI);

    h = degrees(h);

    return vec3(L / 100., C, h);
}

vec3 bnb_LCh_to_Luv(vec3 lch)
{
    float L = lch.x;

    float h = radians(lch.z);

    float u = lch.y * cos(h);
    float v = lch.y * sin(h);

    return vec3(L * 100., u * 100., v * 100.);
}


/* YIQ / YUV */


vec3 bnb_rgb_to_YIQ(vec3 rgb)
{
    float y = (0.299 * rgb.r) + (0.587 * rgb.g) + (0.114 * rgb.b);
    float i = (0.596 * rgb.r) + (-0.274 * rgb.g) + (-0.322 * rgb.b);
    float q = (0.211 * rgb.r) + (-0.523 * rgb.g) + (0.312 * rgb.b);
    /* YIQ is not a transformation of RGB, so it's pretty lossy */
    i = clamp(i, -0.5957, 0.5957);
    q = clamp(q, -0.5226, 0.5226);

    return vec3(y, i, q);
}

vec3 bnb_YIQ_to_rgb(vec3 yiq)
{
    float i = clamp(yiq.y, -0.5957, 0.5957);
    float q = clamp(yiq.z, -0.5226, 0.5226);

    float r = clamp(yiq.x + (0.956 * i) + (0.621 * q), 0., 1.);
    float g = clamp(yiq.x + (-0.272 * i) + (-0.647 * q), 0., 1.);
    float b = clamp(yiq.x + (-1.106 * i) + (-1.703 * q), 0., 1.);

    return vec3(r, g, b);
}


/* Helpers */

// Those functions should not be used in new effects as there is no search for
// closest representable RGB color in conversion from XYZ.
// There is just a clamp into [0,1] RGB in bnb_XYZ_to_rgb
// and this can produce wrong colors in some edge cases.

// skip sRGB <-> linear conversions in LCh helpers
// to make Makeup effect from v1.7 work the same way with later sdk versions

vec3 bnb_rgb_to_LCh(vec3 rgb)
{
    return bnb_Luv_to_LCh(bnb_XYZ_to_Luv(bnb_rgb_to_XYZ(/*bnb_sRGB_to_linear*/ (rgb))));
}

vec3 bnb_LCh_to_rgb(vec3 lch)
{
    return /*bnb_linear_to_sRGB*/ (bnb_XYZ_to_rgb(bnb_Luv_to_XYZ(bnb_LCh_to_Luv(lch))));
}

vec3 bnb_rgb_to_Luv(vec3 rgb)
{
    return bnb_XYZ_to_Luv(bnb_rgb_to_XYZ(bnb_sRGB_to_linear(rgb)));
}

vec3 bnb_Luv_to_rgb(vec3 luv)
{
    return bnb_linear_to_sRGB(bnb_XYZ_to_rgb(bnb_Luv_to_XYZ(luv)));
}

#endif // BNB_COLOR_SPACES_GLSL
