#include <bnb/glsl.vert>

layout(location = 0) in vec2 attrib_v;

BNB_OUT(0)
vec2 var_uv;
BNB_OUT(1)
vec2 var_draw_id;
void main()
{
    vec2 v = attrib_v;
    gl_Position = vec4(v, 0., 1.);
    var_uv = v * 0.5 + 0.5;
    var_draw_id = vec2(float(fxr_DrawID), 0.);
#if defined(BNB_VK_1)
    var_uv.y = 1. - var_uv.y;
#endif
}