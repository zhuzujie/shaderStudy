#ifdef GL_ES
varying mediump vec2 v_texCoord1;
#else
varying vec2 v_texCoord1;
#endif

void main()
{
    gl_FragColor = texture2D(CC_Texture0,v_texCoord1);
}