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
    void updateTexUVAi(float dt);
private:
    cocos2d::GLProgramState* m_pState;
    cocos2d::Vec2 m_uTexUV;
    cocos2d::Sprite * m_pSprite;
};

#endif // __HELLOWORLD_SCENE_H__
