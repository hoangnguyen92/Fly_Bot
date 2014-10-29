/**
 * Created by hoangnguyen on 10/23/14.
 */

var GameScene = cc.Scene.extend({
    space:null,
    gameLayer: null,
    world: null,
    ctor:function () {
        this._super();
        this.init();
        this.initPhysics();
    },
    // init space of chipmunk
    initPhysics:function() {
    	var winSize = cc.director.getWinSize();
    	this.space = new cp.Space();
    	this.space.gravity = cp.v(0, -110);
    	var wallBottom = new cp.SegmentShape(this.space.staticBody, cp.v(0, 0),cp.v(4294967295, 0),0);
    	var wallTop = new cp.SegmentShape(this.space.staticBody, cp.v(0, winSize.height),cp.v(4294967295, winSize.height),0);
    	
    	this.space.addStaticShape(wallBottom);
    	this.space.addStaticShape(wallTop);
//    	var test = "";
//    	for ( var i in this.space) {
//    		test += JSON.stringify(this.space.i);
//		}
    	console.log(winSize.height);
    },
    update:function (dt) {
    	this.space.step(dt);
    	var playerLayer = this.gameLayer.getChildByTag(TagOfLayer.Player);
        var eyeX = playerLayer.getEyeX();

        this.gameLayer.setPosition(cc.p(-eyeX,0));
    },
    onEnter: function(){
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
