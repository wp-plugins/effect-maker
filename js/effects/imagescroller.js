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
var _01_totalwidth = 0;
var _01_totalheight = 0;
var _01_mouseovercounter = 0;
var _01_mouseoverscrollingspeed = 0;
var _01_imageWidths = new Array();
var _01_imageHeights = new Array();
var _01_waitperiod = Math.round(1000 / _01_fps);

_01_init = function () {
	_01_hasBeenInitialized=true;
	$('#_01_animation').html('');
    //set the width of the effect based on the assigned window's width
	$('#_01_animation').css('width', _01_effectwidth);
	$('#_01_animation').css('height', _01_effectheight);
	$('#_01_animation').append('<div id="_01_imageholder" onMouseOver="_01_mouseOver(event)" style="position:relative; visible:hidden; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');
    $('#_01_imageholder').append('<div id="_01_innerimageholder" onMouseOver="_01_mouseOver(event)" style="position:absolute;"></div>');

    var backgroundcolor = getRBGDecimal(_01_backgroundcolor);
	var horizontalfix='';
	if (!_01_verticalscrolling) horizontalfix='float:left';
    for (var i = 0; i < _01_images.length; i++) {
        if (_01_images[i] != null && _01_images[i] != undefined) {
            _01_images[i] = _01_images[i].trim();
            $('#_01_innerimageholder').append('<div id="_01_image' + i + '" style="cursor:pointer;'+horizontalfix+'" onClick="_01_clicked('+i+');"> <img id="_01_imagesrc' + i + '" src="' + _01_images[i] + '"/> </div>');
            if (_01_urls[i] != null && _01_urls[i] != undefined) _01_urls[i] = _01_urls[i].trim();
            else _01_urls[i] = null;
        }
    }
    //we need to add X number of images after those too
    for (var i = 0; i < _01_images.length; i++) {
        if (_01_images[i] != null && _01_images[i] != undefined) {
			if (!_01_verticalscrolling && i==_01_images.length-1) horizontalfix='clear:left';
            $('#_01_innerimageholder').append('<div id="_01_image' + (i + _01_images.length) + '" style="cursor:pointer;'+horizontalfix+'" onClick="_01_clicked('+i+');"> <img id="_01_imagesrc' + (i + _01_images.length) + '" src="' + _01_images[i] + '"/> </div>');
        }
    }

    if (_01_usesidefading)
    {
        if (_01_verticalscrolling) {
            for (var i = 0; i < 10; i++) {
                $('#_01_imageholder').append('<div id="_01_imageoverlay' + i + '" style="position:absolute; top:0; left:0; height:' + i * 2 + 'px; width:100%; z-index:' + i + '; background-color: rgba(' + backgroundcolor + ',0.3);"/>');
                $('#_01_imageholder').append('<div id="_01_imageoverlay' + i + '" style="position:absolute; bottom:0; left:0; height:' + i * 2 + 'px; width:100%; z-index:' + i + '; background-color: rgba(' + backgroundcolor + ',0.3);"/>');
            }
        }
        else
        {
            for (var i = 0; i < 10; i++) {
                $('#_01_imageholder').append('<div id="_01_imageoverlay' + i + '" style="position:absolute; left:0; top:0; width:' + i * 2 + 'px; height:100%; z-index:' + i + '; background-color: rgba(' + backgroundcolor + ',0.3);"/>');
                $('#_01_imageholder').append('<div id="_01_imageoverlay' + i + '" style="position:absolute; right:0; top:0; width:' + i * 2 + 'px; height:100%; z-index:' + i + '; background-color: rgba(' + backgroundcolor + ',0.3);"/>');
            }
        }

    }
    _01_intervalHandle = setInterval(function () { _01_preloadImages() }, 50);
}

