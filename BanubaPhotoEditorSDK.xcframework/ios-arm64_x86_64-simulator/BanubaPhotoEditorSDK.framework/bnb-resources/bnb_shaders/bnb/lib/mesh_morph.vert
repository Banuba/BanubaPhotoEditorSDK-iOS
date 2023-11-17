#include <bnb/glsl.vert>

layout(location = 0) in vec3 attrib_pos;
#if defined(BNB_VK_1)
layout(location = 1) in uint attrib_n;
layout(location = 2) in uint attrib_t;
#else
layout(location = 1) in vec4 attrib_n;
layout(location = 2) in vec4 attrib_t;
#endif
layout(location = 3) in vec2 attrib_uv;
layout(location = 4) in uvec4 attrib_bones;
layout(location = 5) in vec4 attrib_weights;

BNB_DECLARE_SAMPLER_2D(0, 1, bnb_UVMORPH);
BNB_DECLARE_SAMPLER_2D(2, 3, bnb_STATICPOS);

centroid BNB_OUT(0) vec2 var_c;

void main()
{
    const int EXPAND_PASSES = 8;
    const float NPUSH = 75.;

    int i = int(gl_InstanceID);

    float scale = 1. - float(i) / float(EXPAND_PASSES + 1);
    scale = scale * scale * (3. - 2. * scale); // smoothstep fall-off
    float d0 = float(i) / float(EXPAND_PASSES + 1);
    float d1 = float(i + 1) / float(EXPAND_PASSES + 1);
#ifndef BNB_VK_1
    vec4 npush_scale = vec4(NPUSH * float(i) / float(EXPAND_PASSES), scale * 0.5 * MORPH_WEIGHT, d1 - d0, d0 + d1 - 1.);
#else
    vec4 npush_scale = vec4(NPUSH * float(i) / float(EXPAND_PASSES), scale * 0.5 * MORPH_WEIGHT, (d1 - d0) * 0.5, (d0 + d1) * 0.5);
#endif
    const float max_range = 40.;
    vec3 translation = textureLod(BNB_SAMPLER_2D(bnb_UVMORPH), smoothstep(0., 1., attrib_uv), 0.).xyz * (2. * max_range) - max_range;
    vec3 vpos = attrib_pos + translation;

    gl_Position = bnb_MVP * vec4(vpos * (1. + npush_scale.x / length(vpos)), 1.);
    gl_Position.z = gl_Position.z * npush_scale.z + gl_Position.w * npush_scale.w;

    vec4 pos_no_push = bnb_MVP * vec4(vpos, 1.);
    vec2 uv = attrib_uv;
#ifndef BNB_VK_1
    uv.y = 1.0 - uv.y;
#endif
    vec3 static_pos = textureLod(BNB_SAMPLER_2D(bnb_STATICPOS), uv, 0.).xyz;
    vec4 original_pos = bnb_MVP * vec4(static_pos + translation, 1.);
    var_c = npush_scale.y * (original_pos.xy / original_pos.w - pos_no_push.xy / pos_no_push.w);
}