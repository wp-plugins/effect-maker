/*
 * Effect from the Effect Maker product, http://www.effectmaker.com/
 * Copyright (c) 2014 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this product package.
 */
var _01_hasBeenInitialized = false;
var _01_currentItem = -1;
var _01_rotationAngle = 0;
var _01_directionForward = false;
var _01_maxPosition=100;
var _01_currentPosition = 0;
var _01_imageWidths = new Array();
var _01_imageHeights = new Array();
var _01_restCounter=0;
var _01_intervalHandle = null;
var _01_selfMovementCounter = 0;
var _01_directionX = 0;
var _01_newAngle = 0;
var _01_oldAngle = 0;


_01_init = function () {
    //set the width of the effect based on the assigned window's width
    $('#_01_animation').html('');
    if ($('#note').length) $('#note').html('Note! Due to limitations in the Effect Maker browser, this effect may not preview properly in Effect Maker for Windows and Mac. The Back images will not appear in opaque mode.<BR/> Try saving it and see the effect in a browser window instead to really see how it looks like.');
    _01_currentItem = -1;
    _01_rotationAngle = 0;
    _01_directionForward = false;
    _01_maxPosition = 100;
    _01_currentPosition = 0;
    _01_directionX = 0;
    _01_newAngle = 0;
    _01_oldAngle = 0;
    _01_imageWidths = new Array();
    _01_imageHeights = new Array();
    _01_selfMovementCounter = 0;
    _01_restCounter = 0;

    $('#_01_animation').css('width', _01_effectwidth);
    $('#_01_animation').css('height', _01_effectheight);
    $('#_01_animation').append('<div id="_01_imageholder" style="position:relative; max-width:none; overflow:hidden; left:0px; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');
    $('#_01_imageholder').append('<div id="_01_text" style="position:absolute; z-index:200"> <div id="_01_textsrc" style="font-family:' + _01_font + '; font-style:' + _01_fontstyle + '; font-size:' + _01_fontsize + 'px; color:' + _01_textcolor + '"> ' + _01_text + '</div> </div>');
    $('#_01_text').css('left', Math.floor((_01_effectwidth - $('#_01_textsrc').width())/2));
    $('#_01_text').css('top', Math.floor((_01_effectheight - $('#_01_textsrc').height()) / 2));
    for (var i = 0; i < _01_images.length; i++)
	{
        if (_01_images[i] != null && _01_images[i]!=undefined) 
        {
            _01_images[i] = _01_images[i].trim();
            if (_01_imagebackmode == 0) $('#_01_imageholder').append('<div id="_01_image' + i + '" style="position:absolute; max-width:none;cursor:pointer;left:0px" onClick="_01_clicked('+i+')"> <img id="_01_imagesrc' + i + '" src="' + _01_images[i] + '" style="max-width:none;" /> <div id="_01_imageoverlay' + i + '" style="position:absolute; top:0; max-width:none;left:0; width:100%; height:100%; z-index:10; background-color: rgba(0,0,0,0.0);"/></div>');
            else $('#_01_imageholder').append('<div id="_01_image' + i + '" style="position:absolute; max-width:none;cursor:pointer;left:0px" onClick="_01_clicked(' + i + ')"> <img id="_01_imagesrc' + i + '" style="max-width:none;" src="' + _01_images[i] + '"/> </div>');
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
		}
		_01_animate();
		_01_intervalHandle=setInterval(function () { _01_animate() }, 25);
	}

	$('#_01_animation').mousemove(function (e) {
	    var x = e.pageX - $('#_01_animation').offset().left;
	    _01_selfMovementCounter = _01_selfmovementpause;
	    if (x > _01_effectwidth / 2 + _01_nonscrollingarea / 2) {
	        var dx = Math.abs(x - _01_effectwidth / 2) - _01_nonscrollingarea / 2;
	        _01_directionX = (dx * _01_rotatespeed / 90);
	    }
	    else if (x < _01_effectwidth / 2 - _01_nonscrollingarea / 2) {
	        var dx = Math.abs(x - _01_effectwidth / 2) - _01_nonscrollingarea / 2;
	        _01_directionX = -(dx * _01_rotatespeed / 90);
	    }
	    else _01_directionX = 0;
	    _01_currentLink = null;
	});
}

AppManagement.prototype.restartEffect = function()
{
    clearInterval(_01_intervalHandle);
	_01_init();
}

AppManagement.prototype.destroyEffect = function()
{
    clearInterval(_01_intervalHandle);
    $('#_01_animation').html('');

}


_01_clicked=function(item)
{
    if (_01_clickmode == 1) {
        _01_currentItem = item;
        window.open(_01_urls[_01_currentItem], _01_urltarget);
    }
    else {
        if (_01_restCounter > 0) {
            window.open(_01_urls[_01_currentItem], _01_urltarget);
        }
        else {
            if (_01_currentPosition == 0) {
                _01_currentItem = item;
                _01_directionForward = true;
                _01_newAngle = -_01_currentItem * 360 / (_01_images.length);
                _01_oldAngle = _01_rotationAngle;
                if (Math.abs(_01_newAngle - _01_oldAngle)>180) _01_newAngle += 360;
            }
        }
    }
}

