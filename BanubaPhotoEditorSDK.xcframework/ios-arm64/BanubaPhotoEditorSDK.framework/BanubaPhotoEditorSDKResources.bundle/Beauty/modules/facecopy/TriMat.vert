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

#define MASK_RADIUS 300.0 // in mm relative to face

#define OFFSET1 vec2(0.6, 0.3)
#define SCALE1 0.8

#define OFFSET2 vec2(-0.1, 0.9)
#define SCALE2 0.7

#define OFFSET3 vec2(-0.7, 0.1)
#define SCALE3 0.9

BNB_LAYOUT_LOCATION(0)
BNB_IN vec3 attrib_pos;


BNB_OUT(0)
vec4 var_face0_uv;
BNB_OUT(1)
vec4 var_face1_uv;
BNB_OUT(2)
vec4 var_face2_uv;
BNB_OUT(3)
vec4 var_face3_uv;

void main()
{
    vec2 v = attrib_pos.xy;
    gl_Position = vec4(v, 1., 1.);

    vec4 top_point = bnb_MVP * vec4(0., MASK_RADIUS, 40., 1.);
    top_point.xy /= top_point.w;
    vec4 bottom_point = bnb_MVP * vec4(0., -MASK_RADIUS, 40., 1.);
    bottom_point.xy /= bottom_point.w;
    vec2 mask_center = (top_point.xy + bottom_point.xy) * 0.5;
    float mask_height = top_point.y - bottom_point.y;
    float mask_width = mask_height * bnb_SCREEN.y / bnb_SCREEN.x;
    vec2 mask_bl_01 = (mask_center - vec2(mask_width, mask_height) * 0.5) * 0.5 + 0.5;
    vec2 mask_tr_01 = (mask_center + vec2(mask_width, mask_height) * 0.5) * 0.5 + 0.5;
    vec2 mask_size_01 = mask_tr_01 - mask_bl_01;

    var_face0_uv.xy = v * 0.5 + 0.5;
    var_face0_uv.zw = var_face0_uv.xy / mask_size_01 - mask_bl_01 / mask_size_01;

    var_face1_uv.xy = ((v - OFFSET1) / SCALE1) * 0.5 + 0.5;
    var_face1_uv.zw = var_face1_uv.xy / mask_size_01 - mask_bl_01 / mask_size_01;

    var_face2_uv.xy = ((v - OFFSET2) / SCALE2) * 0.5 + 0.5;
    var_face2_uv.zw = var_face2_uv.xy / mask_size_01 - mask_bl_01 / mask_size_01;

    var_face3_uv.xy = ((v - OFFSET3) / SCALE3) * 0.5 + 0.5;
    var_face3_uv.zw = var_face3_uv.xy / mask_size_01 - mask_bl_01 / mask_size_01;
}