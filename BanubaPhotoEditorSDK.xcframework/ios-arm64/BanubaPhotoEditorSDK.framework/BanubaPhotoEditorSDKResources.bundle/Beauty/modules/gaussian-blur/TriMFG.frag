#include <bnb/glsl.frag>


BNB_IN(0)
vec2 var_uv;

#define PI 6.28318530718
#define DIRECTIONS 32.0 // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
#define QUALITY 8.0     // BLUR QUALITY (Default 4.0 - More is better but slower)
#define SIZE 5.0        // BLUR SIZE (Radius)


BNB_DECLARE_SAMPLER_2D(0, 1, tex_camera);

void main()
{
    vec2 uv = var_uv;
#ifdef BNB_VK_1
    uv.y = 1. - uv.y;
#endif
    vec2 radius = SIZE / bnb_SCREEN.xy;
    vec4 color = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), uv);

    for (float d = 0.0; d < PI; d += PI / DIRECTIONS) {
        for (float i = 1.0 / QUALITY; i <= 1.0; i += 1.0 / QUALITY) {
            color += BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), uv + vec2(cos(d), sin(d)) * radius * i);
        }
    }

    color /= QUALITY * DIRECTIONS - 15.0;

    bnb_FragColor = color;
}
