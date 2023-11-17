#include <bnb/glsl.frag>

#include <bnb/texture_bicubic.glsl>


BNB_IN(0)
vec2 var_uv;
BNB_IN(1)
vec2 var_bg_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, s_bg_texture);
BNB_DECLARE_SAMPLER_2D(2, 3, s_src_texture);

void main()
{
    vec4 bg_color_mask = textureLod(BNB_SAMPLER_2D(s_src_texture), var_uv, 0.);
    vec3 bg_color = bg_color_mask.rgb;
    float mask = 1. - bg_color_mask.a;
    vec2 uv = var_bg_uv;

    vec2 uv_coeff = step(vec2(0.0, 0.0), uv) - step(vec2(1., 1.), uv);

    vec4 bg_tex_color = texture(BNB_SAMPLER_2D(s_bg_texture), uv);
    bg_tex_color.rgb *= uv_coeff.x * uv_coeff.y;

    float complete_mask = clamp(mask - (1. - bg_tex_color.a), 0., 1.);

    bnb_FragColor = vec4(
        mix(bg_color, bg_tex_color.rgb, complete_mask),
        clamp(vbg_tex_size_a.w * bg_tex_color.a, (1. - complete_mask), 1.)
    );
}
