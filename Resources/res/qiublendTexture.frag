#ifdef GL_ES
varying mediump vec2 v_texture_coord;
#else
varying vec2 v_texture_coord;
#endif

uniform vec4 u_color1;
uniform sampler2D caustics; 
uniform vec4 blendTextureColor;

void main(void)
{
    vec2 texCoord = v_texture_coord;
    gl_FragColor  = u_color1*texture2D(CC_Texture0, texCoord) + texture2D(caustics,texCoord) * blendTextureColor;
}