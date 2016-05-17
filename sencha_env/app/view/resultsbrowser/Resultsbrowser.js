Ext.define('grapheye.view.resultsbrowser.Resultsbrowser', {
    extend: 'Ext.container.Container',
    xtype: 'grapheyeresultsbrowser',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
	'grapheye.view.resultsbrowser.ResultList',
	'grapheye.view.resultsbrowser.ResultsbrowserController'
    ],

    controller: 'resultsbrowser',

    layout: 'responsivecolumn',

    items: [
	{
	    xtype: 'rbresultlist',
	    title: 'Result List'
	},
	{
	    region: 'center',
	    xtype: 'panel',
	    reference: 'rbCharts',
	    items:[
	    ]
	},
	{
	    xtype: 'button',
	    handler: 'onCompare'
	},
	{
	    xtype: 'container',
	    width: '100%',
	    reference: 'linePanel',
	    items:[
	    ]
	},
	{
	    xtype: 'container',
	    width: 1000,
	    height: 500,
	    userCls: 'big-60 small-100'
	}
    ]
});
