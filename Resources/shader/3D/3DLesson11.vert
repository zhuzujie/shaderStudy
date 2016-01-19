attribute vec4 a_position;
attribute vec2 a_texCoord;

#ifdef GL_ES
varying lowp vec2 v_texCoord;
varying lowp vec3 v_mworldPos;
#else
varying vec2 v_texCoord;
varying vec3 v_mworldPos;
#endif

uniform mat4 u_mworldPos;

void main()
{
    gl_Position = CC_MVPMatrix * a_position;
    v_mworldPos = (u_mworldPos*a_position).xyz;
    v_texCoord = a_texCoord;
}