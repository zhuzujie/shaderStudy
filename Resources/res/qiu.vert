attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texture_coord;
void main(void)
{
    gl_Position = CC_MVPMatrix * a_position;
    v_texture_coord = a_texCoord;
}
