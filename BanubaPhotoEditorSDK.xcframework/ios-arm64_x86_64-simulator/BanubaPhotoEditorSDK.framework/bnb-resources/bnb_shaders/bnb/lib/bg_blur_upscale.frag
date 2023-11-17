#include <bnb/glsl.frag>

BNB_DECLARE_SAMPLER_2D(0, 1, s_upscale_tex);

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

    bnb_FragColor = vec4(sum, 1.);
}
