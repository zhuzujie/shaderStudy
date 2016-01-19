#ifdef GL_ES
varying mediump vec2 v_texCoord;
varying mediump float v_fogFactor;
#else
varying vec2 v_texCoord;
varying float v_fogFactor;
#endif

uniform vec4 u_fogColor;

void main()
{
    vec4 texColor = texture2D(CC_Texture0,v_texCoord);
    //颜色叠加 返回线性混合的x和y，如：x⋅(1−a)+y⋅a texColor和u_fogColor位置互换 效果不同
    gl_FragColor = mix(u_fogColor,texColor,v_fogFactor);
    gl_FragColor.a = texColor.a;
}