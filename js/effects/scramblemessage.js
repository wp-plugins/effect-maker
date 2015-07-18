/*
 * Effect from the Effect Maker product, http://www.effectmaker.com/
 * Copyright (c) 2015 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this product package.
 */
var _01_hasBeenInitialized = false;
var _01_currentItem = 0;
var _01_widths = new Array();
var _01_heights = new Array();
var _01_charRelPos = new Array();
var _01_restCounter=0;
var _01_intervalHandle=null;
var _01_fallInCompleted = false;
var _01_fallOutCompleted = false;
var _01_doFallInAnimation = false;
var _01_doFallOutAnimation = false;
var _01_originalPosition = new Array();

_01_init = function () {
    _01_hasBeenInitialized = true;
    _01_fallInCompleted = false;
    _01_fallOutCompleted = false;
    _01_doFallInAnimation = false;
    _01_doFallOutAnimation = false;
    _01_currentItem = 0;
    _01_restCounter = 0;
    $('#_01_animation').html('');
    //set the width of the effect based on the assigned window's width
	$('#_01_animation').css('width', _01_effectwidth);
	$('#_01_animation').css('height', _01_effectheight);
	$('#_01_animation').css('max-width', 'none');
	$('#_01_animation').append('<div id="_01_textholder" style="position:relative; visible:hidden; max-width:none; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');
    for (var i = 0; i < _01_texts.length; i++)
	{
        if (_01_texts[i] != null && _01_texts[i] != undefined)
        {
            _01_texts[i] = _01_texts[i].trim();
            _01_texts[i] = _01_texts[i].replace(new RegExp('<br/>', 'g'), '');
            _01_texts[i] = _01_texts[i].replace(new RegExp('<BR/>', 'g'), '');
            $('#_01_textholder').append('<div id="_01_text' + i + '" style="position:absolute; cursor:pointer; text-align: left;" onClick="_01_clicked()"> <div id="_01_textsrc' + i + '" style="font-family:' + _01_font + '; font-style:' + _01_fontstyle + '; font-size:' + _01_fontsize + 'px; color:' + _01_textcolor + '"> ' + _01_texts[i] + '</div> </div>');
            _01_charRelPos[i] = new Array();
            for (var j = 0; j < _01_texts[i].length; j++) {
                //if we have a space the text width will not take the last char to account, replace with a &nbsp;
                if (j>0 && _01_texts[i].charAt(j-1) == ' ')
                    $('#_01_textsrc' + i).html(_01_texts[i].substring(0, j - 1) + '&nbsp;');
                else
                    $('#_01_textsrc' + i).html(_01_texts[i].substring(0, j));
                _01_charRelPos[i][j] = $('#_01_textsrc' + i).width();
            }
            $('#_01_textsrc' + i).html(_01_texts[i]);
            if (_01_urls[i] != null && _01_urls[i] != undefined) _01_urls[i] = _01_urls[i].trim();
        	else _01_urls[i] = null;
    	}
	}
    for (var i = 0; i < _01_texts.length; i++)
	{
        _01_widths[i] = $('#_01_text' + i).width();
        _01_heights[i] = $('#_01_text' + i).height();
        if (_01_textalignment == 0) $('#_01_text' + i).css('left', Math.floor(_01_widths[i]/2)+'px');
        else if (_01_textalignment == 2) $('#_01_text' + i).css('left', Math.floor(_01_effectwidth - _01_widths[i]/2.0-10) + 'px');
        else $('#_01_text' + i).css('left', '50%');
        $('#_01_text' + i).css('top', '50%');
        $('#_01_text' + i).css('margin-left', parseInt(-_01_widths[i] / 2) + 'px');
        $('#_01_text' + i).css('margin-top', parseInt(-_01_heights[i] / 2) + 'px');
        $('#_01_text' + i).hide();
    }
    _01_fallInMessage();
    _01_intervalHandle = setInterval(function () { _01_animate() }, 50);
}

function _01_fallInMessage()
{
    var s = '';
    for (var i = 0; i < _01_texts[_01_currentItem].length; i++) {
        s += '<span id="_01_subs' + i + '" style="position:absolute; left:' + _01_charRelPos[_01_currentItem][i] + 'px;">' +_01_texts[_01_currentItem].charAt(i) + '</span>';
        var d = Math.max(_01_effectwidth, _01_effectheight)+Math.random()*500;
        var alpha = (Math.random()*180.0)/Math.PI;
        _01_originalPosition[i] = new Array(d * Math.sin(alpha), d * Math.cos(alpha));
    }
    $('#_01_textsrc' + _01_currentItem).html(s);
    _01_doFallInAnimation = true;
}

