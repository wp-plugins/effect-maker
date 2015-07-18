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
var _01_fadeOutCompleted = false;
var _01_imagePixels = new Array();
var _01_drops=new Array();
var _01_dropMatrix=new Array();
var _01_dropMatrixReduction=new Array();
var _01_waveForm=new Array();
var _01_createDrop=null;
var _01_lastMovement=new Date().getTime();
var _01_transitionSplash=null;
var _01_nextItem=1;
var _01_canvasData=null;
var _01_ctx=null;

_01_init = function () {
	_01_hasBeenInitialized=true;
	$('#_01_animation').html('');
    //set the width of the effect based on the assigned window's width
	$('#_01_animation').css('width', _01_effectwidth);
	$('#_01_animation').css('height', _01_effectheight);
	$('#_01_animation').append('<div id="_01_imageholder" style="position:relative; visible:hidden; overflow:hidden; width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px"></div>');
	$('#_01_imageholder').append('<canvas id="_01_canvas" style="width:' + _01_effectwidth + 'px; height:' + _01_effectheight + 'px" onClick="_01_clicked()"></canvas>');

    for (var i = 0; i < _01_images.length; i++) 
	{
        if (_01_images[i] != null && _01_images[i]!=undefined) 
        {
            _01_images[i] = _01_images[i].trim();
            $('#_01_imageholder').append('<div id="_01_image' + i + '" style="position:absolute; cursor:pointer; " onClick="_01_clicked()"> <img id="_01_imagesrc' + i + '" src="'+_01_images[i]+'"/> </div>');
            if (_01_urls[i] != null && _01_urls[i] != undefined) _01_urls[i] = _01_urls[i].trim();
        	else _01_urls[i] = null;
    	}
	}

	var waveLength=20;
	for (var i=waveLength; i>=0; i--)
	{
		var alpha=(waveLength-i)/waveLength*5*Math.PI;
		_01_waveForm[i]=Math.sin(alpha+Math.PI)/(alpha/4+1);
	}
	_01_resetDrops();
	
	$('#_01_animation').mousemove(function (e) {
	    var x = e.pageX - $('#_01_animation').offset().left;
	    var y = e.pageY - $('#_01_animation').offset().top;
		if (new Date().getTime()-_01_lastMovement>200)
		{
			_01_createDrop=new Array(x,y);
			_01_lastMovement=new Date().getTime();
		}
	});
	_01_createDrop=null;
	_01_lastMovement=new Date().getTime();
	_01_transitionSplash=null;
	_01_currentItem=0;
	_01_nextItem=1;
	_01_restCounter=_01_restmaxcounter;
	var c=document.getElementById('_01_canvas');
	c.width=_01_effectwidth;
	c.height=_01_effectheight;
	_01_ctx = c.getContext('2d');
	_01_canvasData=_01_ctx.getImageData(0, 0, c.width, c.height);

	
	_01_intervalHandle=setInterval(function () { _01_preloadImages() }, 25);
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
		    _01_imagePixels[i] = _01_getPixels(document.getElementById("_01_imagesrc"+i));
		    $('#_01_image' + i).hide();
        }
		_01_intervalHandle=setInterval(function () { _01_animate() }, 50);
	}

}

AppManagement.prototype.restartEffect = function()
{
    clearInterval(_01_intervalHandle);
	if (_01_hasBeenInitialized)
	{
		_01_createDrop=null;
		_01_lastMovement=new Date().getTime();
		_01_transitionSplash=null;
		_01_currentItem=0;
		_01_nextItem=1;
		_01_restCounter=_01_restmaxcounter;
	    _01_intervalHandle = setInterval(function () { _01_animate() }, 50);
    }
	else
	{
		_01_init();
	}
}

AppManagement.prototype.destroyEffect = function () {
    clearInterval(_01_intervalHandle);
    _01_hasBeenInitialized = false;
    $('#_01_animation').html('');
}

_01_clicked=function()
{
    window.open(_01_urls[_01_currentItem], _01_urltarget);
}

function _01_resetDrops()
{
	for (var i=0; i<_01_effectwidth*_01_effectheight; i++)
	{
		_01_dropMatrix[i]=0;
		_01_dropMatrixReduction[i]=0;
	}
	_01_drops=new Array();
}

