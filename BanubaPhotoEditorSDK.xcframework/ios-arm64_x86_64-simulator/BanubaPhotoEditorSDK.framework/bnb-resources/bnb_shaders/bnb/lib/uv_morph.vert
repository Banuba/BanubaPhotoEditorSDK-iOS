#include <bnb/glsl.vert>

layout(location = 0) in vec3 attrib_pos;
layout(location = 1) in vec3 attrib_static_pos;
layout(location = 2) in vec2 attrib_uv;
layout(location = 3) in vec4 attrib_mask;

BNB_OUT(0)
vec3 translation;

void main()
{
    vec2 v = smoothstep(0., 1., attrib_uv) * 2. - 1.;
    gl_Position = vec4(v, 0., 1.);
    const float max_range = 40.; // morph translation will be clamped to [-max_range,+max_range]
    translation = ((attrib_pos - attrib_static_pos) / max_range) * 0.5 + 0.5;
}