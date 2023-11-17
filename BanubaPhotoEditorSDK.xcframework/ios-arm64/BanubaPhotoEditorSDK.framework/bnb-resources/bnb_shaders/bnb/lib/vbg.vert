#include <bnb/glsl.vert>

layout(location = 0) in vec2 attrib_pos;

BNB_OUT(0)
vec2 var_uv;
BNB_OUT(1)
vec2 var_bg_uv;

#include <bnb/transform_uv.glsl>

void main()
{
    vec2 v = attrib_pos;
    gl_Position = vec4(v, 0., 1.);
    var_uv = v * 0.5 + 0.5;
    var_bg_uv = var_uv;

#ifdef BNB_VK_1
    var_uv.y = 1. - var_uv.y;
    var_bg_uv.y = 1. - var_bg_uv.y;
#endif

    vec2 bg_tex_size = vbg_tex_size_a.xy;

    if (vbg_tex_size_a.x < 1.0 || vbg_tex_size_a.y < 1.0) {
        bg_tex_size = bnb_SCREEN.xy;
    }

    float background_rotation_angle = 0.;
    background_rotation_angle += vbg_scale_rot_mode.z;

    float degrees_to_radians = 0.017453292;
#ifdef BNB_VK_1
    degrees_to_radians *= -1.0;
#endif

    var_bg_uv = bnb_rotate_uv(var_bg_uv, degrees_to_radians * (background_rotation_angle));
    var_bg_uv = bnb_scale_uv(var_bg_uv, vbg_scale_rot_mode.xy);
    var_bg_uv = bnb_contain_uv(var_bg_uv, bg_tex_size, vbg_scale_rot_mode.w, background_rotation_angle);

#ifndef BNB_VK_1
    var_bg_uv.y = 1. - var_bg_uv.y;
#endif
}