function _01_animate() {
	var waveForm=_01_waveForm;
    //Manage fading
    if (_01_restCounter > 0)
    {
        _01_restCounter--;
		if (_01_restCounter==0) 
		{
			if (_01_images.length>1)
			{
		    	_01_transitionSplash={x : Math.floor(_01_effectwidth/2.0)
					,y : Math.floor(_01_effectheight/2.0)
					,r:0};
			}
		}
    }
	if (_01_drops.length<_01_maxdrops && Math.random()>0.9)
	{
		_01_drops.push({x : Math.floor(_01_effectwidth*Math.random())
			,y : Math.floor(_01_effectheight*Math.random())
			,r:0});
	}
	if (_01_createDrop!=null) 
	{
		_01_drops.push({x : _01_createDrop[0]
			,y : _01_createDrop[1]
			,r:0});
		_01_createDrop=null;
	}
	for (var i=0; i<_01_drops.length; i++)
	{
		var drop=_01_drops[i];
		drop.r=drop.r+1;
		_01_drawCircle(drop.x, drop.y, drop.r, waveForm.length-1,Math.max((_01_dropdissipation-drop.r)/_01_dropdissipation,0));
		//_01_drawCircle2( drop.x, drop.y, drop.r-1, drop.r, waveForm.length-1,Math.max((_01_dropdissipation-drop.r)/_01_dropdissipation,0));
	}
	if (_01_transitionSplash!=null) 
	{
		_01_transitionSplash.r=_01_transitionSplash.r+1;
		_01_drawCircle(_01_transitionSplash.x, _01_transitionSplash.y, _01_transitionSplash.r, waveForm.length-1,1);
		//_01_drawCircle2( _01_transitionSplash.x, _01_transitionSplash.y, _01_transitionSplash.r-1, _01_transitionSplash.r, waveForm.length-1,1);
	}
	var dpv=0
	var index=0;
	var totalbuffer=_01_effectwidth*_01_effectheight-1-_01_effectwidth;
	var dropMatrixTemp=_01_dropMatrix;
	var dropMatrixReductionTemp=_01_dropMatrixReduction;
	var imagePixelsData=_01_imagePixels[_01_currentItem].data;
	var imagePixelsDataNext=null;
	if (_01_images.length>1) imagePixelsDataNext=_01_imagePixels[_01_nextItem].data;
	var dropMatrixIndex=0;
	var canvasData=_01_canvasData;
	canvasData.data[0] =imagePixelsData[0];
	canvasData.data[1]=imagePixelsData[1];
	canvasData.data[2]=imagePixelsData[2];
	canvasData.data[3]=imagePixelsData[3];
	var dpvm=new Array();
	var nextImageData=false;
	var w=_01_effectwidth;
	var h=_01_effectheight;
	var x=0, y=0, d=0;
	for (var i=totalbuffer; i>0; i--)
	{
		index=i*4;
		dropMatrixIndex=dropMatrixTemp[i];
		if (_01_transitionSplash!=null) 
		{
			x=i%w-w/2;
			y=Math.floor(i/w)-h/2;
			x=x*x;
			y=y*y;
			d=_01_transitionSplash.r*_01_transitionSplash.r;
			nextImageData=x+y<d;
		}
		if (nextImageData)
		{
			if (dropMatrixIndex>0)
			{
				dpv=Math.floor(200*(-waveForm[dropMatrixIndex]+waveForm[dropMatrixTemp[i-1-w]])*dropMatrixReductionTemp[i]);
				canvasData.data[index]  =Math.min(Math.max(imagePixelsDataNext[index]  +dpv,0),255);
				canvasData.data[index+1]=Math.min(Math.max(imagePixelsDataNext[index+1]+dpv,0),255);
				canvasData.data[index+2]=Math.min(Math.max(imagePixelsDataNext[index+2]+dpv,0),255);
				canvasData.data[index+3]=imagePixelsDataNext[index+3];
				dropMatrixTemp[i]--;
			}
			else
			{
				canvasData.data[index]  =imagePixelsDataNext[index];
				canvasData.data[index+1]=imagePixelsDataNext[index+1];
				canvasData.data[index+2]=imagePixelsDataNext[index+2];
				canvasData.data[index+3]=imagePixelsDataNext[index+3];
			}
		}
		else
		{
			if (dropMatrixIndex>0)
			{
				dpv=Math.floor(200*(-waveForm[dropMatrixIndex]+waveForm[dropMatrixTemp[i-1-w]])*dropMatrixReductionTemp[i]);
				canvasData.data[index]  =Math.min(Math.max(imagePixelsData[index]  +dpv,0),255);
				canvasData.data[index+1]=Math.min(Math.max(imagePixelsData[index+1]+dpv,0),255);
				canvasData.data[index+2]=Math.min(Math.max(imagePixelsData[index+2]+dpv,0),255);
				canvasData.data[index+3]=imagePixelsData[index+3];
				dropMatrixTemp[i]--;
			}
			else
			{
				canvasData.data[index]  =imagePixelsData[index];
				canvasData.data[index+1]=imagePixelsData[index+1];
				canvasData.data[index+2]=imagePixelsData[index+2];
				canvasData.data[index+3]=imagePixelsData[index+3];
			}
		}
	}
	_01_ctx.putImageData(canvasData,0,0);
	if (_01_drops.length>0 && _01_drops[0].r>_01_dropdissipation) _01_drops.splice(0,1);
	if (_01_transitionSplash!=null && _01_transitionSplash.r>_01_effectheight && _01_transitionSplash.r>_01_effectwidth)
	{
		_01_transitionSplash=null;
		_01_restCounter=_01_restmaxcounter;
		_01_currentItem++;
		if  (_01_currentItem>_01_images.length-1) _01_currentItem=0;
		_01_nextItem++;
		if  (_01_nextItem>_01_images.length-1) _01_nextItem=0;
	}
}

