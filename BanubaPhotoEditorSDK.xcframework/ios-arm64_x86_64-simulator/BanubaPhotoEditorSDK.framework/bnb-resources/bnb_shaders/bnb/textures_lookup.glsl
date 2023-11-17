#ifndef BNB_TEXTURES_LOOKUP_GLSL
#define BNB_TEXTURES_LOOKUP_GLSL

#define BNB_TEXTURE_2D(s, uv) texture(s, vec2(uv)) // NOTE: effect converter reqiure cast uv to vec2
#define BNB_TEXTURE_2D_ARRAY texture
#define BNB_TEXTURE_2D_LOD textureLod
#define BNB_TEXEL_FETCH_2D texelFetch
#define BNB_TEXTURE_CUBE texture
#define BNB_TEXTURE_CUBE_LOD textureLod
#define BNB_TEXTURE_3D texture
#define BNB_TEXTURE_3D_LOD textureLod
#define BNB_CENTROID centroid

#if defined(BNB_GL_ES_3) || defined(BNB_GL)
    #define BNB_SAMPLER_2D(sampler_name) sampler_name
    #define BNB_SAMPLER_2D_ARRAY(sampler_name) sampler_name
    #define BNB_SAMPLER_CUBE(sampler_name) sampler_name
    #define BNB_SAMPLER_3D(sampler_name) sampler_name
#elif defined(BNB_VK_1)
    #define BNB_SAMPLER_2D(sampler_name) sampler2D(texture_##sampler_name, sampler_##sampler_name)
    #define BNB_SAMPLER_2D_ARRAY(sampler_name) sampler2DArray(texture_##sampler_name, sampler_##sampler_name)
    #define BNB_SAMPLER_CUBE(sampler_name) samplerCube(texture_##sampler_name, sampler_##sampler_name)
    #define BNB_SAMPLER_3D(sampler_name) sampler3D(texture_##sampler_name, sampler_##sampler_name)
#endif

#endif // BNB_TEXTURES_LOOKUP_GLSL
