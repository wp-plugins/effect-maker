'use strict';

var EffectMaker=null;
var AM = null;
var ER = null;
var $=jQuery;

jQuery(document).ready(function ($) {
    EffectMaker = new EffectMakerConfiguration();

    EffectMaker.init(EM_environment); //Sharepoint mode
    if (runnerMode) {
        AM = new AppManagement();
        ER = new EffectRunner(EffectMaker.getCurrentConfiguration());
    }
    else {
        AM = new AppManagement(EffectMaker.getClientContext(), runnerMode);
        AM.init('#initmessage', '#mainscreen');
    }
});
