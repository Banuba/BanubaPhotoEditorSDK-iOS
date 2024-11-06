#include <bnb/glsl.frag>
#include "background_mask.glsl"

BNB_IN(0)
vec2 var_uv;
BNB_IN(1)
vec2 var_mask_uv;


BNB_DECLARE_SAMPLER_2D(0, 1, tex_camera);
BNB_DECLARE_SAMPLER_2D(2, 3, segmentation_mask);


void main()
{
    vec4 camera = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), var_uv);
    float mask = background_mask(BNB_PASS_SAMPLER_ARGUMENT(segmentation_mask), var_mask_uv).x;
    mask = 1. - mask;
    vec4 image = vec4(0., 0., 0., 1.);

    vec3 res = camera.rgb;

    res = mix(res, image.rgb, image.a);
    vec3 var_background_transparency = vec3(1., 0., 0.);
    float transparency = min(1. - var_background_transparency.x + image.a, 1.);


    vec3 rgb = mix(camera.rgb, res.rgb, mask);

    float a = mix(camera.a, transparency, mask);


    bnb_FragColor = vec4(rgb, a);
}
