var defaultValues = { name: "imagescroller1", effectwidth: 200, effectheight: 200, scrollingspeed: 2, backgroundcolor: "#ffffff", usesidefading: true, verticalscrolling: true, images0: "em_house.png", urls0: "http://www.effectmaker.com/clickpage.html", images1: "em_peacock.png", urls1: "http://www.effectmaker.com/clickpage.html", images2: "em_port_deepred.jpg", urls2: "http://www.effectmaker.com/clickpage.html", images3: "em_church3.png", urls3: "http://www.effectmaker.com/clickpage.html", urltarget: "_blank", waitperiod: 1000, maxscrollingspeed: 10, fps: 20 };
var configuration = new Array();
configuration[0] = new ConfiguratorItem(configurator.TEXTFIELD, 'name', 'General', 'Configuration save name', 'The name that will be used to save this configuration. Do not use space characters here.', false);
configuration[1] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectwidth', 'General', 'Effect Width', 'The width of the whole effect in pixels', true);
configuration[2] = new ConfiguratorItem(configurator.TEXTFIELD, 'effectheight', 'General', 'Effect Height', 'The height of the whole effect in pixels', true);
configuration[3] = new ConfiguratorItem(configurator.LIST, 'imagelist', ' Images', 'Images', 'All the image configuration fields', [
new ConfiguratorItem(configurator.FILEFIELD, 'images', '-', 'Image', 'Image link, could be relative or absolute'),
new ConfiguratorItem(configurator.TEXTFIELD, 'urls', '-', 'Url', 'Link for this image')]
);
configuration[4] = new ConfiguratorItem(configurator.TEXTFIELD, 'scrollingspeed', 'Scrolling', 'Scrolling Speed', 'The speed of the text.', true);
configuration[5] = new ConfiguratorItem(configurator.CHECKBOX, 'usesidefading', 'Other', 'Use side fading', 'The text will fade out at the top and bottom.');
configuration[6] = new ConfiguratorItem(configurator.CHECKBOX, 'verticalscrolling', 'Scrolling', 'Scroll vertically', 'Images will scroll vertically, uncheck for horizontal scrolling.');
configuration[7] = new ConfiguratorItem(configurator.COLORFIELD, 'backgroundcolor', 'Other', 'Background color', 'Used for the side fading effect, should be the background color of the page.');
configuration[8] = new ConfiguratorItem(configurator.TEXTFIELD, 'waitperiod', 'Scrolling', 'Wait period mouse over', 'A variable used for letting the scroller wait a while after the user manually browsed the text, before it starts to automatically scroll the text again.', true);
configuration[9] = new ConfiguratorItem(configurator.TEXTFIELD, 'maxscrollingspeed', 'Scrolling', 'Max scrolling speed', 'Maximum scrolling speed when the user is browsing the text.', true);
configuration[10] = new ConfiguratorItem(configurator.TEXTFIELD, 'fps', 'Scrolling', 'Frames per second', 'Frames per second for the effect.', true);
configuration[11] = new ConfiguratorItem(configurator.TEXTFIELD, 'urltarget', 'Other', 'URL target', 'The target for the URL, could be _self, _blank, etc. According to HTML specifications.', false);
