attribute vec4 a_position;
attribute vec2 a_texCoord;

#ifdef GL_ES
    varying mediump vec2 v_texCoord;
#else
    varying vec2 v_texCoord;
#endif


void main()
{
    vec4 tPosition = a_position;
    tPosition.z += sin(CC_Time.w + (tPosition.x + tPosition.y))*sin(CC_Time.w + (tPosition.x + tPosition.y));
    gl_Position = CC_MVPMatrix * tPosition;
    v_texCoord = a_texCoord;
}