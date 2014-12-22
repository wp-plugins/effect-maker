/*
 * Effect from the Effect Maker product, http://www.effectmaker.com/
 * Copyright (c) 2014 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this product package.
 */
var _01_hasBeenInitialized = false;
var _01_currentItem = 0;
var _01_widths = new Array();
var _01_heights = new Array();
var _01_restCounter=0;
var _01_intervalHandle=null;
var _01_fadeInCompleted=false;
var _01_fadeOutCompleted=false;

_01_init = function () {
	_01_hasBeenInitialized=true;
	$('#_01_animation').html('');
    //set the width of the effect based on the assigned window's width
	$('#_01_animation').css('width', _01_effectwidth);
	$('#_01_animation').css('height', _01_effectheight);
	$('#_01_animation').append('<div id="_01_textholder" style="position:relative; visible:hidden; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');

    for (var i = 0; i < _01_texts.length; i++) 
	{
        if (_01_texts[i] != null && _01_texts[i] != undefined)
        {
            _01_texts[i] = _01_texts[i].trim();
            $('#_01_textholder').append('<div id="_01_text' + i + '" style="position:absolute; cursor:pointer; text-align: ' + _01_textalignment + ';" onClick="_01_clicked()"> <div id="_01_textsrc' + i + '" style="font-family:' + _01_font + '; font-style:' + _01_fontstyle + '; font-size:' + _01_fontsize + 'px; color:' + _01_textcolor + '"> ' + _01_texts[i] + '</div> </div>');
            if (_01_urls[i] != null && _01_urls[i] != undefined) _01_urls[i] = _01_urls[i].trim();
        	else _01_urls[i] = null;
    	}
	}
    for (var i = 0; i < _01_texts.length; i++)
	{
        _01_widths[i] = $('#_01_text' + i).width();
        _01_heights[i] = $('#_01_text' + i).height();
        $('#_01_text' + i).css('left', '50%');
        $('#_01_text' + i).css('top', '50%');
        $('#_01_text' + i).css('margin-left', parseInt(-_01_widths[i] / 2) + 'px');
        $('#_01_text' + i).css('margin-top', parseInt(-_01_heights[i] / 2) + 'px');
        $('#_01_text' + i).css('display', 'none');
        $('#_01_text' + i).hide();
    }
    $('#_01_text' + _01_currentItem).css('visibility', 'visible');
    $('#_01_text' + _01_currentItem).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
    _01_intervalHandle = setInterval(function () { _01_animate() }, 25);
}

AppManagement.prototype.restartEffect = function()
{
    if (_01_hasBeenInitialized)
	{
        clearInterval(_01_intervalHandle);
        for (var i = 0; i < _01_texts.length; i++) {
            $('#_01_text' + i).stop(true, true);
            $('#_01_text' + i).hide();
        }
    }
    _01_currentItem = 0;
    _01_restCounter = 0;
    _01_fadeInCompleted = false;
    _01_fadeOutCompleted = false;
	_01_init();
}

AppManagement.prototype.destroyEffect = function () {
    clearInterval(_01_intervalHandle);
    for (var i = 0; i < _01_texts.length; i++) {
        $('#_01_text' + i).stop(true, true);
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
		    $('#_01_text' + _01_currentItem).fadeOut(parseInt(10000 / _01_fadespeed), function () { _01_fadeOutCompleted = true; });
		    if (_01_typeoffade==1)
		    {
		        var next = _01_currentItem + 1;
		        if (next >= _01_texts.length) next = 0;
		        $('#_01_text' + next).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
		    }
		}
    }
	else
	{
		if (_01_fadeInCompleted)
		{
			_01_fadeInCompleted=false;
			_01_restCounter = _01_restmaxcounter;
		}
		if (_01_fadeOutCompleted)
		{
			_01_fadeOutCompleted=false;
			_01_currentItem++;
			if (_01_currentItem >= _01_texts.length) _01_currentItem = 0;
			$('#_01_text' + _01_currentItem).css('visibility', 'visible');
			if (_01_typeoffade == 0) $('#_01_text' + _01_currentItem).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
		}
		
	}
}