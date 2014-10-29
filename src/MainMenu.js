/**
 * Created by hoangnguyen on 10/22/14.
 */

var MainMenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
    	this._super();
    	
        var layer = this;
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width/2 , winSize.height/2);

        var newGameNormal = new cc.Sprite(res.playBtn_png, cc.rect(0, 0, 290, 95));

        var newGameItem = new cc.MenuItemImage(
        		res.playBtn_png,
        		res.playBtn_png,
        		function () {
        			layer.newGame();
        		}, this);
        newGameItem.attr({
        	x: 0,
        	y: 0,
        	anchorX: 0.5,
        	anchorY: 0.5
        });

        var menu = new cc.Menu(newGameItem);
        menu.setPosition(centerPos);
        this.addChild(menu, 1);
        
        
        var background = new cc.Sprite(res.bg_jpg);
        background.anchorX = 0.5;
        background.anchorY = 0.5;
        background.setPosition(centerPos);
        this.addChild(background, 0);

        return true;
    },
    newGame: function() {

        cc.LoaderScene.preload(g_gamemenu, function() {

            cc.director.runScene(new GameScene());
            
        }, this);

    }

});


var MainMenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});