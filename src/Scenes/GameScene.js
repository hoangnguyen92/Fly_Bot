/**
 * Created by hoangnguyen on 10/23/14.
 */

var GameScene = cc.Scene.extend({
    space:null,
    gameLayer: null,
    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    // init space of chipmunk
    initPhysics:function() {
    	var winSize = cc.director.getWinSize();
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, -350);

        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundH),// start point
            cp.v(4294967295, g_groundH),// MAX INT:4294967295
            0);// thickness of wall
        
//        var wallUp = new cp.SegmentShape(this.space.staticBody,cp.v(0, winSize-50),cp.v(4294967295,winSize-50 ),1);

//        this.space.addStaticShape(wallUp);
        this.space.addStaticShape(wallBottom);
    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        var playerLayer = this.gameLayer.getChildByTag(TagOfLayer.Player);
        var eyeX = playerLayer.getEyeX();

        this.gameLayer.setPosition(cc.p(-eyeX,0));
    },
    onEnter: function(){
        this._super();
        this.initPhysics();
        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer.addChild(new PlayerLayer(this.space), 0, TagOfLayer.Player);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();
    }
});
