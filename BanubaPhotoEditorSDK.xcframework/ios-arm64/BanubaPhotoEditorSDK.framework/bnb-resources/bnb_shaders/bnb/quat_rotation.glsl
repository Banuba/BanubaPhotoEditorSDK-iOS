#ifndef BNB_QUAT_ROTATION
#define BNB_QUAT_ROTATION

vec3 bnb_quat_rotate(vec4 q, vec3 v)
{
    return v + 2. * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

float bnb_quat_to_side_euler(vec4 quat, float isMirroredCoeff, float initAngle)
{
    float angle = initAngle;
    vec4 q = quat;

    q.x = -q.x;
    q.y = -q.y;

    vec3 side = bnb_quat_rotate(q, vec3(1., 0., 0.));
    vec3 up = bnb_quat_rotate(q, vec3(0., 1., 0.));

    if (side.y > 0.7071 && bnb_SCREEN.x < bnb_SCREEN.y) {
        angle += 90. * isMirroredCoeff;
    } else if (side.y < -0.7071 && bnb_SCREEN.x < bnb_SCREEN.y) {
        angle += -90. * isMirroredCoeff;
    } else if (up.y < -0.7071 && bnb_SCREEN.x < bnb_SCREEN.y) {
        angle += 180.;
    }

    return angle;
}

vec4 bnb_quat_mul(vec4 q0, vec4 q1)
{
    float A = (q0.w + q0.x) * (q1.w + q1.x);
    float C = (q0.w - q0.x) * (q1.y + q1.z);
    float D = (q0.y + q0.z) * (q1.w - q1.x);
    float B = (q0.z - q0.y) * (q1.y - q1.z);
    float E = (q0.x + q0.z) * (q1.x + q1.y) * 0.5;
    float F = (q0.x - q0.z) * (q1.x - q1.y) * 0.5;
    float G = (q0.w + q0.y) * (q1.w - q1.z) * 0.5;
    float H = (q0.y - q0.w) * (q1.w + q1.z) * 0.5;
    return vec4(
        A - E + H - (F + G),
        C - F + E + (G + H),
        D - G + E - (F + H),
        B - H + G - (F + E)
    );
}

vec4 bnb_quat_conjugate(vec4 q)
{
    return vec4(-q.x, -q.y, -q.z, q.w);
}

#endif