uniform vec2 u_texUV;   //纹理需要是ccNextPOT
uniform sampler2D u_texture;

#ifdef GL_ES
varying mediump vec2 v_texCoord;
varying lowp vec4 v_color;
#else
varying vec2 v_texCoord;
varying vec4 v_color;
#endif

void main()
{
    gl_FragColor = texture2D(CC_Texture0,v_texCoord)*texture2D(u_texture,v_texCoord);
}