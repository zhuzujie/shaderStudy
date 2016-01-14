#ifdef GL_ES
varying mediump vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform vec2 u_texSize;

void main()
{
    float dx = 3.0/float(u_texSize.x);
    float dy = 3.0/float(u_texSize.y);
    
    vec4 color = texture2D(CC_Texture0,v_texCoord.xy);
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx,0.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*2.0,0.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*3.0,0.0));
    
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(0.0,dy));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx,dy));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*2.0,dy));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*3.0,dy));
    
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(0.0,dy*2.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx,dy*2.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*2.0,dy*2.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*3.0,dy*2.0));
    
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(0.0,dy*3.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx,dy*3.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*2.0,dy*3.0));
    color += texture2D(CC_Texture0,v_texCoord.xy + vec2(dx*3.0,dy*3.0));
    
    color /= 16.0;
    
    gl_FragColor = color;
}