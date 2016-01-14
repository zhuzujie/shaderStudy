#ifdef GL_ES
varying mediump vec2 v_texCoord;
varying mediump vec4 v_color;
varying mediump vec2 v_pos;
#else
varying vec2 v_texCoord;
varying vec4 v_color;
varying vec2 v_pos;
#endif

uniform vec2 u_lightPos[2];
uniform vec4 u_lightColor[2];
uniform float u_lightRange[2];

vec4 GetLightColor(vec2 v1, vec2 v2, float fRange)
{
    //计算权重 包括透明度
    vec2 v = v1 - v2;
    float d = length(v);
    float l = d / fRange;
    l = 1.0 - clamp(l,0.0,1.0);
    return vec4(l,l,l,l);
}

void main()
{
    //2束光 就算2个颜色*各自权重后的叠加色
    vec4 lightColor = u_lightColor[0] * GetLightColor(v_pos,u_lightPos[0],u_lightRange[0]) + u_lightColor[1] * GetLightColor(v_pos,u_lightPos[1],u_lightRange[1]);
    
    //防止爆炸
    lightColor = clamp(lightColor,vec4(0.0,0.0,0.0,0.0),vec4(1.0,1.0,1.0,1.0));
    
    //颜色叠加
    gl_FragColor = texture2D(CC_Texture0,v_texCoord)*v_color*lightColor;
}