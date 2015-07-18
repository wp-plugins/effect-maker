var defaultValues = { name: "imagefader1", effectwidth: 200, effectheight: 200, images0: "em_batteries.png", urls0: "http://www.effectmaker.com/clickpage.html", images1: "em_bridge.png", urls1: "http://www.effectmaker.com/clickpage.html", images2: "em_church2.png", urls2: "http://www.effectmaker.com/clickpage.html", images3: "em_vina2.png", urls3: "http://www.effectmaker.com/clickpage.html", urltarget: "_self", restmaxcounter: 200, maxdrops:6, dropdissipation:100};
var configuration = new Array();
configuration[0] = new ConfiguratorItem(configurator.TEXTFIELD, 'name', 'General', 'Configuration save name', 'The name that will be used to save this configuration. Do not use space characters here.', false);
configuration[1] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectwidth', 'General', 'Effect Width', 'The width of the whole effect in pixels', true);
configuration[2] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectheight', 'General', 'Effect Height', 'The height of the whole effect in pixels', true);
configuration[3] = new ConfiguratorItem(configurator.LIST, 'imagelist', ' Images', 'Images', 'All the image configuration fields', [
new ConfiguratorItem(configurator.FILEFIELD, 'images', '-', 'Image', 'Image link, could be relative or absolute'),
new ConfiguratorItem(configurator.TEXTFIELD, 'urls', '-', 'Url', 'Link for this image')]
);
configuration[4] = new ConfiguratorItem(configurator.TEXTFIELD, 'urltarget', 'Other', 'URL target', 'The target for the URL, could be _self, _blank, etc. According to HTML specifications.', false);
configuration[5] = new ConfiguratorItem(configurator.TEXTFIELD, 'restmaxcounter', 'Other', 'Image pause', 'How long the image should pause before swapping to another. Use values between 0-1000', true);
configuration[6] = new ConfiguratorItem(configurator.TEXTFIELD, 'maxdrops', 'Other', 'Maximum drops', 'This indicates the maximum number of drops when not moving the mouse cursor across the image', true);
configuration[7] = new ConfiguratorItem(configurator.TEXTFIELD, 'dropdissipation', 'Other', 'Drop dissipation', 'The radius of the dissipation of the drop waves', true);
