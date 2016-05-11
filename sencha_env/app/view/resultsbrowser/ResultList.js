Ext.define('grapheye.view.resultsbrowser.ResultList', {
    extend: 'Ext.panel.Panel',
    xtype: 'rbresultlist',
    requires: [
        'grapheye.view.resultsbrowser.ResultsbrowserController',
	'Ext.form.*'
    ],
    controller: 'resultsbrowser',
    cls: 'resultsbrowser-resultlist shadow',
    bodyPadding: 15,
    title: 'Result List',
    width: '100%',
    layout: {
	type: 'vbox',
	pack: 'justify',
	align: 'stretch'
    },

    tools: [
	{
	    xtype: 'button',
	    text: 'Refresh',
	    handler: 'onRefresh'
	}
    ],

    initialize: 'onInit',

    items: [
        {
	    xtype: 'container',
      	    layout:{
	        type: 'vbox'
	    },
    	    reference: 'rbresultlist',
	    items: [
	    ]
	}
    ]
});