function _01_getPixels(img) {
    var c = document.createElement('canvas');
    c.width=_01_effectwidth;
    c.height=_01_effectheight;
    var ctx = c.getContext('2d');
	var x=(_01_effectwidth-img.width)/2;
	var y=(_01_effectheight-img.height)/2;
    ctx.drawImage(img,x,y,img.width,img.height);
    return ctx.getImageData(0, 0, c.width, c.height);
};

function _01_drawCircle(x0, y0, radius, value1, value2){
  var x = radius;
  var y = 0;
  var radiusError = 1-x;
  var w=_01_effectwidth;
  var h=_01_effectheight;
  var yind=0, xyind=0, yindneg=0,xyindneg=0;
  while(x >= y)
  {
		
    _01_drawPixel(x + x0, y + y0,w,h,value1, value2);
    _01_drawPixel(y + x0, x + y0,w,h,value1, value2);
    _01_drawPixel(-x + x0, y + y0,w,h,value1, value2);
    _01_drawPixel(-y + x0, x + y0,w,h,value1, value2);
    _01_drawPixel(-x + x0, -y + y0,w,h,value1, value2);
    _01_drawPixel(-y + x0, -x + y0,w,h,value1, value2);
    _01_drawPixel(x + x0, -y + y0,w,h,value1, value2);
    _01_drawPixel(y + x0, -x + y0,w,h,value1, value2);
    y++;
    if (radiusError<0)
    {
      radiusError += 2 * y + 1;
    }
    else
    {
      x--;
      radiusError += 2 * (y - x + 1);
    }
  }
};

function _01_xLine(x1, x2, y, w,h, value1, value2)
{
    while (x1 <= x2) _01_drawPixel2(x1++, y, w,h, value1, value2);
}

function _01_yLine(x, y1, y2, w,h, value1, value2)
{
    while (y1 <= y2) _01_drawPixel2(x, y1++, w,h, value1, value2);
}

function _01_drawCircle2( xc, yc, inner, outer, value1, value2)
{
    var xo = outer;
    var xi = inner;
    var y = 0;
    var erro = 1 - xo;
    var erri = 1 - xi;
  	var w=_01_effectwidth;
  	var h=_01_effectheight;

    while(xo >= y) {
        _01_xLine(xc + xi, xc + xo, yc + y,  w,h, value1, value2);
        _01_yLine(xc + y,  yc + xi, yc + xo, w,h, value1, value2);
        _01_xLine(xc - xo, xc - xi, yc + y,  w,h, value1, value2);
        _01_yLine(xc - y,  yc + xi, yc + xo, w,h, value1, value2);
        _01_xLine(xc - xo, xc - xi, yc - y,  w,h, value1, value2);
        _01_yLine(xc - y,  yc - xo, yc - xi, w,h, value1, value2);
        _01_xLine(xc + xi, xc + xo, yc - y,  w,h, value1, value2);
        _01_yLine(xc + y,  yc - xo, yc - xi, w,h, value1, value2);

        y++;

        if (erro < 0) {
            erro += 2 * y + 1;
        } else {
            xo--;
            erro += 2 * (y - xo + 1);
        }

        if (y > inner) {
            xi = y;
        } else {
            if (erri < 0) {
                erri += 2 * y + 1;
            } else {
                xi--;
                erri += 2 * (y - xi + 1);
            }
        }
    }
}

function _01_drawPixel2(x,y,w,h,value1, value2)
{
    if (x >= 0 && y >= 0 && x < w-1 && y < h) {
		var ind=x + y * w;
        _01_dropMatrix[ind] = value1;
        _01_dropMatrixReduction[ind] = value2;
    }
}

function _01_drawPixel(x,y,w,h,value1, value2)
{
    if (x >= 0 && y >= 0 && x < w-1 && y < h) {
		var ind=x + y * w;
//		var ind2=x+(y+1)*w;
        _01_dropMatrix[ind] = value1;
        _01_dropMatrix[ind+1] = value1;
 //       _01_dropMatrix[ind2] = value1;
        _01_dropMatrixReduction[ind] = value2;
        _01_dropMatrixReduction[ind+1] = value2;
 //       _01_dropMatrixReduction[ind2] = value2;
    }
}