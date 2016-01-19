attribute vec4 a_position;
attribute vec2 a_texCoord;

#ifdef GL_ES
varying mediump vec2 v_texCoord;
varying mediump float v_fogFactor;
#else
varying vec2 v_texCoord;
varying float v_fogFactor;
#endif

uniform float u_fogDensity;
uniform float u_fogStar;
uniform float u_fogEnd;
uniform int u_fogEquation;


void main()
{
    gl_Position = CC_MVPMatrix * a_position;
    v_texCoord = a_texCoord;
    
    float fogFragCoord = abs(gl_Position.z); //当前转换后屏幕上的深度
    
    if (u_fogEquation == 0) {
        v_fogFactor = (u_fogEnd-fogFragCoord)/(u_fogEnd-u_fogStar);
    }else if (u_fogEquation == 1)
    {
        v_fogFactor = exp(-u_fogDensity*fogFragCoord);
    }else if (u_fogEquation == 2)
    {
        v_fogFactor = exp(-pow(u_fogDensity*fogFragCoord,2.0));
    }
    
    v_fogFactor = clamp(v_fogFactor,0.0,1.0);
}