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
    void createTree();
    
    void onTouchesBegan(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *unused_event);
    void onTouchMoved(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *unused_event);
    void onTouchEnded(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *unused_event);
    
    
private:
    cocos2d::GLProgramState* m_pState;

    cocos2d::Sprite3D * m_pSprite;
    
    //点光的位置
    cocos2d::Vec3 posLightPos[3];
    //点光的强度
    float posLightRange[3];
    //点光的色彩
    cocos2d::Vec3 posLightColor[3];
    
    cocos2d::Camera *_camera;
    
    float m_dt;
};

#endif // __HELLOWORLD_SCENE_H__
