/*
 * Effect from the Effect Maker product, http://www.effectmaker.com/
 * Copyright (c) 2015 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this product package.
 */
var _01_hasBeenInitialized = false;
var _01_currentItem = 0;
var _01_nextItem = 0;
var _01_rotationAngle = 0;
var _01_currentPosition = 0;
var _01_maxPosition=1000;
var _01_imageWidths = new Array();
var _01_imageHeights = new Array();
var _01_restCounter=0;
var _01_intervalHandle = null;
var _01_shufflingOut = false;
var _01_shufflingIn = false;

_01_init = function () {
    _01_currentItem = 0;
    if (_01_images.length > 1) _01_nextItem = 1;
    else _01_nextItem = 0;
    _01_rotationAngle = 0;
    _01_currentPosition = 0;
    _01_maxPosition = 1000;
    _01_restCounter = _01_restmaxcounter;
    //set the width of the effect based on the assigned window's width
    $('#_01_animation').css('width', _01_effectwidth);
    $('#_01_animation').css('height', _01_effectheight);
    $('#_01_animation').append('<div id="_01_imageholder" style="position:relative; visible:hidden; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');

    for (var i = 0; i < _01_images.length; i++) 
	{
        if (_01_images[i] != null && _01_images[i]!=undefined) 
        {
            _01_images[i] = _01_images[i].trim();
            $('#_01_imageholder').append('<div id="_01_image' + i + '" style="position:absolute; visibility:hidden; cursor:pointer" onClick="_01_clicked()"> <img id="_01_imagesrc' + i + '" src="' + _01_images[i] + '"/> <div id="_01_imageoverlay' + i + '" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; background-color: rgba(0,0,0,0.0);"/></div>');
            if (_01_urls[i] != null && _01_urls[i] != undefined) _01_urls[i] = _01_urls[i].trim();
        	else _01_urls[i] = null;
    	}
	}
    _01_intervalHandle = setInterval(function () { _01_preloadImages() }, 50);
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
		    $('#_01_image' + i).css('display', 'inline');
		}
		$('#_01_image0').css('visibility', 'hidden');
		_01_hideAllImages();
		_01_centerImage(_01_currentItem);

		$('#_01_image' + _01_currentItem).css('visibility', 'visible');
		$('#_01_image' + _01_currentItem).show();
		$('#_01_image' + _01_currentItem).css('z-index', '20');

		_01_animate();
		_01_intervalHandle=setInterval(function () { _01_animate() }, 25);
    }

}

AppManagement.prototype.restartEffect = function()
{
    clearInterval(_01_intervalHandle);
    $('#_01_animation').html('');
    _01_currentItem = 0;
    if (_01_images.length > 1) _01_nextItem = 1;
    else _01_nextItem = 0;
    _01_rotationAngle = 0;
    _01_currentPosition = 0;
    _01_maxPosition = 1000;
    _01_restCounter = _01_restmaxcounter;
	if (_01_hasBeenInitialized)
	{
	    _01_hideAllImages();
	}
	else
	{
		_01_init();
	}
}

AppManagement.prototype.destroyEffect = function()
{
    clearInterval(_01_intervalHandle);
    _01_hasBeenInitialized = false;
    _01_hideAllImages();
    $('#_01_animation').html('');

}


_01_clicked=function()
{
    window.open(_01_urls[_01_currentItem], _01_urltarget);
}

function _01_shufflingOutAnimation()
{
    _01_rotationAngle = _01_currentPosition/10.0;

    _01_rotationAngle2 = 0;

    _01_moveImage(_01_rotationAngle, _01_rotationAngle2, _01_currentItem, (1 - _01_currentPosition / _01_effectwidth/5.0), -3*_01_currentPosition/2);
    _01_moveImage(-_01_rotationAngle, _01_rotationAngle2, _01_nextItem, (1 + _01_currentPosition / _01_effectwidth / 5.0), _01_currentPosition/2);
    if (_01_currentPosition < _01_effectwidth / 2) _01_currentPosition += _01_imagespeed;
    else {
        _01_shufflingOut = false;
        $('#_01_image' + _01_currentItem).css('z-index', '0');
        $('#_01_image' + _01_nextItem).css('z-index', '20');
        _01_shufflingIn = true;
    }

}

