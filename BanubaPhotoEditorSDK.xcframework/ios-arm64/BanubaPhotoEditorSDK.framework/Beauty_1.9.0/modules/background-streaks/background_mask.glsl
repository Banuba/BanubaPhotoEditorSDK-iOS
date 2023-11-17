#include <bnb/glsl.frag>
#include <bnb/texture_bicubic.glsl>

vec4 background_mask(BNB_DECLARE_SAMPLER_2D_ARGUMENT(tex_mask), vec2 uv)
{
    const float magnification = 2.;
    const float treshold = 0.2;

    vec4 mask = bnb_texture_bicubic(BNB_PASS_SAMPLER_ARGUMENT(tex_mask), uv);

    mask.x = pow(mask.x, 1. / magnification);
    mask.x = max(0., (mask.x - treshold) / (1. - treshold));

    return mask;
}
