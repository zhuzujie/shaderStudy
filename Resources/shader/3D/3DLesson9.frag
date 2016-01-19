#ifdef GL_ES
varying lowp vec2 v_texCoord;
varying lowp vec3 v_normal;
varying lowp vec3 v_worldPos;
#else
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_worldPos;
#endif

uniform vec3 u_lightDir;
uniform vec3 u_eyePos;

void main()
{
    //单位化
    vec3 ViewDir = normalize(u_eyePos - v_worldPos);
    //方向光的明暗面计算 本身就是单位化过的
    float fDiff = clamp(dot(v_normal,-u_lightDir),0.2,1.0);
    
    vec4 texColor = texture2D(CC_Texture0,v_texCoord);
    //单位化 返回反射向量
    vec3 Reflect = normalize(reflect(u_lightDir,v_normal));
    float Specular = pow(clamp(dot(Reflect,ViewDir),0.0,1.0),10.0);
    
    
    gl_FragColor = fDiff*texColor + vec4(1.0,1.0,1.0,1.0)*Specular;
    gl_FragColor.a = texColor.a;
}