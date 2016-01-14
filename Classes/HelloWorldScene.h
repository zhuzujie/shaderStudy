#ifndef __HELLOWORLD_SCENE_H__
#define __HELLOWORLD_SCENE_H__

#include "cocos2d.h"

class HelloWorld : public cocos2d::Layer
{
public:
    static cocos2d::Scene* createScene();

    virtual bool init();
    
    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
    
    // implement the "static create()" method manually
    CREATE_FUNC(HelloWorld);
    void updateMSK(float dt);
private:
    cocos2d::GLProgramState* m_pState;

    cocos2d::Sprite * m_pSprite;
    
    //点光的位置
    cocos2d::Vec2 m_lightPos[2];
    //点光的强度
    float m_lightRange[2];
    //点光的色彩
    cocos2d::Vec4 m_lightColor[2];
    float m_dt;
};

#endif // __HELLOWORLD_SCENE_H__
