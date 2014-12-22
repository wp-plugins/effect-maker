var defaultValues = {
    name: "rotatinggallery1", effectwidth: 500, effectheight: 200, rotatespeed: 2,
    images0: "em_flower2.png", urls0: "http://www.effectmaker.com/clickpage.html",
    images1: "em_flower3.png", urls1: "http://www.effectmaker.com/clickpage.html",
    images2: "em_flower4.png", urls2: "http://www.effectmaker.com/clickpage.html",
    images3: "em_flower5.png", urls3: "http://www.effectmaker.com/clickpage.html",
    images4: "em_house.png", urls4: "http://www.effectmaker.com/clickpage.html",
    images5: "em_peacock.png", urls5: "http://www.effectmaker.com/clickpage.html",
    images6: "em_rocks.png", urls6: "http://www.effectmaker.com/clickpage.html",
    images7: "em_sea.png", urls7: "http://www.effectmaker.com/clickpage.html",
    images8: "em_statue2.png", urls8: "http://www.effectmaker.com/clickpage.html",
    urltarget: "_blank", restmaxcounter: 100, maximagesize: 110, minimagesize: 70, galleryradius: 200,
    font: "Verdana", fontstyle: "bold", fontsize: 24, textcolor: "#00007f", text: "Effect Maker",
    clickmode: 0, imagebackmode: 0, gallerytilt: 30, nonscrollingarea:100, selfmovementdirection:0, selfmovement:true, selfmovementpause:500
};
var configuration = new Array();
configuration[0] = new ConfiguratorItem(configurator.TEXTFIELD, 'name', 'General', 'Configuration save name', 'The name that will be used to save this configuration. Do not use space characters here.', false);
configuration[1] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectwidth', 'General', 'Effect Width', 'The width of the whole effect in pixels', true);
configuration[2] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectheight', 'General', 'Effect Height', 'The height of the whole effect in pixels', true);
configuration[3] = new ConfiguratorItem(configurator.LIST, 'imagelist', ' Images', 'Images', 'All the image configuration fields', [
new ConfiguratorItem(configurator.FILEFIELD, 'images', '-', 'Image', 'Image link, could be relative or absolute'),
new ConfiguratorItem(configurator.TEXTFIELD, 'urls', '-', 'Url', 'Link for this image')]
);
configuration[4] = new ConfiguratorItem(configurator.TEXTFIELD, 'maximagesize', 'Gallery Parameters', 'Max image size', 'The maximum image size (both width and height) when the images are at the front of the gallery, the images will maintain their aspect ratio though.', true);
configuration[5] = new ConfiguratorItem(configurator.TEXTFIELD, 'minimagesize', 'Gallery Parameters', 'Minimum image size', 'The minimum image size (both width and height) when the images are at the back of the gallery, the images will maintain their aspect ratio though.', true);
configuration[6] = new ConfiguratorItem(configurator.TEXTFIELD, 'galleryradius', 'Gallery Parameters', 'Gallery Radius', 'The gallery radius in pixels.', true);
configuration[7] = new ConfiguratorItem(configurator.TEXTFIELD, 'rotatespeed', 'Gallery Parameters', 'Rotating Speed', 'Speed for the gallery rotation', true);
configuration[8] = new ConfiguratorItem(configurator.TEXTFIELD, 'urltarget', 'Other', 'URL target', 'The target for the URL, could be _self, _blank, etc. According to HTML specifications.', false);
configuration[9] = new ConfiguratorItem(configurator.TEXTFIELD, 'restmaxcounter', 'Other', 'Image pause', 'How long the image should pause before moving back in line when clicking on it. Use values between 0-1000', true);
configuration[10] = new ConfiguratorItem(configurator.FONTFIELD, 'font', 'Text', 'Font', 'Fonts to use with the text, select safe fonts or write the name of a custom font.  Clear the field to see a dropdown of web safe fonts to use.');
configuration[11] = new ConfiguratorItem(configurator.CHOICEFIELD, 'fontstyle', 'Text', 'Font style', 'The style of the font: normal, bold, italic, oblique.', false, new Array('normal', 'bold', 'italic', 'oblique'));
configuration[12] = new ConfiguratorItem(configurator.TEXTFIELD, 'fontsize', 'Text', 'Font size', 'Size of the text font.', true);
configuration[13] = new ConfiguratorItem(configurator.COLORFIELD, 'textcolor', 'Text', 'Text Color', 'The color of the text.');
configuration[14] = new ConfiguratorItem(configurator.TEXTFIELD, 'text', 'Text', 'Text', 'The text in the center of the image, leave empty to disable.', false);
configuration[15] = new ConfiguratorItem(configurator.CHOICEFIELD, 'clickmode', 'Modes', 'Clicking mode', 'The type of clicking action: zoom in and then click to invoke URL or invoke when first clicking on an image.', true, new Array('Zoom in and then click to invoke URL', 'invoke URL when first clicking on images'));
configuration[16] = new ConfiguratorItem(configurator.CHOICEFIELD, 'imagebackmode', 'Modes', 'Image backside type', 'The back side of the images', true, new Array('Opaque back', 'Half transparency'));
configuration[17] = new ConfiguratorItem(configurator.TEXTFIELD, 'gallerytilt', 'Modes', 'Gallery tilting', 'The gallery tilting in degrees, use values between -45 to 45', true);
configuration[18] = new ConfiguratorItem(configurator.TEXTFIELD, 'nonscrollingarea', 'Other', 'Non scrolling area', 'The area in the center of the effect where no scrolling will be done on the gallery (in pixels).', true);
configuration[19] = new ConfiguratorItem(configurator.CHOICEFIELD, 'selfmovementdirection', 'Other', 'Self movement direction', 'The direction of the gallery when moving by itself', true, new Array('Left', 'Disable', 'Right'));
configuration[20] = new ConfiguratorItem(configurator.TEXTFIELD, 'selfmovementpause', 'Other', 'Self Movement Timer', 'The time it takes before the gallery starts moving by itself. Use values between 200-1000.', true);
