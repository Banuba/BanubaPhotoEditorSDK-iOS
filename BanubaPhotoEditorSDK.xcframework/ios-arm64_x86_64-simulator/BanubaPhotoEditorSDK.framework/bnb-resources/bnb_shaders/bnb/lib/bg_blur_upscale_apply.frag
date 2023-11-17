#include <bnb/glsl.frag>

BNB_DECLARE_SAMPLER_2D(0, 1, s_upscale_tex);
BNB_DECLARE_SAMPLER_2D(2, 3, s_src_tex);

BNB_IN(0)
vec4 var_uv;

void main()
{
    // clang-format off
    vec3 sum =
        (1. / 6.) * (
            textureLod(BNB_SAMPLER_2D(s_upscale_tex), var_uv.zw, 0.).xyz +
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.zw, 0., ivec2(-1, 0)).xyz +
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.zw, 0., ivec2(0, -1)).xyz +
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.zw, 0., ivec2(-1, -1)).xyz) +
        (1. / 12.) * (
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.xy, 0., ivec2(1, 0)).xyz +
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.xy, 0., ivec2(-1, 0)).xyz +
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.xy, 0., ivec2(0, 1)).xyz +
            textureLodOffset(BNB_SAMPLER_2D(s_upscale_tex), var_uv.xy, 0., ivec2(0, -1)).xyz);
    // clang-format on
    vec2 src_uv = var_uv.xy;
#ifdef BNB_VK_1
    src_uv.y = 1. - src_uv.y;
#endif
    vec4 src = textureLod(BNB_SAMPLER_2D(s_src_tex), src_uv, 0.);

    bnb_FragColor = vec4(mix(sum, src.xyz, src.w), 1.);
}
