Ext.define('grapheye.view.dashboard.Import', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainimport',

    requires: [
        'grapheye.view.dashboard.DashboardController',
	'Ext.form.*'
    ],
    controller: 'dashboard',
    cls: 'dashboard-import shadow',
    height: 170,
    width: 484,
    bodyPadding: 15,
    title: 'Import',
    
    layout: {
	type: 'vbox',
	align: 'stretch'
    },

    tools: [
	{
	    xtype: 'button',
	    text: 'Enter',
	    formBind: true,
	    handler: 'onImport' 
	}
    ],

    items: [
	{
	    xtype: 'filefield',
	    id: 'edgefilepath',
	    fieldLabel: 'Edgefile Path',
	    allowBlank: false
	},
        {
	    xtype: 'filefield',
	    id: 'nodefilepath',
	    fieldLabel: 'Nodefile Path',
	    allowBlank: true
	}
    ]
});