function _01_shufflingInAnimation()
{
    _01_rotationAngle = _01_currentPosition / 10.0;

    _01_rotationAngle2 = 0;

    _01_moveImage(_01_rotationAngle, _01_rotationAngle2, _01_currentItem, (1 - _01_currentPosition / _01_effectwidth / 5.0), -3 * _01_currentPosition / 2);
    _01_moveImage(-_01_rotationAngle, _01_rotationAngle2, _01_nextItem, (1 + _01_currentPosition / _01_effectwidth / 5.0), _01_currentPosition / 2);

    if (_01_currentPosition > 0) _01_currentPosition-=_01_imagespeed;
    else {
        _01_shufflingIn = false;
        _01_hideAllImages();
        _01_currentItem++;
        if (_01_currentItem >= _01_images.length) _01_currentItem = 0;
        _01_nextItem++;
        if (_01_nextItem >= _01_images.length) _01_nextItem = 0;

        $('#_01_image' + _01_currentItem).css('visibility', 'visible');
        $('#_01_image' + _01_currentItem).show();
        $('#_01_image' + _01_nextItem).css('visibility', 'visible');
        $('#_01_image' + _01_nextItem).show();
        _01_centerImage(_01_nextItem);
        _01_restCounter = _01_restmaxcounter;
    }
}

function _01_moveImage(xangle, zangle, n, sizeFactor, adjustmentX)
{
    //Do actual movement from now on
    var transformX = Math.cos(xangle * Math.PI / 180) * sizeFactor;
    var transformY = sizeFactor;
    if (transformX < 0) {
        //only display a black/white backside
        var rgb = parseInt(Math.abs(transformX) * 255);
        $('#_01_imageoverlay' + n).css('background-color', 'rgba(' + rgb + ',' + rgb + ',' + rgb + ',1.0)');
        $('#_01_imagesrc' + n).css('visibility', 'hidden');
    }
    else {
        $('#_01_imageoverlay' + _01_currentItem).css('background-color', 'rgba(30,30,30,' + (1.0 - Math.cos(zangle * Math.PI / 180)) + ')');
        $('#_01_imagesrc' + _01_currentItem).css('visibility', 'visible');
    }
    $('#_01_image' + n).css('transform', 'scale(' + transformX + ',' + transformY + ') rotate(' + zangle + 'deg)');
    $('#_01_image' + n).css('-ms-transform', 'scale(' + transformX + ',' + transformY + ') rotate(' + zangle + 'deg)');
    $('#_01_image' + n).css('-webkit-transform', 'scale(' + transformX + ',' + transformY + ') rotate(' + zangle + 'deg)');
    $('#_01_image' + n).css('-moz-transform', 'scale(' + transformX + ',' + transformY + ') rotate(' + zangle + 'deg)');
    $('#_01_image' + n).css('-o-transform', 'scale(' + transformX + ',' + transformY + ') rotate(' + zangle + 'deg)');
    var currentWidth = $('#_01_image' + n).width();
    var dx = Math.floor((_01_imageWidths[n] - currentWidth) / 2.0);
    $('#_01_image' + n).css('left', Math.floor(_01_effectwidth / 2 + dx)+ adjustmentX + "px");
    $('#_01_image' + n).css('top', Math.floor(_01_effectheight / 2 + 0) + "px");
    $('#_01_image' + n).css('margin-left', parseInt(-_01_imageWidths[n] / 2) + 'px');
    $('#_01_image' + n).css('margin-top', parseInt(-_01_imageHeights[n] / 2) + 'px');
}

function _01_centerImage(n)
{
    $('#_01_image' + n).css('left', Math.floor(_01_effectwidth / 2) + "px");
    $('#_01_image' + n).css('top', Math.floor(_01_effectheight / 2) + "px");
    $('#_01_image' + n).css('margin-left', parseInt(-_01_imageWidths[n] / 2) + 'px');
    $('#_01_image' + n).css('margin-top', parseInt(-_01_imageHeights[n] / 2) + 'px');
}

function _01_hideAllImages()
{
    for (var i = 0; i < _01_images.length; i++) {
        $('#_01_image' + i).css('visibility', 'hidden');
        $('#_01_image' + i).hide();
    }

}

function _01_animate() {

    //Manage rotation
    if (_01_restCounter > 0)
    {
        _01_restCounter--;
        if (_01_restCounter == 0) {
            _01_shufflingOut = true;
            _01_hideAllImages();
            _01_centerImage(_01_currentItem);
            _01_centerImage(_01_nextItem);

            $('#_01_image' + _01_currentItem).css('visibility', 'visible');
            $('#_01_image' + _01_currentItem).show();
            $('#_01_image' + _01_currentItem).css('z-index', '20');
            $('#_01_image' + _01_nextItem).css('visibility', 'visible');
            $('#_01_image' + _01_nextItem).show();
            $('#_01_image' + _01_nextItem).css('z-index', '0');
            _01_currentPosition = 0;
        }
    }
	else
	{
        if (_01_shufflingIn) {
            _01_shufflingInAnimation();
        }
        if (_01_shufflingOut) {
            _01_shufflingOutAnimation();
        }


	}
}