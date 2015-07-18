/*
 * Copyright (c) 2014-2015 Anibal Wainstein, Mandomartis
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

function AppManagement() {

};


loadConfiguration = function (configurationName) {
	$=jQuery;
	$(".effectmaker_icon").hide();
	name = configurationName;
	document.writeln('<div id="'+name+'_animation"></div>');
	effectName = em_userconfs[name].effectname;
	configuration = em_userconfs[name].configuration;
	parameters = null;
	var securedparams = secure(decodeURIComponent(configuration));
	eval('parameters={' + securedparams + '};');
	configuration2 = '';
	var name = parameters['name'];
	var arraystocreate = null;
	if (parameters['em_containsarrays'])
	{
		arraystocreate = parameters['em_containsarrays'].split(';');
		for (var i=0; i<arraystocreate.length; i++)
		{
			configuration2 += name + '_' + arraystocreate[i] + '= new Array();'
		}
	}
	for (var key in parameters) {
		if (typeof parameters[key] == 'string') {
			if (parameters[key].indexOf('em_') > -1) parameters[key] = defaultImageFolder + parameters[key];
			else if (parameters[key].length > 4 && parameters[key].charAt(parameters[key].length - 4) == '.') parameters[key] = userImageFolder + parameters[key];
			if (key.match(/\d+$/) && arraystocreate != null) {
				for (var i=0; i<arraystocreate.length; i++)
				{
					if (key.indexOf(arraystocreate[i])==0) 
					{
						configuration2 += name + '_' + arraystocreate[i] + '['+key.substring(arraystocreate[i].length)+'] = "' + parameters[key] + '";';
					}
				}
			}
			else configuration2 += name + '_' + key + ' = "' + parameters[key] + '";';
		}
		else {
			if (key.match(/\d+$/) && arraystocreate != null) {
				for (var i = 0; i < arraystocreate.length; i++) {
					if (key.indexOf(arraystocreate[i]) == 0) {
						configuration2 += name + '_' + arraystocreate[i] + '[' + key.substring(arraystocreate[i].length) + '] = ' + parameters[key] + ';';
					}
				}

			}
			else configuration2 += name + '_' + key + ' = ' + parameters[key] + ';';
		}
	}
	if (configuration2 != null) {
		eval(configuration2);
		applyEvaluateInstance(effectName, configurationName);
	}
	else {
		jQuery('#'+name+'animation').html('Effect Configuration "' + configurationName + '" not found. Make sure you have this configuration in your Effect Maker configuration list (in the gallery), you may have deleted it.');
	}
};

applyInstance = function (content, instanceName) {
	content = content.replace(new RegExp('_01_', 'g'), instanceName + '_');
	content = content.replace(new RegExp('&amp;', 'g'), '&');
	content = content.replace(new RegExp('&lt;', 'g'), '<');
	return content.replace(new RegExp('&gt;', 'g'), '>');
};

applyEvaluateInstance = function (effectName, instanceName) {

	jQuery.get(effectFolder + effectName + '.js', function (data) {
		var instanced = applyInstance(data, instanceName);
		eval(instanced);
		AppManagement.prototype.restartEffect();
	}, 'text');

};

function secure(s) {
	var carriagereturn = String.fromCharCode(13);
	var linefeed = String.fromCharCode(10);
	var singlequote = String.fromCharCode(39);
	var doublequote = String.fromCharCode(34);
	var backslash = String.fromCharCode(92);
	s = s.replace(new RegExp(doublequote, 'g'), '&quot;');
	s = s.replace(new RegExp(singlequote, 'g'), '&apos;');
	s = s.replace(new RegExp(': &quot;', 'g'), ': "');
	s = s.replace(new RegExp('&quot;,', 'g'), '",');
	if (s.indexOf('&quot;', s.length - 6) !== -1) s = s.substring(0, s.length - 6) + '"';
	//for security reasons, converts all ' and " to HTML equivalent
	return s;
};
