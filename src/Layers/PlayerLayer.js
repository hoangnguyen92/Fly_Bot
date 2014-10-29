/**
 * Created by hoangnguyen on 10/23/14.
 */

var PlayerLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    space: null,
    _debugNode: null,
    ctor: function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.ghost_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.ghost_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];

        // 2.create spriteframe array
        var animFrames = [];
        for (var i = 1; i < 11; i++) {
            var str = ""+i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        // 3.create a animation with the spriteframe array along with a period
		// time
        var animation = new cc.Animation(animFrames, 0.1);

        // 4.wrap the animate action with a repeat forever action
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        
        this.sprite = new cc.Sprite("#1.png");
        
        this.sprite.runAction(this.runningAction);
        
        this.sprite.setPosition(g_runnerStartX, g_groundH);
        this.spriteSheet.addChild(this.sprite,1);

    },
    getEyeX: function () {
        return this.sprite.getPositionX() - g_runnerStartX;
    }
});