#ifdef GL_ES
varying mediump vec3 v_reflect;
#else
varying vec3 v_reflect;
#endif

uniform samplerCube u_cubeTex;

void main()
{
    //立方体贴图的采样函数
    gl_FragColor = textureCube(u_cubeTex,v_reflect);
}