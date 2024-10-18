#include <bnb/glsl.frag>

#define ALPHA1 0.9
#define ALPHA2 0.6
#define ALPHA3 0.7


BNB_IN(0)
vec4 var_face0_uv;
BNB_IN(1)
vec4 var_face1_uv;
BNB_IN(2)
vec4 var_face2_uv;
BNB_IN(3)
vec4 var_face3_uv;


BNB_DECLARE_SAMPLER_2D(2, 3, tex_camera);

BNB_DECLARE_SAMPLER_2D(0, 1, tex_mask);

void main()
{
    vec4 var_face0_flip_uv = var_face0_uv;
    vec4 var_face1_flip_uv = var_face1_uv;
    vec4 var_face2_flip_uv = var_face2_uv;
    vec4 var_face3_flip_uv = var_face3_uv;

#ifdef BNB_VK_1
    var_face0_flip_uv.y = 1. - var_face0_flip_uv.y;
    var_face1_flip_uv.y = 1. - var_face1_flip_uv.y;
    var_face2_flip_uv.y = 1. - var_face2_flip_uv.y;
    var_face3_flip_uv.y = 1. - var_face3_flip_uv.y;
#endif

    vec3 face0 = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), var_face0_flip_uv.xy).xyz;

    vec3 face = face0;
    face = mix(face, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), var_face1_flip_uv.xy).xyz, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_mask), var_face1_flip_uv.zw).x * ALPHA1);
    face = mix(face, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), var_face2_flip_uv.xy).xyz, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_mask), var_face2_flip_uv.zw).x * ALPHA2);
    face = mix(face, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), var_face3_flip_uv.xy).xyz, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_mask), var_face3_flip_uv.zw).x * ALPHA3);

    face = mix(face, face0, BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_mask), var_face0_flip_uv.zw).x);

    bnb_FragColor = vec4(face, 1.);
}
