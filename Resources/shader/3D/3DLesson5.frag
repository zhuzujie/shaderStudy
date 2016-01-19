
#ifdef GL_ES
varying lowp vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform vec4 u_color;

void main()
{
    //CC_Time.x 是当前时间的1/10
    gl_FragColor = texture2D(CC_Texture0,v_texCoord + vec2(CC_Time.x,0));
}