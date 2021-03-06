/*************************BEGIN****************************************************
Created by HAO on 2017/04/12
BRIEF	: 
VERSION	:
HISTORY	:
***************************END****************************************************/
#ifndef __BUILDINGSPRITE_H__
#define __BUILDINGSPRITE_H__

#include "cocos2d.h"
using namespace cocos2d;
using namespace std;

class BuildingSprite : public Sprite {

public:
	virtual bool init(int index, Vec2 ve);
	static BuildingSprite* create(int index, Vec2 ve);

public:
	void addTouch();
	bool onToucheBegan(Touch* touch, Event* event);
	void onToucheMoved(Touch* touch, Event* event);
	void onToucheEnded(Touch* touch, Event* event);

public:
	void loadData(int index);
	void loadUI();
	void moveBuilding(Vec2 delta);	//移动建筑
	void selectedAction();			// 被选中时的动画效果
	void unselectedAction();		// 去掉选中动画  
	void setTiledPos();				// 设置瓦片坐标

public:
	void upgrade();                 // 升级操作
	void showUpgradePro();			// 加入升级进度条
	void upgradeFinished();			// 升级完成

public:
    // 基础属性
    int _index;                 // 内存中的数组下标
    int _id;                    // 编号
    int _BuildingID;            // 建筑编号ID
    int _buildState;            // 建造状态。1已建成，2正在建造。
    int _lastBuildTime;         // 最后建筑时间。
    int _lastGoldHarvest;       // 金币收获时间。金矿场金币产量
    int _lastWoodHarvest;       // 木材收获时间。木材厂木材产量。
	
    int _type;                  // 类型
    int _level;                 // 等级
    int _healthPoint;           // 生命值
    string _name;               // 建筑名称
    string _description;        // 描述
    
    int _goldRequire;           // 升级所需金币
    int _woodRequire;           // 升级所需木材
    int _timeRequire;           // 升级所需时间
    int _playerLevelRequire;    // 所需玩家等级
    int _baseLevelRequire;      // 升级所需司令部等级
    int _expReward;             // 升级获得玩家经验
    
    // 生产属性
    int _goldProduct;           // 每小时金币产量
    int _woodProduct;           // 每小时木材产量
    
    // 资源属性
    int _goldCapacity;          // 金币容量
    int _woodCapacity;          // 木材容量
    
    // 攻击属性
    bool _isBroken;             // 是否被摧毁
    bool _canAttack;            // 是否为攻击设施
    int _damage;                // 攻击力
    int _attackSpeed;           // 攻击速度
    int _shootRange;            // 射程范围
    int _damageRange;           // 攻击受伤范围
    Node* _attackTarget;        // 攻击目标
    
    // 触摸属性
    bool _canTouched;           // 是否可以移动
    bool _isTouched;            // 是否被触摸
    bool _isSelected;           // 是否被选中
    bool _isShowOpt;            // 是否显示了opt操作
    float _deltaPos;            // 移动偏移
    EventListenerTouchOneByOne* _listener;
    
    // 图片
    Size _size;			// 尺寸
	Vec2 _pos;          // 坐标

    Sprite* _normal;    // 正常图片
    Sprite* _broken;    // 毁坏图片
    Sprite* _tip;       // 箭头

	TextureCache*_cache;	//纹理缓存

    
    //HarvestBubble* bubble;

};


#endif // !__BUILDINGSPRITE_H__
