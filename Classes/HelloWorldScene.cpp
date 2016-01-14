#include "HelloWorldScene.h"

USING_NS_CC;

Scene* HelloWorld::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = HelloWorld::create();

    // add layer as a child to scene
    scene->addChild(layer);

    // return the scene
    return scene;
}

// on "init" you need to initialize your instance
bool HelloWorld::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    /////////////////////////////
    // 2. add a menu item with "X" image, which is clicked to quit the program
    //    you may modify it.

    // add a "close" icon to exit the progress. it's an autorelease object
    auto closeItem = MenuItemImage::create(
                                           "CloseNormal.png",
                                           "CloseSelected.png",
                                           CC_CALLBACK_1(HelloWorld::menuCloseCallback, this));
    
	closeItem->setPosition(Vec2(origin.x + visibleSize.width - closeItem->getContentSize().width/2 ,
                                origin.y + closeItem->getContentSize().height/2));

    // create menu, it's an autorelease object
    auto menu = Menu::create(closeItem, NULL);
    menu->setPosition(Vec2::ZERO);
    this->addChild(menu, 1);

    /////////////////////////////
    // 3. add your codes below...

    // add a label shows "Hello World"
    // create and initialize a label
    
    auto label = Label::createWithTTF("Hello World", "fonts/Marker Felt.ttf", 24);
    
    // position the label on the center of the screen
    label->setPosition(Vec2(origin.x + visibleSize.width/2,
                            origin.y + visibleSize.height - label->getContentSize().height));

    // add the label as a child to this layer
    this->addChild(label, 1);

    // add "HelloWorld" splash screen"
    m_pSprite = Sprite::create("HelloWorld.png");


    // position the sprite on the center of the screen
    m_pSprite->setPosition(Vec2(visibleSize.width/2 + origin.x, visibleSize.height/2 + origin.y));
    // add the sprite as a child to this layer

    this->addChild(m_pSprite, 0);

    
    m_pState = GLProgramState::create(GLProgram::createWithFilenames("Lesson13.vert", "Lesson13.frag"));
    
    Size imgSize = m_pSprite->getContentSize();
    m_pState->applyUniforms();
    m_pSprite->setGLProgramState(m_pState);
    m_dt = 0;
    
    for (int i = 0; i < 2; ++i) {
        m_lightRange[i] = 50;
    }
    
    m_lightPos[0] = Vec2(imgSize.width*0.25,imgSize.height*0.5);
    m_lightPos[1] = Vec2(imgSize.width*0.65,imgSize.height*0.5);
    m_lightColor[0] = Vec4(1.0, 0.0, 0.0, 1.0);
    m_lightColor[1] = Vec4(0.0, 1.0, 1.0, 1.0);
    
    m_pState->setUniformFloatv("u_lightRange", 2, m_lightRange);
    m_pState->setUniformVec4v("u_lightColor", 2, m_lightColor);
    
    schedule(schedule_selector(HelloWorld::updateMSK));

    return true;
}

void HelloWorld::updateMSK(float dt)
{
    Size imgSize = m_pSprite->getContentSize();
    m_dt += dt;
    m_lightPos[0] = Vec2(imgSize.width*0.65,imgSize.height*0.5) + Vec2(sinf(m_dt)*imgSize.height*0.25,cosf(m_dt)*imgSize.height*0.25);
    m_lightPos[1] = Vec2(imgSize.width*0.85,imgSize.height*0.5) + Vec2(sinf(m_dt)*imgSize.height*0.25,cosf(m_dt)*imgSize.height*0.25);
    m_pState->setUniformVec2v("u_lightPos", 2, m_lightPos);
}

void HelloWorld::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}
