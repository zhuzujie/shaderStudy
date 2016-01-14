#ifdef GL_ES
varying mediump vec2 v_texCoord;
#else
varying vec2 v_texCoord;
#endif

uniform vec2 u_texSize;
uniform vec2 u_mskSize;

void main()
{
    
    //把精度缺失的计算放在外部 若不是动态 则shader内部计算会少一次* /
    
    //得到当前纹理坐标相对图像大小整数值；
    //v_texCoord只是单位坐标；
    //缩小会缺失的精度
//    vec2 intXY = vec2(v_texCoord.x*u_texSize.x,v_texCoord.y*u_texSize.y);
    //根据马赛克大小进行取整
    vec2 mskXY = vec2(u_mskSize.x*float(int(v_texCoord.x/u_mskSize.x)),u_mskSize.y*float(int(v_texCoord.y/u_mskSize.y)));
    //把整数坐标 转化为纹理坐标
//    vec2 UVMSK = vec2(mskXY.x/u_texSize.x,mskXY.y/u_texSize.x);
    
    gl_FragColor = texture2D(CC_Texture0,mskXY);
}