
#ifdef GL_ES
varying lowp vec2 v_texCoord;
varying lowp vec3 v_mworldPos;
#else
varying vec2 v_texCoord;
varying vec3 v_mworldPos;
#endif

uniform vec3 u_posLightPos[3];
uniform float u_posLightRange[3];
uniform vec3 u_posLightColor[3];

/*
 1、m_pState->setUniformVec3v("u_posLightPos", 3, posLightPos);
 在这种类型的传参函数中 其实只传了这个数组的头指针
 即传入shander的也是指针，而不是内存拷贝，所以要保证在shander运行的过程中，
 传入指针所指向的内存块中的数据是存在的；
 2、若在球体转动时，希望有光源位置不变的效果，需要在转动的过程中不断的刷新相对世界坐标
 3、不在外部使用计时器，则可以在内部使用CC_Time进行取色偏移
 */
vec4 getLightColor(vec3 vPos)
{
    vec3 v_mcolor = vec3(0.0,0.0,0.0);
    vec3 tmpPos = u_posLightPos[0] - vPos;
    float fLerp = 1.0-clamp(length(tmpPos)/u_posLightRange[0],0.0,1.0);
    
   
    v_mcolor += u_posLightColor[0] * fLerp;
    
    tmpPos = u_posLightPos[1] - vPos;
    fLerp = 1.0 - clamp(length(tmpPos)/u_posLightRange[1],0.0,1.0);
    v_mcolor += u_posLightColor[1] * fLerp;
    
    tmpPos = u_posLightPos[2] - vPos;
    fLerp = 1.0 - clamp(length(tmpPos)/u_posLightRange[2],0.0,1.0);
    v_mcolor += u_posLightColor[2] * fLerp;
    
    return vec4(v_mcolor,1.0);
}

void main()
{
    vec4 tmpColor = texture2D(CC_Texture0,v_texCoord + vec2(CC_Time.x,1.0));
    gl_FragColor = tmpColor * getLightColor(v_mworldPos);
    gl_FragColor.a = tmpColor.a;
}