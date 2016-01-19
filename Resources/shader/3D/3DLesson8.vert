attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normal;

#ifdef GL_ES
    varying lowp vec2 v_texCoord;
    varying lowp vec3 v_normal;
#else
    varying vec2 v_texCoord;
    varying vec3 v_normal;
#endif


void main()
{
    //记住MVP转换
    gl_Position = CC_MVPMatrix * a_position;
    v_texCoord = a_texCoord;
    //法线
    v_normal = CC_NormalMatrix * a_normal;
}