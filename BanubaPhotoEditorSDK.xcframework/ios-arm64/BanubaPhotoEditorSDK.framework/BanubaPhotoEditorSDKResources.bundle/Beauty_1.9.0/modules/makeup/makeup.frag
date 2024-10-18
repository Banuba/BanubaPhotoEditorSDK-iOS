#include <bnb/glsl.frag>

BNB_IN(0)
vec2 var_uv;
BNB_IN(1)
vec2 var_face_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_contour);
BNB_DECLARE_SAMPLER_2D(2, 3, tex_blushes);
BNB_DECLARE_SAMPLER_2D(4, 5, tex_highlighter);
BNB_DECLARE_SAMPLER_2D(6, 7, tex_eyeshadow);
BNB_DECLARE_SAMPLER_2D(8, 9, tex_eyeliner);
BNB_DECLARE_SAMPLER_2D(10, 11, tex_lashes);
BNB_DECLARE_SAMPLER_2D(12, 13, tex_makeup);
BNB_DECLARE_SAMPLER_2D(14, 15, tex_blushes_mask);

vec4 blend(vec4 base, vec4 target, BNB_DECLARE_SAMPLER_2D_ARGUMENT(tex_mask), float m)
{
    vec4 tex = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_mask), var_face_uv);
    tex.rgb += target.rgb;
    tex.a *= target.a;

    if(m <= 1.){
        tex.a *= m*target.a*2.5;
    }

    // https://gist.github.com/JordanDelcros/518396da1c13f75ee057
    if (tex.a == 0.)
        return base;
    if (base.a == 0.)
        return tex;

    float a = 1. - (1. - base.a) * (1. - tex.a);
    vec3 rgb = mix(base.rgb * base.a, tex.rgb, tex.a) / a;

    return vec4(rgb,a);
}

vec4 blend(vec4 base, BNB_DECLARE_SAMPLER_2D_ARGUMENT(tex_mask))
{
    return blend(base, vec4(0., 0., 0., 1.), BNB_PASS_SAMPLER_ARGUMENT(tex_mask), 2.);
}

void main()
{
    bnb_FragColor = vec4(0.);
    float mask_blushes = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_blushes_mask), var_face_uv).a;
    bnb_FragColor = blend(bnb_FragColor, var_contour_color, BNB_PASS_SAMPLER_ARGUMENT(tex_contour), 2.);
    bnb_FragColor = blend(bnb_FragColor, var_blushes_color, BNB_PASS_SAMPLER_ARGUMENT(tex_blushes), mask_blushes);
    bnb_FragColor = blend(bnb_FragColor, var_highlighter_color, BNB_PASS_SAMPLER_ARGUMENT(tex_highlighter), 2.);
    bnb_FragColor = blend(bnb_FragColor, var_eyeshadow_color, BNB_PASS_SAMPLER_ARGUMENT(tex_eyeshadow), 2.);
    bnb_FragColor = blend(bnb_FragColor, BNB_PASS_SAMPLER_ARGUMENT(tex_makeup));
    bnb_FragColor = blend(bnb_FragColor, var_eyeliner_color, BNB_PASS_SAMPLER_ARGUMENT(tex_eyeliner), 2.);
    bnb_FragColor = blend(bnb_FragColor, var_lashes_color, BNB_PASS_SAMPLER_ARGUMENT(tex_lashes), 2.);
}