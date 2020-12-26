// ==UserScript==
// @name         Extreme Potato Counter Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.neopets.com/games/game.phtml?game_id=226*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var lastClick = 0;
    var count = 0;
    var lvl = 1;
    var autoAdvance = true;

    var refTable = {
        1   : { "min": 6,   "max":11},
        2   : { "min": 9,   "max":15},
        3   : { "min": 12,  "max":20},
        4   : { "min": 15,  "max":25},
        5   : { "min": 18,  "max":30},
        6   : { "min": 21,  "max":35},
        7   : { "min": 23,  "max":40},
        8   : { "min": 27,  "max":45},
        9   : { "min": 30,  "max":50},
        10  : { "min": 33,  "max":55},
        11  : { "min": 36,  "max":60},
        12  : { "min": 39,  "max":65},
        13  : { "min": 42,  "max":70},
        14  : { "min": 45,  "max":75},
        15  : { "min": 48,  "max":80},
        16  : { "min": 51,  "max":85},
        17  : { "min": 54,  "max":90},
        18  : { "min": 57,  "max":95},
        19  : { "min": 60,  "max":100},
        20  : { "min": 63,  "max":105}
    }

    $('#gr-hiscore-userinfo').after(`<div style="margin-top: 10px">
<input id="clickCounter" type="button" value="Count" style="width: 100px; height: 100px;font-size:2em" />
<input type="text" id="clickCount" style="width: 100px; height: 100px; text-align: center; font-size: 2.5em; " />
</div>
<div style="margin-top: 10px;font-size:2em">
<div style="display:inline-block; padding-right: 5px;">Lvl: <span id="lvlCount" type="text">1 </span></div><div style="display: inline-block"><input id="lvlCounter" type="button" value="Next level" style="font-size: 1em" /> <br><input id="resetLvl" type="button" value="I lost" style="font-size: 1em" /></div>
</div>
<div id="potatoRef" style="font-size: 1.5em" >
Min potato: 6 <br>
Max potato: 11
</div>
`);

    function resetCount() {
        count = 0;
        $('#clickCount').val(count);
        $('#lvlCount').html(lvl);

        if (refTable[lvl]) {
            $('#potatoRef').html('Min potato: ' + refTable[lvl].min + ' <br>Max potato: ' + refTable[lvl].max);
        } else {
            $('#potatoRef').html('Min potato: ? <br>Max potato: ?');
        }
    }

    $('#clickCounter').on('click', function() {
        if (autoAdvance) {
            var clickTime = new Date().getTime();
            if (lastClick > 0 && clickTime - lastClick > 2000) {
                console.log(clickTime);
                ++lvl;
                resetCount();
            }
            lastClick = clickTime;
        }
        ++count;
        $('#clickCount').val(count);
        //console.log('hi');
    })

    $('#lvlCounter').on('click', function() {
        ++lvl;
        lastClick = 0;
        resetCount();
    })

    $('#resetLvl').on('click', function() {
        lvl = 1;
        lastClick = 0;
        resetCount()
    })
})();