#include <bnb/glsl.vert>

layout(location = 0) in vec2 attrib_pos;

BNB_OUT(0)
vec4 var_uv;

void main()
{
    vec2 v = attrib_pos;
    gl_Position = vec4(v, 0., 1.);

    mat2 ori = mat2(bnb_camera_orientation.xy, bnb_camera_orientation.zw);
    var_uv.xy = (ori * vec2(v.x * bnb_camera_scale_i420.x, v.y)) * 0.5 + 0.5;
    var_uv.zw = vec2(vec3(v, 1.) * mat3(background_nn_transform));
}