/**
 * Created by hoangnguyen on 10/22/14.
 */

var MainMenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        var layer = this;
        winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width/2 , winSize.height/2);
        var background = new cc.Sprite(res.bg_jpg);
        background.anchorX = 0.5;
        background.anchorY = 0.5;
        background.setPosition(centerPos);
        this.addChild(background, 0, 1);

        var newGameNormal = new cc.Sprite(res.playBtn_png, cc.rect(0, 0, 290, 95));

        var newGame = new cc.MenuItemSprite(newGameNormal, null, null, function() {
            console.log("New Game Button pressed");
            layer.newGame();
        });

        var menu = new cc.Menu(newGame);
        menu.setPosition(centerPos);

        this.addChild(menu, 1, 2);
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