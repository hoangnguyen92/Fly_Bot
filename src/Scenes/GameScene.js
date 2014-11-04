/**
 * Created by hoangnguyen on 10/23/14.
 */

var GameScene = cc.Scene.extend({
    space: null,
    gameLayer: null,
    world: null,
    ctor: function() {
        this._super();
        this.init();
        this.initPhysics();
        
        var that= this;
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
            var sprite= that.gameLayer.getChildByTag(TagOfLayer.Player).sprite;
            sprite.getBody().sleep();
        });
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(){
            cc.log("asdf");
            that.space.activateBody(that.gameLayer.getChildByTag(TagOfLayer.Player).sprite.getBody());
        });
    },
    // init space of chipmunk
    initPhysics: function() {
        var winSize = cc.director.getWinSize();
        this.space = new cp.Space();
        this.space.sleepTimeThreshold= 0.2;
        this.space.gravity = cp.v(0, -110);
        var wallBottom = new cp.SegmentShape(this.space.staticBody, cp.v(0, 0), cp.v(4294967295, 0), 0);
        var wallTop = new cp.SegmentShape(this.space.staticBody, cp.v(0, winSize.height), cp.v(4294967295, winSize.height), 0);

        this.space.addStaticShape(wallBottom);
        this.space.addStaticShape(wallTop);
        //    	var test = "";
        //    	for ( var i in this.space) {
        //    		test += JSON.stringify(this.space.i);
        //		}
        console.log(winSize.height);
    },
    update: function(dt) {
        
        this._super(dt);
        // if (this.gameShown_)
        // {
            // var timeWindow = 1 / 60; //replace by your configured FPS rate if it's not 60
            // var steps = Math.floor(dt / timeWindow);
            // var i = 0;
            // for (; i < steps; i++)
            //     this.space.step(timeWindow);
                
            // this.gameShown_= false;
            // var remainingDt= dt - steps * timeWindow;
                
            // if (remainingDt)
            //     this.space.step(remainingDt);
        // }
        // else
            this.space.step(dt);
        var playerLayer = this.gameLayer.getChildByTag(TagOfLayer.Player);
        var eyeX = playerLayer.getEyeX();

        this.gameLayer.setPosition(cc.p(-eyeX, 0));
    },
    onEnter: function() {
        this._super();
        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new PlayerLayer(this.space), 0, TagOfLayer.Player);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();
    }
});
