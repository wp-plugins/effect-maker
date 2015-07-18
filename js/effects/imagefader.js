/*
 * Effect from the Effect Maker product, http://www.effectmaker.com/
 * Copyright (c) 2014 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this product package.
 */
var _01_hasBeenInitialized = false;
var _01_currentItem = 0;
var _01_imageWidths = new Array();
var _01_imageHeights = new Array();
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
	$('#_01_animation').append('<div id="_01_imageholder" style="position:relative; visible:hidden; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');

    for (var i = 0; i < _01_images.length; i++) 
	{
        if (_01_images[i] != null && _01_images[i]!=undefined) 
        {
            _01_images[i] = _01_images[i].trim();
            $('#_01_imageholder').append('<div id="_01_image' + i + '" style="position:absolute; cursor:pointer" onClick="_01_clicked()"> <img id="_01_imagesrc' + i + '" src="'+_01_images[i]+'"/> </div>');
            if (_01_urls[i] != null && _01_urls[i] != undefined) _01_urls[i] = _01_urls[i].trim();
        	else _01_urls[i] = null;
    	}
	}
	_01_intervalHandle=setInterval(function () { _01_preloadImages() }, 50);
}

function _01_preloadImages()
{
	var loaded=true;
   	for (var i = 0; i < _01_images.length; i++) 
   	    if (!$('#_01_imagesrc' + i).get(0).complete) loaded = false;
	if (loaded)
	{
		clearInterval(_01_intervalHandle);
		//do handling code
		for (var i = 0; i < _01_images.length; i++) 
		{
		    _01_imageWidths[i] = $('#_01_image' + i).width();
		    _01_imageHeights[i] = $('#_01_image' + i).height();
		    $('#_01_image' + i).css('left', Math.floor(_01_effectwidth / 2 ) + "px");
		    $('#_01_image' + i).css('top', Math.floor(_01_effectheight / 2 ) + "px");
		    $('#_01_image' + i).css('margin-left', parseInt(-_01_imageWidths[i] / 2) + 'px');
		    $('#_01_image' + i).css('margin-top', parseInt(-_01_imageHeights[i] / 2) + 'px');
		    $('#_01_image' + i).hide();
        }
		$('#_01_image' + _01_currentItem).css('visibility', 'visible');
		$('#_01_image' + _01_currentItem).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
		_01_intervalHandle=setInterval(function () { _01_animate() }, 25);
	}

}

AppManagement.prototype.restartEffect = function()
{
    clearInterval(_01_intervalHandle);
    _01_currentItem = 0;
    _01_restCounter = 0;
	if (_01_hasBeenInitialized)
	{
	    for (var i = 0; i < _01_images.length; i++) {
	        $('#_01_image' + i).stop(true, true);
	        $('#_01_image' + i).hide();
	    }
	    $('#_01_image' + _01_currentItem).css('visibility', 'visible');
	    $('#_01_image' + _01_currentItem).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
	    _01_intervalHandle = setInterval(function () { _01_animate() }, 25);
    }
	else
	{
		_01_init();
	}
}

AppManagement.prototype.destroyEffect = function () {
    clearInterval(_01_intervalHandle);
    _01_currentItem = 0;
    _01_restCounter = 0;
    _01_hasBeenInitialized = false;
    for (var i = 0; i < _01_images.length; i++) {
        $('#_01_image' + i).stop(true, true);
        $('#_01_image' + i).hide();
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
		    $('#_01_image' + _01_currentItem).fadeOut(parseInt(10000 / _01_fadespeed), function () { _01_fadeOutCompleted = true; });
		    if (_01_typeoffade==1)
		    {
		        var next = _01_currentItem + 1;
		        if (next >= _01_images.length) next = 0;
		        $('#_01_image' + next).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
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
			if (_01_currentItem >= _01_images.length) _01_currentItem = 0;
			$('#_01_image' + _01_currentItem).css('visibility', 'visible');
			if (_01_typeoffade == 0) $('#_01_image' + _01_currentItem).fadeIn(parseInt(10000 / _01_fadespeed), function () { _01_fadeInCompleted = true; });
		}
		
	}
}