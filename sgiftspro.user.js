// ==UserScript==
// @id              sgifts_pro
// @name            SteamGifts PRO
// @author          SnZ
// @version         0.1
// @namespace       https://github.com/EsEnZeT/sgiftspro
// @author          SnZ <snz@spinacz.org> ~ http://spinacz.org
// @description     Adds extra features ;)
// @homepage        https://github.com/EsEnZeT/sgiftspro
// @icon            https://raw.github.com/EsEnZeT/sgiftspro/master/_sgi.png
// @updateURL       https://raw.github.com/EsEnZeT/sgiftspro/master/sgiftspro.user.js
// @downloadURL     https://raw.github.com/EsEnZeT/sgiftspro/master/sgiftspro.user.js
// @include         http://www.steamgifts.com/
// @include         http://www.steamgifts.com/#
// @include         http://www.steamgifts.com/account
// @include         http://www.steamgifts.com/new/*
// @include         http://www.steamgifts.com/*/page*
// @include         http://www.steamgifts.com/coming-soon*
// @include         http://www.steamgifts.com/closed*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var mpoints = parseInt($('a.arrow:contains("Account")').text().match(/Account \(([0-9]+)P\)/)[1]);
var gpoints = 'div.left > div.title > span:not([class])';
$('a.logo').css('background-image', 'url("https://raw.github.com/EsEnZeT/sgiftspro/master/_sgl.png")');


    $('div[class="post"]:has(> div.left > div.description > div[class="contributor_only"])').hide();
    $('div[class="post"]:not([style])').filter(function() { return $(this).find(gpoints); }).each(function() {
        var p = parseInt($(this).find(gpoints).text().match(/\(([0-9]+)P\)/)[1]);
        if (p <= mpoints) {
            $(this).find('div.right').attr('style', 'background-color:#FF7300;border:1px solid #000;');
            $(this).find(gpoints).attr('style', 'color:#FF7300;');
        }
    });