function _01_fallOutMessage()
{
    for (var i = 0; i < _01_texts[_01_currentItem].length; i++) {
        var d = 2;
        var alpha = (Math.random() * 180.0) / Math.PI;
        _01_originalPosition[i] = new Array(d * Math.sin(alpha), d * Math.cos(alpha));
    }
    _01_doFallOutAnimation = true;
}

function _01_fallInAnimation()
{
    var finishedFalling = true;
    var offsetX = $('#_01_text' + _01_currentItem).position().left;
    var offsetY = $('#_01_text' + _01_currentItem).position().top;
    var movementFactor= (1 - _01_effectspeed / 100.0);

    for (var i = 0; i < _01_texts[_01_currentItem].length; i++) {
        _01_originalPosition[i][0] = _01_originalPosition[i][0] * movementFactor;
        _01_originalPosition[i][1] = _01_originalPosition[i][1] * movementFactor;
        var dx = Math.round(_01_originalPosition[i][0]);
        var dy = Math.round(_01_originalPosition[i][1]);
        var x = _01_charRelPos[_01_currentItem][i] + dx;
        var y = dy;
        $('#_01_subs' + i).css('left', x +'px');
        $('#_01_subs' + i).css('top', y + 'px');
        if (dx != 0 || dy != 0) finishedFalling = false;
    }
    $('#_01_text' + _01_currentItem).show();
    if (finishedFalling)
    {
        _01_doFallInAnimation = false;
        _01_restCounter = _01_restmaxcounter;
    }

}

function _01_fallOutAnimation() {
    var someAreVisible = false;
    var offsetX = $('#_01_text' + _01_currentItem).position().left;
    var offsetY = $('#_01_text' + _01_currentItem).position().top;
    var movementFactor = (1 + _01_effectspeed / 100.0);

    for (var i = 0; i < _01_texts[_01_currentItem].length; i++) {
        _01_originalPosition[i][0] = _01_originalPosition[i][0] * movementFactor;
        _01_originalPosition[i][1] = _01_originalPosition[i][1] * movementFactor;
        var dx = Math.round(_01_originalPosition[i][0]);
        var dy = Math.round(_01_originalPosition[i][1]);
        var x = _01_charRelPos[_01_currentItem][i] + dx;
        var y = dy;
        $('#_01_subs' + i).css('left', x + 'px');
        $('#_01_subs' + i).css('top', y + 'px');
        if (x + offsetX >= 0 && x + offsetX <= _01_effectwidth+60 && y + offsetY >= 0 && y + offsetY <= _01_effectheight+60) someAreVisible = true;
    }
    if (!someAreVisible) {
        _01_doFallOutAnimation = false;
        $('#_01_text' + _01_currentItem).hide();
        $('#_01_textsrc' + _01_currentItem).html(_01_texts[_01_currentItem]);
        _01_currentItem++;
        if (_01_currentItem >= _01_texts.length) _01_currentItem = 0;
        _01_fallInMessage();
    }

}

AppManagement.prototype.restartEffect = function()
{
    if (_01_hasBeenInitialized)
	{
        clearInterval(_01_intervalHandle);
        for (var i = 0; i < _01_texts.length; i++) {
            $('#_01_text' + i).hide();
        }
    }
	_01_init();
}

AppManagement.prototype.destroyEffect = function () {
    clearInterval(_01_intervalHandle);
    for (var i = 0; i < _01_texts.length; i++) {
        $('#_01_text' + i).hide();
    }
    $('#_01_animation').html('');
}

_01_clicked=function()
{
    window.open(_01_urls[_01_currentItem], _01_urltarget);
}

function _01_animate() {

    //Manage fading
    if (_01_restCounter > 0)
    {
        _01_restCounter--;
		if (_01_restCounter==0) 
		{
		    _01_fallOutMessage();
		}
    }
	else
	{
		if (_01_doFallInAnimation)
		{
		    _01_fallInAnimation();
		}
		if (_01_doFallOutAnimation)
		{
		    _01_fallOutAnimation();
		}
		
	}
}