function _01_preloadImages() {
    var loaded = true;
    for (var i = 0; i < _01_images.length*2; i++)
        if (!$('#_01_imagesrc' + i).get(0).complete) loaded = false;
    if (loaded) {
        clearInterval(_01_intervalHandle);
        for (var i = 0; i < _01_images.length*2; i++) {
            _01_imageWidths[i] = $('#_01_imagesrc' + i).width();
            _01_imageHeights[i] = $('#_01_imagesrc' + i).height();
            //adapt image width and height to effect width or height
			var newwidth=0;
			var newheight=0;
            if (_01_verticalscrolling)
            {
				newwidth=_01_effectwidth;
				newheight=Math.floor(_01_imageHeights[i] * _01_effectwidth / _01_imageWidths[i]);
                $('#_01_imagesrc' + i).css('width', newwidth + 'px');
                $('#_01_imagesrc' + i).css('height',  newheight+ 'px');
                $('#_01_image' + i).css('width', newwidth+'px');
                $('#_01_image' + i).css('height', newheight + 'px');
            }
            else
            {
				newwidth=Math.floor(_01_imageWidths[i] * _01_effectheight / _01_imageHeights[i]);
				newheight=_01_effectheight;
                $('#_01_imagesrc' + i).css('width', newwidth + 'px');
                $('#_01_imagesrc' + i).css('height', newheight + 'px');
                $('#_01_image' + i).css('width', newwidth + 'px');
                $('#_01_image' + i).css('height', newheight + 'px');
            }
            if (i < _01_images.length)
            {
                _01_width +=newwidth;
                _01_height += newheight;
            }
            _01_totalwidth += newwidth;
            _01_totalheight += newheight;
        }
		if (_01_verticalscrolling) $('#_01_innerimageholder').css('height',_01_totalheight);
		else $('#_01_innerimageholder').css('width',_01_totalwidth);		
        _01_intervalHandle = setInterval(function () { _01_animate() }, _01_waitperiod);
    }
	_01_currentpos=0;
}


AppManagement.prototype.restartEffect = function()
{
    _01_currentpos = 0;
    if (_01_hasBeenInitialized)
	{
        clearInterval(_01_intervalHandle);
        $('#_01_innerimageholder').hide();
    }
	_01_init();
}

AppManagement.prototype.destroyEffect = function () {
    clearInterval(_01_intervalHandle);
    _01_currentpos = 0;
    $('#_01_innerimageholder').hide();
    $('#_01_animation').html('');
}

_01_clicked=function(n)
{
    window.open(_01_urls[n], _01_urltarget);
}

_01_mouseOver = function (e) {
    _01_mouseovercounter = _01_waitperiod;
    var posy = e.pageY - $('#_01_imageholder').offset().top;
    var posx = e.pageX - $('#_01_imageholder').offset().left;
    if (_01_verticalscrolling) _01_mouseoverscrollingspeed = (posy - _01_effectheight / 2) / 10.0;
    else _01_mouseoverscrollingspeed = (posx - _01_effectwidth / 2) / 10.0;
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
    if (_01_verticalscrolling) {
        if (_01_currentpos > _01_height + _01_effectheight)
            _01_currentpos -= _01_totalheight - _01_height;
        if (_01_currentpos < 0 && _01_mouseoverscrollingspeed < 0)
            _01_currentpos += _01_totalheight - _01_height;
        $('#_01_innerimageholder').css('top', (-_01_currentpos) + 'px');
    }
    else
    {
        if (_01_currentpos > _01_width + _01_effectwidth)
            _01_currentpos -= _01_totalwidth - _01_width;
        if (_01_currentpos < 0 && _01_mouseoverscrollingspeed < 0)
            _01_currentpos += _01_totalwidth - _01_width;
        $('#_01_innerimageholder').css('left', (-_01_currentpos) + 'px');

    }
}

function getRBGDecimal(hexcolor) {
    if (hexcolor.indexOf('#') > -1) hexcolor = hexcolor.substring(1);
    var r = Math.floor(parseInt(hexcolor.substring(0, 2), 16) );
    var g = Math.floor(parseInt(hexcolor.substring(2, 4), 16) );
    var b = Math.floor(parseInt(hexcolor.substring(4, 6), 16));
    return r+','+g+','+b;
}