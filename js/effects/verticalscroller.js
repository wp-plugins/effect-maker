/*
 * Effect from the Effect Maker product, http://www.effectmaker.com/
 * Copyright (c) 2014 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this product package.
 */
var _01_hasBeenInitialized = false;
var _01_width = 0;
var _01_height = 0;
var _01_intervalHandle = null;
var _01_currentpos = 0;
var _01_totalheight = 0;
var _01_mouseovercounter = 0;
var _01_mouseoverscrollingspeed = 0;
var _01_waitperiod = Math.round(1000 / _01_fps);

_01_init = function () {
	_01_hasBeenInitialized=true;
	$('#_01_animation').html('');
    //set the width of the effect based on the assigned window's width
	$('#_01_animation').css('width', _01_effectwidth);
	$('#_01_animation').css('height', _01_effectheight);
    _01_text = _01_text.replace(new RegExp('<br/>', 'g'), '');
    _01_text = _01_text.replace(new RegExp('<BR/>', 'g'), '');
    _01_text = _01_text.replace(new RegExp('\r\n', 'g'), '');
    _01_text = _01_text.replace(new RegExp('\n', 'g'), '');
    _01_text = _01_text.replace(new RegExp('\\"', 'g'), '"');
    _01_text = _01_text.replace(new RegExp('\\\'', 'g'), '\'');

    var newlines = '&nbsp;';
    var backgroundcolor = getRBGDecimal(_01_backgroundcolor);
    for (var i = 0; i < _01_spaces; i++)
        newlines += '</BR>';
    $('#_01_animation').append('<div id="_01_textholder" onMouseOver="_01_mouseOver(event)" style="position:relative; visible:hidden; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');
    if (_01_usesidefading)
    {
        for (var i = 0; i < 10; i++) {
            $('#_01_textholder').append('<div id="_01_imageoverlay' + 1 + '" style="position:absolute; top:0; left:0; height:' + i * 2 + 'px; width:100%; z-index:' + i + '; background-color: rgba(' + backgroundcolor + ',0.3);"/>');
            $('#_01_textholder').append('<div id="_01_imageoverlay' + 1 + '" style="position:absolute; bottom:0; left:0; height:' + i * 2 + 'px; width:100%; z-index:' + i + '; background-color: rgba(' + backgroundcolor + ',0.3);"/>');
        }
    }

    $('#_01_textholder').append('<div id="_01_text" style="position:absolute;"> <div id="_01_textsrc" style="font-family:' + _01_font + '; font-style:' + _01_fontstyle + '; font-size:' + _01_fontsize + 'px; color:' + _01_textcolor + '"> ' + _01_text + '</div> </div>');
    _01_height = $('#_01_textsrc').height();
    $('#_01_textsrc').html(_01_text + newlines + _01_text);
    _01_totalheight = $('#_01_textsrc').height();
    _01_width = $('#_01_text').width();
    $('#_01_text').css('top', (-_01_currentpos + _01_effectheight) + 'px');
    _01_intervalHandle = setInterval(function () { _01_animate() }, _01_waitperiod);
}

AppManagement.prototype.restartEffect = function()
{
    _01_currentpos = 0;
    if (_01_hasBeenInitialized)
	{
        clearInterval(_01_intervalHandle);
        $('#_01_text').hide();
    }
	_01_init();
}

AppManagement.prototype.destroyEffect = function () {
    clearInterval(_01_intervalHandle);
    _01_currentpos = 0;
    $('#_01_text').hide();
    $('#_01_animation').html('');
}

_01_mouseOver = function (e) {
    _01_mouseovercounter = _01_waitperiod;
    var pos=e.pageY - $('#_01_textholder').offset().top;
    _01_mouseoverscrollingspeed = (pos - _01_effectheight / 2)/10.0;
    _01_mouseoverscrollingspeed = Math.max(Math.min(_01_mouseoverscrollingspeed, _01_maxscrollingspeed), -_01_maxscrollingspeed);
}

function _01_animate() {
    if (_01_mouseovercounter > 0) {
        _01_mouseovercounter--;
        _01_currentpos += _01_mouseoverscrollingspeed;
    }
    else {
        _01_currentpos += _01_scrollingspeed;
    }
    if (_01_currentpos > _01_height + _01_effectheight)
        _01_currentpos -= _01_totalheight - _01_height;
    if (_01_currentpos < 0 && _01_mouseoverscrollingspeed<0)
        _01_currentpos += _01_totalheight-_01_height;
    $('#_01_text').css('top', (-_01_currentpos + _01_effectheight) + 'px');
}

function getRBGDecimal(hexcolor) {
    if (hexcolor.indexOf('#') > -1) hexcolor = hexcolor.substring(1);
    var r = Math.floor(parseInt(hexcolor.substring(0, 2), 16) );
    var g = Math.floor(parseInt(hexcolor.substring(2, 4), 16) );
    var b = Math.floor(parseInt(hexcolor.substring(4, 6), 16));
    return r+','+g+','+b;
}