#ifndef BNB_DECODE_INT1010102_GLSL
#define BNB_DECODE_INT1010102_GLSL

#if defined(BNB_VK_1)
vec4 bnb_decode_int1010102(uint u)
{
    float ux = u & 1023u;
    float uy = (u >> 10u) & 1023u;
    float uz = (u >> 20u) & 1023u;
    float uw = u >> 30u;
    float x = float(ux <= 511u ? ux : ux - 1024u) / 511.;
    float y = float(uy <= 511u ? uy : uy - 1024u) / 511.;
    float z = float(uz <= 511u ? uz : uz - 1024u) / 511.;
    float w = float(uw <= 1u ? uw : uw - 4u);
    return vec4(x, y, z, w);
}
#else
    #define bnb_decode_int1010102(v) v
#endif

/** decode_int1010102 is DEPRECATED */
#define decode_int1010102(arg) bnb_decode_int1010102(arg)

#endif // BNB_DECODE_INT1010102_GLSL