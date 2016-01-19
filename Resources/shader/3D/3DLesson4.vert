attribute vec4 a_position;
attribute vec2 a_texCoord;

#ifdef GL_ES
varying lowp vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform float u_swing;

//顶点摇动
vec3 swingVertex(float currTime,float vSwingSpeed)
{
    float timeOffset = currTime*vSwingSpeed;
    vec3 posOffset = vec3(cos(timeOffset)*u_swing,0,sin(timeOffset)*u_swing);
    return posOffset;
     
}

void main()
{
    vec3 posOffset = swingVertex(CC_Time.y,10.0*a_position.y*0.001);
    vec4 newPosition = vec4(a_position.x + posOffset.x,a_position.y,a_position.z + posOffset.z,a_position.w);
    
    gl_Position = CC_MVPMatrix * newPosition;
    v_texCoord = a_texCoord;
    
}