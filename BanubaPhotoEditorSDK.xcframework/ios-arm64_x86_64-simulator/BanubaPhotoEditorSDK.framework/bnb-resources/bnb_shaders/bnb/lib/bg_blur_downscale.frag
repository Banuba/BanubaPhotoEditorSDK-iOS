#include <bnb/glsl.frag>

BNB_DECLARE_SAMPLER_2D(0, 1, s_downscale_tex);

BNB_IN(0)
vec2 var_uv;

void main()
{
    vec4 pixel = textureLod(BNB_SAMPLER_2D(s_downscale_tex), var_uv, 0.);

    vec4 pp = textureLodOffset(BNB_SAMPLER_2D(s_downscale_tex), var_uv, 0., ivec2(1, 1));
    vec4 mp = textureLodOffset(BNB_SAMPLER_2D(s_downscale_tex), var_uv, 0., ivec2(-1, 1));
    vec4 mm = textureLodOffset(BNB_SAMPLER_2D(s_downscale_tex), var_uv, 0., ivec2(-1, -1));
    vec4 pm = textureLodOffset(BNB_SAMPLER_2D(s_downscale_tex), var_uv, 0., ivec2(1, -1));

    // clang-format off
    vec3 sum = (0.5*pixel.xyz*(1. - pixel.w) + 0.125*(pp.xyz*(1. - pp.w) + mp.xyz*(1. - mp.w) + mm.xyz*(1. - mm.w) + pm.xyz*(1. - pm.w)))
        / (0.5*(1. - pixel.w) + 0.125*((1. - pp.w) + (1. - mp.w) + (1. - mm.w) + (1. - pm.w)));
    // clang-format on
    bnb_FragColor = vec4(sum, pixel.w);
}