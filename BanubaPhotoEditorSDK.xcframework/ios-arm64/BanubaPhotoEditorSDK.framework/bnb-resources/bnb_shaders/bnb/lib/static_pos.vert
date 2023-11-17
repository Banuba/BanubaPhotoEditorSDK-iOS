#include <bnb/glsl.vert>

layout(location = 0) in vec3 attrib_pos;
layout(location = 1) in vec2 attrib_uv;

BNB_OUT(0)
vec3 pos_static;

void main()
{
    vec2 v = attrib_uv * 2. - 1.;
    v.y = -v.y;
    gl_Position = vec4(v, 0., 1.);
    pos_static = attrib_pos;
}