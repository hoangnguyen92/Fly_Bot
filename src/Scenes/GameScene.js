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
    },
    // init space of chipmunk
    initPhysics:function() {
    	var b2Vec2 = Box2D.Common.Math.b2Vec2,
    		b2BodyDef = Box2D.Dynamics.b2BodyDef,
    		b2Body = Box2D.Dynamics.b2Body,
    		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    		b2Wold = Box2D.Dynamics.b2World,
    		b2PolygonShap = Box2D.Collision.Shapes.b2PolygonShape;
    	
    	this.world= new b2World(new b2Vec2(0,-10), true);
    	this.world.SetContinuousPhysics(true);
    	
    	
    },
    update:function (dt) {

    	var playerLayer = this.gameLayer.getChildByTag(TagOfLayer.Player);
        var eyeX = playerLayer.getEyeX();

        this.gameLayer.setPosition(cc.p(-eyeX,0));
    },
    onEnter: function(){
        this._super();
        this.initPhysics();
        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new PlayerLayer(), 0, TagOfLayer.Player);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();
    }
});
