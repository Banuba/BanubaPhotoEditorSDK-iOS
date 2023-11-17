#include <bnb/glsl.frag>

BNB_IN(0)
vec2 var_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_y);
BNB_DECLARE_SAMPLER_2D(2, 3, tex_u);
BNB_DECLARE_SAMPLER_2D(4, 5, tex_v);
BNB_DECLARE_SAMPLER_2D(6, 7, tex_uv);
BNB_DECLARE_SAMPLER_2D(8, 9, tex_rgb);

#include <bnb/sample_camera.glsl>

void main()
{
    vec2 uv = var_uv;
    bnb_FragColor = bnb_sample_camera(uv);
    // discard pixels where uv values are out of range [0, 1]
    vec2 s = step(vec2(0., 0.), uv) - step(vec2(1., 1.), uv);
    bnb_FragColor.rgb = mix(vec3(0., 0., 0.), bnb_FragColor.rgb, s.x * s.y);
    bnb_FragColor.a = 1.;
}