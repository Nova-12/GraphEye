Ext.define('grapheye.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'grapheyedashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
	'grapheye.view.dashboard.Import',
	'grapheye.view.dashboard.Export',
	'grapheye.view.dashboard.Algorithms',
	'grapheye.view.dashboard.Visualize'
    ],

    controller: 'dashboard',

    layout: 'responsivecolumn',
    

    items: [
	{
	    xtype: 'container',
	    width: '100%',
	    layout:{
		type: 'hbox',
		pack: 'justify'
	    },
	    defaults:{
		flex: 1,
		bodypadding: 100
	    },
	    items: [
		{
		    xtype: 'mainimport'
		},
	    	{
		    xtype: 'mainexport'
		}
	    ]
	},
	{
	    xtype: 'mainalgorithms',
	    userCls: 'big-60 small-100'
	},
	{
	    xtype: 'mainvisualize',
	    userCls: 'big-60 small-100'
	},
	{
	    xtype: 'container',
	    width: 1000,
	    height: 500
	}
    ]
});
