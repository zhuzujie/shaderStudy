#ifdef GL_ES
varying lowp vec2 v_texCoord;
varying lowp vec3 v_normal;
#else
varying vec2 v_texCoord;
varying vec3 v_normal;
#endif

uniform vec3 u_lightDir;

void main()
{
    vec4 texColor = texture2D(CC_Texture0,v_texCoord);
    float fDiff = clamp(dot(v_normal,-u_lightDir),0.2,1.0);
    
    gl_FragColor = fDiff*texColor;
    gl_FragColor.w = texColor.w;
}