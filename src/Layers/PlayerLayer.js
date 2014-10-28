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
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];

        //2.create spriteframe array
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "runner"+i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        //3.create a animation with the spriteframe array along with a period time
        var animation = new cc.Animation(animFrames, 0.1);

        //4.wrap the animate action with a repeat forever action
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

//        this.sprite = new cc.Sprite("#runner0.png");



//        //1. create PhysicsSprite with a sprite frame name
        this.sprite = new cc.PhysicsSprite("#runner0.png");

        var contentSize = this.sprite.getContentSize();
//        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
//        //3. set the position of the runner
        this.body.p = cc.p(g_runnerStartX, g_groundH + contentSize.height / 4);
//        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
//        //5. add the created body to space
        this.space.addBody(this.body);
//        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
//        //7. add shape to space
        this.space.addShape(this.shape);
//        //8. set body to the physic sprite
        this.sprite.setBody(this.body);
        
        

        this.sprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.sprite,1);
        
        

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(true);
        this.addChild(this._debugNode,10);
    },
    getEyeX: function () {
    	console.log("x: "+ this.sprite.getPositionX()+" y: "+ this.sprite.getPositionY())
        return this.sprite.getPositionX() - g_runnerStartX;
    }
});