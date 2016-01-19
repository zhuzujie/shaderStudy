#ifdef GL_ES
varying lowp vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform sampler2D u_mtexture;

void main()
{
    vec4 _inColor = texture2D(u_mtexture,v_texCoord);
    if (_inColor.x > 3.0/255.0) {
        //取出的颜色是255的百分比
         gl_FragColor = _inColor*texture2D(CC_Texture0,v_texCoord);
        
    }
    else
    {
        gl_FragColor = texture2D(CC_Texture0,v_texCoord);
    }
}