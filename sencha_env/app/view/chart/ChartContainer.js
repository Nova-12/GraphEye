Ext.define('grapheye.view.chart.ChartContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'chartcontainer',
    requires: [
        'grapheye.view.chart.ChartController',
	'Ext.form.*'
    ],
    controller: 'chart',
    cls: 'chart-chartcontainer shadow',
    bodyPadding: 15,
    width: '100%',
    layout: {
	type: 'vbox',
	pack: 'justify',
	align: 'stretch'
    },

    resultData: '',

    charType: '',

    tools: [
	{
	    xtype: 'textfield',
	    id: 'nodeNum',
	    allowBlank: true,
	    width : 170,
	    fieldLabel: 'Number of nodes '
	},
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
    	    reference: 'chartbox',
	    items: [
	    ]
	}
    ]
});

