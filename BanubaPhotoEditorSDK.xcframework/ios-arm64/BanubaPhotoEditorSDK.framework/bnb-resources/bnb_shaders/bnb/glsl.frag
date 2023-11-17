/**
 * Common frgament sgader declaration. Always make it as first include.
 * Other includes rely on it.
 */


#ifndef BNB_FRAGMENT_SHADER
#define BNB_FRAGMENT_SHADER

#include <bnb/version.glsl>

#include <bnb/samplers_declaration.glsl>
#include <bnb/textures_lookup.glsl>

//---------- In-out ----------

#if defined(BNB_GL_ES_3) || defined(BNB_GL)
    #define BNB_IN(l) in
#else
    #define BNB_IN(l) layout(location = l) in
#endif

#define BNB_CENTROID centroid
// declare out color
layout(location = 0) out vec4 bnb_FragColor;
#endif // BNB_FRAGMENT_SHADER