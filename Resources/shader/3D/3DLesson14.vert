attribute vec4 a_position;
attribute vec3 a_normal;

#ifdef GL_ES
varying mediump vec3 v_reflect;
#else
varying vec3 v_reflect;
#endif


void main()
{
    
    gl_Position = CC_MVPMatrix * a_position;
    
    //注意是 CC_MVMatrix
    vec4 positionWorldViewSpace = CC_MVMatrix * a_position;
    //取得方向
    vec3 vEyeVertex = normalize(positionWorldViewSpace.xyz);
    //法线计算
    vec3 v_normalVector = CC_NormalMatrix * a_normal;
    //纹理寻址的方向  反射
    

    v_reflect = normalize(reflect(-vEyeVertex,v_normalVector));
    
}