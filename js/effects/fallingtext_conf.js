﻿var defaultValues = {
    name: "fallingtext1", effectwidth: 500, effectheight: 200, effectspeed: 10, font: "Verdana", fontstyle: "bold", fontsize: "18", textalignment: 1, textcolor: "#af0000", texts0: "This is fallingtext", urls0: "http://www.effectmaker.com/clickpage.html", texts1: "Let your message fall in line", urls1: "http://www.effectmaker.com/clickpage.html", texts2: "Supports text alignment", urls2: "http://www.effectmaker.com/clickpage.html", texts3: "and customization of fonts", urls3: "http://www.effectmaker.com/clickpage.html",
    urltarget: "_self", restmaxcounter: 50,
    fallinginletterdistance: 7, fallingoutletterdistance: 7, fallinginletterbehavior: -20, fallingoutletterbehavior: -20
};
var configuration = new Array();
configuration[0] = new ConfiguratorItem(configurator.TEXTFIELD, 'name', 'General', 'Configuration save name', 'The name that will be used to save this configuration. Do not use space characters here.', false);
configuration[1] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectwidth', 'General', 'Effect Width', 'The width of the whole effect in pixels', true);
configuration[2] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectheight', 'General', 'Effect Height', 'The height of the whole effect in pixels', true);
configuration[3] = new ConfiguratorItem(configurator.LIST, 'textlist', ' Texts', 'Texts', 'The configuration of the texts', [
new ConfiguratorItem(configurator.TEXTAREA, 'texts', '-', 'Text', 'The text for this item.'),
new ConfiguratorItem(configurator.TEXTFIELD, 'urls', '-', 'Url', 'Link for this text')]
);
configuration[4] = new ConfiguratorItem(configurator.FONTFIELD, 'font', 'Font', 'Font', 'Fonts to use with the text, select safe fonts or write the name of a custom font.  Clear the field to see a dropdown of web safe fonts to use.');
configuration[5] = new ConfiguratorItem(configurator.CHOICEFIELD, 'fontstyle', 'Font', 'Font style', 'The style of the font: normal, bold, italic, oblique.', false, new Array('normal', 'bold', 'italic', 'oblique'));
configuration[6] = new ConfiguratorItem(configurator.TEXTFIELD, 'fontsize', 'Font', 'Font size', 'Size of the text font', true);
configuration[7] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectspeed', 'Other', 'Effect Speed', 'Speed when the text is falling in and out', true);
configuration[8] = new ConfiguratorItem(configurator.TEXTFIELD, 'urltarget', 'Other', 'URL target', 'The target for the URL, could be _self, _blank, etc. According to HTML specifications.', false);
configuration[9] = new ConfiguratorItem(configurator.TEXTFIELD, 'restmaxcounter', 'Other', 'Image pause', 'How long the text should pause before swapping to another. Use values between 0-1000', true);
configuration[10] = new ConfiguratorItem(configurator.CHOICEFIELD, 'textalignment', 'Font', 'Text alignment', 'The alignment of the text.', true, new Array('left', 'center', 'right'));
configuration[11] = new ConfiguratorItem(configurator.COLORFIELD, 'textcolor', 'Font', 'Text Color', 'The color of the text.');
configuration[12] = new ConfiguratorItem(configurator.TEXTFIELD, 'fallinginletterdistance', 'Other', 'Falling in letter distance', 'The distance between the letters when they are falling in. Use values between 0-7', true);
configuration[13] = new ConfiguratorItem(configurator.TEXTFIELD, 'fallingoutletterdistance', 'Other', 'Falling out letter distance', 'The distance between the letters when they are falling out. Use values between 0-7', true);
configuration[14] = new ConfiguratorItem(configurator.TEXTFIELD, 'fallinginletterbehavior', 'Other', 'Falling in letter behaviour', 'The curvature of the falling in movement. Use values between -40 to 40. 0 to turn off.', true);
configuration[15] = new ConfiguratorItem(configurator.TEXTFIELD, 'fallingoutletterbehavior', 'Other', 'Falling out letter behaviour', 'The curvature of the falling out movement. Use values between -40 to 40. 0 to turn off.', true);
