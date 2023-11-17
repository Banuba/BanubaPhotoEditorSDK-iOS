#ifndef BNB_SAMPLE_CAMERA_GLSL
#define BNB_SAMPLE_CAMERA_GLSL

vec4 bnb_sample_camera(vec2 uv)
{
    vec4 result;
    if (bnb_rgba_camera.x < 0.5) {
        float Y = textureLod(BNB_SAMPLER_2D(tex_y), uv, 0.).x;

        if (bnb_camera_scale_i420.y < 0.5) {
            vec2 UV = textureLod(BNB_SAMPLER_2D(tex_uv), uv, 0.).xy;
            result = vec4(Y, UV.x, UV.y, 1.) * bnb_conversion_matrix;
        } else {
            float U = textureLod(BNB_SAMPLER_2D(tex_u), uv, 0.).x;
            float V = textureLod(BNB_SAMPLER_2D(tex_v), uv, 0.).x;

            result = vec4(Y, U, V, 1.) * bnb_conversion_matrix;
        }
    } else {
        result = textureLod(BNB_SAMPLER_2D(tex_rgb), uv, 0.);
        if (bnb_rgba_camera.z > 0.5) {
            result = result.bgra; // BGRA
        } else if (bnb_rgba_camera.w > 0.5) {
            result = result.gbar; // ARGB
        }
    }
    return result;
}

#endif // BNB_SAMPLE_CAMERA_GLSL