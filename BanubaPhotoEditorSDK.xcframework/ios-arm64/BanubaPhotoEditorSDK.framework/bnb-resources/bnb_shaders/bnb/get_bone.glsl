#ifndef BNB_GET_BONE_GLSL
#define BNB_GET_BONE_GLSL

mat4 bnb_get_bone(uint bone_idx, int y)
{
    int b = int(bone_idx) * 3;
    mat4 m = mat4(
        texelFetch(BNB_SAMPLER_2D(bnb_BONES), ivec2(b, y), 0),
        texelFetch(BNB_SAMPLER_2D(bnb_BONES), ivec2(b + 1, y), 0),
        texelFetch(BNB_SAMPLER_2D(bnb_BONES), ivec2(b + 2, y), 0),
        vec4(0., 0., 0., 1.)
    );
    return m;
}

#endif // BNB_GET_BONE_GLSL