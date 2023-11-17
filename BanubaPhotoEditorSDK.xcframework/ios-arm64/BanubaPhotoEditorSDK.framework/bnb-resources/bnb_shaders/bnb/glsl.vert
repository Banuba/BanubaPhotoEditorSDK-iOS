/**
 * Common vertex shader declaration. Always include first. Always
 * include in `main` source only.
 * Other includes rely on it.
 */

#ifndef BNB_VERTEX_SHADER
#define BNB_VERTEX_SHADER

#include <bnb/version.glsl>
#include <bnb/samplers_declaration.glsl>
#include <bnb/textures_lookup.glsl>

#define BNB_IN in

#if defined(BNB_GL_ES_3) || defined(BNB_GL)
    #define BNB_OUT(l) out
    #define BNB_LAYOUT_LOCATION(l) layout(location = l)
#elif defined(BNB_VK_1)
    #define BNB_OUT(l) layout(location = l) out
    #define BNB_LAYOUT_LOCATION(l) layout(location = l)
out gl_PerVertex
{
    vec4 gl_Position;
    float gl_PointSize;
};
#endif

#ifdef BNB_VK_1
    #define gl_VertexID gl_VertexIndex
    #define gl_InstanceID gl_InstanceIndex
#endif

#endif // BNB_VERTEX_SHADER