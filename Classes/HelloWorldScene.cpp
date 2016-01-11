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
//    sprite->setColor(Color3B(0, 0, 255));
    this->addChild(m_pSprite, 0);
    
    Texture2D::TexParams texParam;
    texParam.magFilter = GL_NEAREST;
    texParam.minFilter = GL_NEAREST;
    texParam.wrapS = GL_REPEAT;
    texParam.wrapT = GL_REPEAT;
    
    Texture2D *pNewTexture = Director::getInstance()->getTextureCache()->addImage("CloseNormal.png");
//    pNewTexture->setTexParameters(texParam);
    
    m_pSprite->getTexture()->setTexParameters(texParam);
    
    m_pState = GLProgramState::create(GLProgram::createWithFilenames("Lesson6.vert", "Lesson6.frag"));

    m_pState->applyUniforms();
    m_pState->setUniformVec4("u_color", Vec4(1, 1, 1, 1));
    m_pState->setUniformTexture("u_texture", pNewTexture);

    m_pSprite->setGLProgramState(m_pState);
    schedule(schedule_selector(HelloWorld::updateTexUVAi));
    
    m_uTexUV.x = m_uTexUV.y = 0;
    return true;
}


void HelloWorld::updateTexUVAi(float dt)
{
    m_uTexUV.x += dt;
    m_pState->setUniformVec2("u_texUV", m_uTexUV);
}

void HelloWorld::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}