function _01_animate() {

    if (_01_restCounter > 0)
    {
        _01_restCounter--;
    }
    if (_01_currentPosition == 0 && !_01_directionForward) {
        if (_01_selfMovementCounter > 0) _01_selfMovementCounter--;
        if (_01_restCounter == 0 && _01_selfMovementCounter == 0) {
            _01_directionX = -_01_rotatespeed * (_01_selfmovementdirection - 1);
            _01_selfMovementCounter = _01_selfmovementpause;
        }
        _01_rotationAngle += _01_directionX;
        if (_01_rotationAngle > 360) _01_rotationAngle -= 360;
        if (_01_rotationAngle < 0) _01_rotationAngle += 360;
    }
    else
    {
        if (_01_directionForward) 
        {
            _01_currentPosition+=_01_rotatespeed*2;
            if (_01_currentPosition>=_01_maxPosition) 
            {
                _01_currentPosition=_01_maxPosition;
                _01_directionForward=false;
                _01_restCounter=_01_restmaxcounter;
            }
        }
        else 
        {
            if (_01_restCounter == 0) {
                _01_currentPosition -= _01_rotatespeed*2;
                if (_01_currentPosition <= 0) {
                    _01_currentPosition = 0;
                    _01_currentItem = -1;
                }
            }
        }
        if (_01_rotationAngle != _01_newAngle)
        {
            _01_rotationAngle = _01_newAngle * _01_currentPosition / _01_maxPosition + _01_oldAngle * (_01_maxPosition - _01_currentPosition) / _01_maxPosition;
        }
    }
    for (var i = 0; i < _01_images.length; i++) {
        var transformX = Math.cos(((_01_rotationAngle) + i * 360 / (_01_images.length)) * Math.PI / 180.0);
        var scaleFactor = _01_maximagesize / _01_imageHeights[i];
        if (_01_imageHeights[i] < _01_imageWidths[i]) {
            scaleFactor = _01_maximagesize / _01_imageWidths[i];
        }
        if (_01_currentItem == i) scaleFactor = (_01_maximagesize + (_01_effectheight - _01_maximagesize) * _01_currentPosition/_01_maxPosition) / _01_imageHeights[i];
        $('#_01_image' + i).css('z-index', Math.floor(200*transformX+200));
        if (_01_imagebackmode == 0) {
            if (transformX < 0) {
                //only display a black/white backside
                var rgb = parseInt(Math.abs(transformX) * 235);
                $('#_01_imageoverlay' + i).css('background-color', 'rgba(' + rgb + ',' + rgb + ',' + rgb + ',1.0)');
                $('#_01_imagesrc' + i).css('visibility', 'hidden');
            }
            else {
                $('#_01_imageoverlay' + i).css('background-color', 'rgba(30,30,30,' + (1.0 - transformX) + ')');
                $('#_01_imagesrc' + i).css('visibility', 'visible');
            }
        }
        else {
            if (transformX < 0) {
                $('#_01_imagesrc' + i).css('opacity', 1-Math.abs(transformX));
                $('#_01_imagesrc' + i).css('filter', 'alpha(opacity='+Math.floor((1-Math.abs(transformX))*100)+');');
           }
            else {
                $('#_01_imagesrc' + i).css('opacity', '1.0');
                $('#_01_imagesrc' + i).css('filter', 'alpha(opacity=100);');
            }
        }
        $('#_01_image' + i).css('transform', 'scale(' + transformX * scaleFactor + ',' + scaleFactor + ')');
        $('#_01_image' + i).css('-ms-transform', 'scale(' + transformX * scaleFactor + ',' + scaleFactor + ')');
        $('#_01_image' + i).css('-webkit-transform', 'scale(' + transformX * scaleFactor + ',' + scaleFactor + ')');
        $('#_01_image' + i).css('-moz-transform', 'scale(' + transformX * scaleFactor + ',' + scaleFactor + ')');
        $('#_01_image' + i).css('-o-transform', 'scale(' + transformX * scaleFactor + ',' + scaleFactor + ')');
        var dx = _01_effectwidth / 2 - _01_maximagesize / 2.0 + (_01_maximagesize - _01_imageWidths[i] * scaleFactor) / 2.0 - (_01_imageWidths[i] / 2.0 - (_01_imageWidths[i] * scaleFactor) / 2);
        var dy = _01_effectheight / 2 - _01_maximagesize/2.0 + (_01_maximagesize - _01_imageHeights[i] * scaleFactor) / 2.0 - (_01_imageHeights[i] / 2.0 - (_01_imageHeights[i] * scaleFactor) / 2);
        $('#_01_image' + i).css('left', Math.floor(dx + _01_galleryradius * Math.cos((_01_rotationAngle + 90 + i * 360 / (_01_images.length)) * Math.PI / 180.0)) + 'px');
        var tilting = (_01_currentItem == i)?((_01_maxPosition - _01_currentPosition) / _01_maxPosition) * _01_gallerytilt:_01_gallerytilt;
        $('#_01_image' + i).css('top', Math.floor(dy + tilting * Math.sin((_01_rotationAngle + 90 + i * 360 / (_01_images.length)) * Math.PI / 180.0)) + 'px');
    }
}