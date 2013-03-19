// ==UserScript==
// @id              sgifts_pro
// @name            SteamGifts PRO
// @author          SnZ
// @version         0.2
// @namespace       https://github.com/EsEnZeT/sgiftspro
// @author          SnZ <snz@spinacz.org> ~ http://spinacz.org
// @description     Adds extra features ;)
// @homepage        https://github.com/EsEnZeT/sgiftspro
// @icon            https://raw.github.com/EsEnZeT/sgiftspro/master/_sgi.png
// @updateURL       https://raw.github.com/EsEnZeT/sgiftspro/master/sgiftspro.user.js
// @downloadURL     https://raw.github.com/EsEnZeT/sgiftspro/master/sgiftspro.user.js
// @license         Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// @include         http://www.steamgifts.com/
// @include         http://www.steamgifts.com/#
// @include         http://www.steamgifts.com/account
// @include         http://www.steamgifts.com/new/*
// @include         http://www.steamgifts.com/*/page*
// @include         http://www.steamgifts.com/coming-soon*
// @include         http://www.steamgifts.com/closed*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var token = GM_getValue('token');
var mpoints = parseInt($('a.arrow:contains("Account")').text().match(/Account \(([0-9]+)P\)/)[1]);
var gpoints = 'div.left > div.title > span:not([class])';
$('a.logo').css('background-image', 'url("https://raw.github.com/EsEnZeT/sgiftspro/master/_sgl.png")');
$('div#navigation > ol > li:eq(2)').find('div.absolute-dropdown > ul').append('<li><a id="sget-token" href="#" title="Click if you have problem with fast entry button">Get Token</a></li>');

function tokenregen(){
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.steamgifts.com/account',
    onload: function(resp) {
        var token = $(resp.responseText).find('input[name="form_key"]').val();
        GM_setValue('token', token);
        alert('Token regenerated!');
    }
}); 
}

if (!token){
    alert('Something went wrong, or this is first run. \nI will acquire token now...');
    tokenregen();
} else {
    $('div[class="post"]:has(> div.left > div.description > div[class="contributor_only"])').hide();
    $('div[class="post fade"]').find('div.left > div.title').append('<form id="fout" method="post" action="' + $('div[class="post fade"]').find('div.left > div.title > a').attr('href') + '" style="display:inline;"><input type="hidden" value="' + token + '" name="form_key"><input type="hidden" value="0" name="enter_giveaway"><input id="fout" type="submit" value="OUT" style="width:60px;height:25px;font-size:10px;"></form>');
    $('div[class="post"]:not([style])').filter(function() { return $(this).find(gpoints); }).each(function() {
        var p = parseInt($(this).find(gpoints).text().match(/\(([0-9]+)P\)/)[1]);
        if (p <= mpoints) {
            $(this).find('div.right').attr('style', 'background-color:#FF7300;border:1px solid #000;');
            $(this).find(gpoints).attr('style', 'color:#FF7300;');
            $(this).find('div.left > div.title').append('<form id="fentry" method="post" action="' + $(this).find('div.left > div.title > a').attr('href') + '" style="display:inline;"><input type="hidden" value="' + token + '" name="form_key"><input type="hidden" value="1" name="enter_giveaway"><input id="fentry" type="submit" value="ENTER" style="width:60px;height:25px;font-size:10px;"></form>');
        }
    });
}

$('body').on('click', 'a#sget-token', function() {
    tokenregen();
});

$('form#fentry').on('submit', function(event) {
    event.preventDefault();
    var f_url = $(this).attr('action');
    var request = $.ajax({
        type: 'POST',
        url: 'http://www.steamgifts.com' + f_url,
        data: { form_key: token, enter_giveaway: 1 } })
        .done(function(data) { location.reload(); })
        .fail(function() { alert('error'); });   
});

$('form#fout').on('submit', function(event) {
    event.preventDefault();
    var f_url = $(this).attr('action');
    var request = $.ajax({
        type: 'POST',
        url: 'http://www.steamgifts.com' + f_url,
        data: { form_key: token, enter_giveaway: 0 } })
        .done(function(data) { location.reload(); })
        .fail(function() { alert('error'); });   
});
