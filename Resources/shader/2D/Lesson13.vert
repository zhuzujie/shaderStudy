attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

#ifdef GL_ES
varying mediump vec2 v_texCoord;
varying mediump vec4 v_color;
varying mediump vec2 v_pos;
#else
varying vec2 v_texCoord;
varying vec4 v_color;
varying vec2 v_pos;
#endif


void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_texCoord = a_texCoord;
    v_color = a_color;
    v_pos = a_position.xy;
}