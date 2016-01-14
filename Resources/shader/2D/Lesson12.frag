#ifdef GL_ES
    varying mediump vec2 v_texCoord;
#else
    varying vec2 v_texCoord;
#endif

uniform vec2 u_texSize;

//用来做滤波操作的函数
vec4 dip_filter(mat3 _filter, sampler2D _image, vec2 _xy, vec2 texSize)
{
    //纹理坐标采样的偏移.
    //一个以原点为中心的九宫格
    //不能使用 vec2[3][3]
    mat3 _filter_pos_delta_x = mat3(-1.0,0.0,1.0,
                                    0.0,0.0,1.0,
                                    1.0,0.0,1.0);
    mat3 _filter_pos_delta_y = mat3(-1.0,-1.0,-1.0,
                                    -1.0,0.0,0.0,
                                    -1.0,1.0,1.0);
    
    //最终的输出颜色
    vec4 final_color = vec4(0.0,0.0,0.0,0.0);
    //对图像做滤波处理
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            //计算采样点，得到当前像素附近的像素坐标
            //根据九宫格往四周偏移
            vec2 _xy_new = vec2(_xy.x + _filter_pos_delta_x[i][j], _xy.y + _filter_pos_delta_y[i][j]);
            //坐标转换
            vec2 _uv_new = vec2(_xy_new.x/texSize.x,_xy_new.y/texSize.y);
            //采样 *权重
            final_color += texture2D(_image,_uv_new)* _filter[i][j];
        }
    }
    
    return final_color;
}

void main()
{
    vec2 intXY = vec2(v_texCoord.x * u_texSize.x,v_texCoord.y*u_texSize.y);
    
    mat3 _pencil_fil = mat3(-0.5,-1.0,0.0,
                            -1.0,0.0,1.0,
                            -0.0,1.0,0.5);
    
    vec4 delColor = dip_filter(_pencil_fil,CC_Texture0,intXY,u_texSize);
    
    float deltaGray = 0.3*delColor.x + 0.59*delColor.y + 0.11*delColor.z;
    
    //因为有负的权重，有可能得到负值
    if (deltaGray < 0.0) {
        deltaGray = -1.0*deltaGray;
    }
    
    deltaGray = 1.0 - deltaGray;
    gl_FragColor = vec4(deltaGray,deltaGray,deltaGray,1.0);
}