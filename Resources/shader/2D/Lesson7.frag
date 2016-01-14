#ifdef GL_ES
varying mediump vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

void main()
{
    vec4 _inColor = texture2D(CC_Texture0,v_texCoord);
    float h = 0.3*_inColor.x + 0.59*_inColor.y + 0.11*_inColor.z;
    gl_FragColor = vec4(h,h,h,1.0);
}