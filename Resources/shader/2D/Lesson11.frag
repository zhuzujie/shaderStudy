#ifdef GL_ES
varying mediump vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform vec2 u_texSize;

void main()
{
    //1.0/u_texSize.x 1.0/u_texSize.y 一个像素单位
    //即 upLeftX = (v_texCoord.x * u_texSize.x - 1)/u_texSize.x
    vec2 upLeftUV = vec2(v_texCoord.x-1.0/u_texSize.x,v_texCoord.y - 1.0/u_texSize.y);
    vec4 bkColor = vec4(0.5,0.5,0.5,1.0);
    vec4 curColor = texture2D(CC_Texture0,v_texCoord);
    vec4 upLeftColor = texture2D(CC_Texture0,upLeftUV);
    //相减得到颜色的差
    vec4 delColor = curColor - upLeftColor;
    float h = 0.3*delColor.x + 0.59*delColor.y + 0.11*delColor.z;
    vec4 _outColor = bkColor + vec4(h,h,h,0.0);
    gl_FragColor = _outColor;
}