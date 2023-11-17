#ifndef BNB_VERSION_GLSL
#define BNB_VERSION_GLSL

#ifdef GL_ES
    #define BNB_GL_ES_3 1
#else
    #ifdef VULKAN
        #define BNB_VK_1 1
    #else
        #define BNB_GL 1
    #endif
#endif

#endif // BNB_VERSION_GLSL
