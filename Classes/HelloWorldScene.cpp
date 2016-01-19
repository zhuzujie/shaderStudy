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
    
    auto s = Director::getInstance()->getWinSize();
    
    Camera *_camera = Camera::createPerspective(60, (GLfloat)s.width/s.height, 1, 1000);
    _camera->setPosition3D(Vec3(0,100,400));
    _camera->lookAt(Vec3(0, 0, 0));
    _camera->setCameraFlag(CameraFlag::USER1);
    this->addChild(_camera);
    

    // add "HelloWorld" splash screen"
    m_pSprite = Sprite3D::create("qiu.c3b");
    m_pSprite->setPosition3D(Vec3(0, 0, 0));
    m_pSprite->setRotation3D(Vec3(0, 0, 0));
//    m_pSprite->setScale(0.5);
    m_pSprite->setCameraMask(2);
//    m_pSprite->setLightMask(0);
//    this->addChild(m_pSprite);
    
//    Texture2D *newTexture = Director::getInstance()->getTextureCache()->addImage("HelloWorld.png");
    
    m_pState = GLProgramState::create(GLProgram::createWithFilenames("3DLesson13.vert", "3DLesson13.frag"));

    
    m_pState->setUniformVec4("u_fogColor", Vec4(0.5, 0.0, 0.0, 1.0));
    m_pState->setUniformFloat("u_fogStar",100.0);
    m_pState->setUniformFloat("u_fogEnd", 500.0);
    m_pState->setUniformInt("u_fogEquation", 0);
    m_pState->applyUniforms();

//    m_pSprite->setGLProgramState(m_pState);
    m_dt = 0;
    
    this->createTree();
//    schedule(schedule_selector(HelloWorld::updateMSK));
    return true;
}


void HelloWorld::createTree()
{
    for (int i = 0; i < 60; i++) {
        auto spriteTree = Sprite3D::create("tree.c3t");
        spriteTree->setPosition3D(10*Vec3(rand_0_1()*100-50, 0, rand_0_1()*120-100));
        spriteTree->setRotation3D(Vec3(-90, 0, 0));
        spriteTree->setScale(rand_0_1()*0.05+0.05);
        spriteTree->setCameraMask(2);
        this->addChild(spriteTree);
        
        //树干
        m_pState->setUniformFloat("u_fogDensity",5);
        spriteTree->setGLProgramState(m_pState);
    }
}

void HelloWorld::updateMSK(float dt)
{
    m_dt += dt*10;
    m_pSprite->setRotation3D(Vec3(0, m_dt, 0));
    Mat4 tmp4 = m_pSprite->getNodeToWorldTransform();
    m_pState->setUniformMat4("u_mworldPos", tmp4);
}

void HelloWorld::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}
