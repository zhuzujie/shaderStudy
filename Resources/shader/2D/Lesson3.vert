attribute vec4 a_position;
attribute vec2 a_texCoord;

#ifdef GL_ES
    varying mediump vec2 v_texCoord1;
#else
    varying vec2 v_texCoord1;
#endif


void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_texCoord1 = a_texCoord;
}