
#ifdef GL_ES
varying lowp vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform sampler2D u_mtexture;

void main()
{
    gl_FragColor = texture2D(CC_Texture0,v_texCoord);
    float alphaColor = texture2D(u_mtexture,v_texCoord).r;
    //阿尔法测试 对透明度进行判断
    if (alphaColor < 0.5) {
        //丢弃颜色
        discard;
    }
    gl_FragColor.a = alphaColor;
}