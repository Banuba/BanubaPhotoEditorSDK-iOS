#ifndef BNB_MATRIX_OPERATIONS_GLSL
#define BNB_MATRIX_OPERATIONS_GLSL

mat3 bnb_inverse_trs2d(mat3 m)
{
    vec2 s = 1. / vec2(dot(vec2(m[0].x, m[1].x), vec2(m[0].x, m[1].x)), dot(vec2(m[0].y, m[1].y), vec2(m[0].y, m[1].y)));
    mat2 r = transpose(mat2(m[0].xy * s, m[1].xy * s));
    vec2 t = -(vec2(m[0].z, m[1].z) * r);
    return mat3(vec3(r[0], t.x), vec3(r[1], t.y), vec3(0., 0., 1.));
}

float bnb_mat2_as_vec4_determinant(vec4 m)
{
    return m.x * m.w - m.y * m.z;
}

#endif