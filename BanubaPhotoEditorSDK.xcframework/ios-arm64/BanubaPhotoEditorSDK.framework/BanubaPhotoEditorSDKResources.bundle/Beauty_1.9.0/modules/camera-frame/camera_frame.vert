#include <bnb/glsl.vert>
#include <bnb/decode_int1010102.glsl>
#include <bnb/matrix_operations.glsl>
#define bnb_IDX_OFFSET 0
#ifdef BNB_VK_1
    #ifdef gl_VertexID
        #undef gl_VertexID
    #endif
    #ifdef gl_InstanceID
        #undef gl_InstanceID
    #endif
    #define gl_VertexID gl_VertexIndex
    #define gl_InstanceID gl_InstanceIndex
#endif

BNB_LAYOUT_LOCATION(0)
BNB_IN vec3 attrib_pos;
BNB_LAYOUT_LOCATION(3)
BNB_IN vec2 attrib_uv;


BNB_OUT(0)
vec2 var_uv;

void main()
{
    vec2 vertPos = attrib_pos.xy;

    mat4 MV = mat4(90., 0., 0., 0., 0., 90., 0., 0., 0., 0., 1., 0., bnb_MV[3][0], bnb_MV[3][1], bnb_MV[3][2], 1.);

    gl_Position = bnb_PROJ * MV * vec4(vertPos, attrib_pos.z, 1.);
    var_uv = attrib_uv;
}
