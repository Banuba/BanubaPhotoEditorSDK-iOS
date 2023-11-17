#include <bnb/glsl.vert>

layout(location = 0) in vec3 attrib_pos;
layout(location = 1) in vec3 attrib_pos_static;
layout(location = 2) in vec2 attrib_uv;
layout(location = 3) in vec4 attrib_red_mask;

BNB_OUT(0)
vec3 maskColor;
BNB_OUT(1)
vec4 var_uv_bg_uv;

invariant gl_Position;

void main()
{
    gl_Position = bnb_MVP * vec4(attrib_pos, 1.);
    maskColor = attrib_red_mask.xyz;
    vec2 bg_uv = (gl_Position.xy / gl_Position.w) * 0.5 + 0.5;
    var_uv_bg_uv = vec4(attrib_uv, bg_uv);

#ifdef BNB_VK_1
    var_uv_bg_uv.w = 1. - var_uv_bg_uv.w;
#endif
}