/**
 * here are where we declare all resources for this application
 * @type {{HelloWorld_png: string, CloseNormal_png: string, CloseSelected_png: string}}
 */
var res = {
    bg_jpg : "res/bg.jpg",
    playBtn_png : "res/playBtn.png",
    runner_png: "res/runner.png",
    runner_plist: "res/runner.plist",
    map_png: "res/map.png",
    map00_tmx: "res/map00.tmx",
    map01_tmx: "res/map01.tmx",
    ghost_png: "res/ghost.png",
    ghost_plist: "res/ghost.plist"
};

/**
 * here are resources for the main menu
 * @type {Array}
 */
var g_mainmenu = [
    res.bg_jpg,
    res.playBtn_png
];

/**
 * here are resources for the game
 * @type {Array}
 */
var g_gamemenu = [
    res.bg_jpg,
    res.runner_png,
    res.runner_plist,
    res.ghost_png,
    res.ghost_plist,
    res.map_png,
    res.map00_tmx,
    res.map01_tmx

];