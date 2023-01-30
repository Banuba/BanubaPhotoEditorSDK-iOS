#include <bnb/glsl.frag>

BNB_IN(0)
vec2 var_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_src);

void main()
{
    bnb_FragColor = textureLod(BNB_SAMPLER_2D(tex_src), var_uv, 0.);
}