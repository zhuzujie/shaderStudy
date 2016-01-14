attribute vec4 a_position;
attribute vec2 a_texCoord;
uniform vec4 a_color;   //使用setUniformVec4传参
//attribute vec4 a_color;   //使用setColor传参

#ifdef GL_ES
    varying mediump vec2 v_texCoord;
    varying lowp vec4 v_color;
#else
    varying vec2 v_texCoord;
    varying vec4 v_color;
#endif


void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_texCoord = a_texCoord;
    v_color = a_color;
}