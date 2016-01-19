
uniform sampler2D u_texture;

#ifdef GL_ES
varying lowp vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

void main()
{
    gl_FragColor = texture2D(CC_Texture0,v_texCoord)*texture2D(u_texture,v_texCoord);
}