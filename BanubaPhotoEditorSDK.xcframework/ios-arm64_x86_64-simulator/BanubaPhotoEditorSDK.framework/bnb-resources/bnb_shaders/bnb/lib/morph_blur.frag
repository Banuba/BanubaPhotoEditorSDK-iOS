#include <bnb/glsl.frag>

BNB_IN(0)
vec2 var_uv;
BNB_IN(1)
vec2 var_draw_id;

// kernel: 0.028532	0.067234	0.124009	0.179044	0.20236	0.179044	0.124009	0.067234	0.028532
const float s0 = 0.20236;
const float s1 = 0.124009 + 0.179044;
const float s2 = 0.028532 + 0.067234;

BNB_DECLARE_SAMPLER_2D(0, 1, s_color_source);

void main()
{
    int d = int(var_draw_id.x);

    float inv_sz = 1. / bnb_MORPH_BLUR_PASS_HEIGHT;

    if (d == 0) {
        inv_sz *= bnb_SCREEN.y / bnb_SCREEN.x;
    }

    float o1 = inv_sz * (1. + 0.179044 / s1);
    float o2 = inv_sz * (3. + 0.067234 / s2);

    vec2 uv1p = var_uv;
    vec2 uv1m = var_uv;

    vec2 uv2p = var_uv;
    vec2 uv2m = var_uv;

    if (d == 0) {
        uv1p[0] += o1;
        uv1m[0] -= o1;
        uv2p[0] += o2;
        uv2m[0] -= o2;
    } else {
        uv1p[1] += o1;
        uv1m[1] -= o1;
        uv2p[1] += o2;
        uv2m[1] -= o2;
    }

    vec2 o_blurred = s0 * textureLod(BNB_SAMPLER_2D(s_color_source), var_uv, 0.).xy
                     + s1 * (textureLod(BNB_SAMPLER_2D(s_color_source), uv1p, 0.).xy + textureLod(BNB_SAMPLER_2D(s_color_source), uv1m, 0.).xy)
                     + s2 * (textureLod(BNB_SAMPLER_2D(s_color_source), uv2p, 0.).xy + textureLod(BNB_SAMPLER_2D(s_color_source), uv2m, 0.).xy);

    bnb_FragColor = vec4(o_blurred, 0, 1.);
}