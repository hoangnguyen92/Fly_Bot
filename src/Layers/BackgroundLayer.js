/**
 * Created by hoangnguyen on 10/22/14.
 */

var BackgroundLayer = cc.Layer.extend({
    map00: null,
    map01: null,
    mapWidth: 0,
    mapIndex: 0,
    spriteBG01:null,
    spriteBG02:null,
    winSize:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {

        this.winSize = cc.director.getWinSize();

        this.spriteBG01 = new cc.Sprite(res.bg_jpg);
        this.spriteBG01.attr({
            anchorX:0,
            anchorY:0,
            x: 0
        });
        this.spriteBG02 = new cc.Sprite(res.bg_jpg);

        this.mapWidth = this.spriteBG01.getContentSize().width;
        console.log("mapWidth "+this.mapWidth);
        this.spriteBG02.attr({
            anchorX:0,
            anchorY:0,
            x: this.mapWidth
        });

        this.addChild(this.spriteBG01);
        this.addChild(this.spriteBG02);

        this.scheduleUpdate();
    },

    checkAndReload: function (eyeX) {

        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapIndex == newMapIndex) {
            return false;
        }
        if(newMapIndex%2 == 0){
            this.spriteBG02.setPositionX(this.mapWidth * (newMapIndex + 1));
        }else{
            this.spriteBG01.setPositionX(this.mapWidth * (newMapIndex + 1));
        }



        return true;
    },
    update: function (dt) {
        var playerLayer = this.getParent().getChildByTag(TagOfLayer.Player);
        var eyeX = playerLayer.getEyeX();
        this.checkAndReload(eyeX);
    }

});
