/**
 * Created by HAO on 2017/3/23.
 * Brief   :
 * Version :
 */
var LoginLayer = cc.Layer.extend({

	_name   :   null,

	ctor : function () {
		this._super();

		Wsize = cc.director.getWinSize();
		//添加有色层
		// var colorlayer = new cc.LayerColor(cc.color(255, 255, 255));
		// colorlayer.setContentSize(Wsize.width, Wsize.height);
		// colorlayer.ignoreAnchor = false;
		// colorlayer.attr({
		// 	x   :   Wsize.width/2,
		// 	y   :   Wsize.height/2,
		// 	anchorX :   0.5,
		// 	anchorY :   0.5
		// });
		// this.addChild(colorlayer);

		var bg = new cc.Sprite(res.StartBackground_png1);
		bg.attr({
			x	:	Wsize.width/2,
			y	:	Wsize.height/2
		});
		this.addChild(bg, -1);

		this.addEditBoxFunc();

		return true;
	},

	addEditBoxFunc : function () {

		var bg   = new cc.Scale9Sprite(res.ScoreBg);
		this._name = new cc.EditBox(cc.size(300, 100), bg);
		this._name.setFontSize(40);
		this._name.setFontColor(cc.color(255, 255, 255));
		this._name.setMaxLength(15);
		this._name.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
		this._name.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
		this._name.setPlaceHolder(" 昵称");
		this._name.setPlaceholderFontSize(40);
		this._name.setPlaceholderFontColor(cc.color(255, 255, 255));
		this._name.setDelegate(this);

		this._name.attr({
			x   :   Wsize.width/2,
			y   :   Wsize.height/2 + 150
		});
		this.addChild(this._name);

		var done_item = new cc.MenuItemSprite(
			new cc.Sprite(res.btn_nor),
			new cc.Sprite(res.btn_pre),
			this.doneFunc,
			this
		);
		done_item.attr({
			x   :   Wsize.width/2,
			y   :   Wsize.height/2 - 50
		});

		var menu = new cc.Menu(done_item);
		menu.attr({
			x   :   0,
			y   :   0
		});
		this.addChild(menu);
	},

	editBoxEditingDidEnd : function (editBox) {
		cc.log("editBoxEditingDidEnd");
	},

	doneFunc : function () {
		cc.log("doneFunc");

		var name = this._name.getString();
		if (name != ""){
			cc.log("name = " + name);
			GC.CUR_USER = name;

			var no = cc.sys.localStorage.getItem("totalNumber");
			if (no==null){  //调处
				cc.sys.localStorage.setItem("totalNumber", 1);
			}
			else {
				var number= no*1 + 1;
				cc.sys.localStorage.setItem("totalNumber", number);
			}
			cc.log(cc.sys.localStorage.getItem("totalNumber"));

			cc.director.runScene(new MenuViewScene());
		}
		else {
			this._name.runAction(
				cc.sequence(
					cc.scaleTo(0.02, 1.2),
					cc.scaleTo(0.02, 0.8),
					cc.scaleTo(0.02, 1.0)
				)
			);
		}
	}

});

var LoginScene = cc.Scene.extend({

	//返回键
	isExitBol       :   false,  //退出标识
	exitLogo        :   null,   //退出图片

	onEnter:function () {
		this._super();

		var me = this;
		//Android返回键监听
		cc.eventManager.addListener({
			event : cc.EventListener.KEYBOARD,
			onKeyReleased : function (keyCode, event) {
				if (keyCode == cc.KEY.back) {
					cc.log("back.");
					me.prepareEndFunc();
				}
				else if (keyCode == cc.KEY.home) {
					cc.log("home.");
				}
			}
		}, this);

		var layer = new LoginLayer();
		this.addChild(layer);
	},

	prepareEndFunc : function () {
		cc.log("prepareEndFunc");

		if (!this.isExitBol) {
			this.isExitBol = true;  //准备退出
			//2秒内未按下键,则启动定时器取消掉刚才执行的任务
			this.exitLogo = new cc.Sprite(res.png_exit);
			this.exitLogo.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/4));
			this.addChild(this.exitLogo, 10000);

			var action = cc.sequence(cc.fadeOut(2), cc.callFunc(function () {
				this.isExitBol = false;
			}, this));
			this.exitLogo.runAction(action);
		}
		else {
			cc.director.end();
		}
	}

});