#ifdef GL_ES
varying lowp vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform vec4 u_color;
uniform vec4 u_blendColor;


void main()
{
    gl_FragColor = texture2D(CC_Texture0, v_texCoord)*u_blendColor*u_color;
}