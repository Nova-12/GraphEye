Ext.define('grapheye.view.dashboard.Import', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainimport',

    requires: [
        'grapheye.view.dashboard.DashboardController',
	'Ext.form.*'
    ],
    controller: 'dashboard',
    cls: 'dashboard-import shadow',
    height: 210,
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
	    xtype: 'textfield',
	    id: 'edgefilepath',
	    fieldLabel: 'Edgefile Path',
	    allowBlank: false
	},
        {
	    xtype: 'textfield',
	    id: 'nodefilepath',
	    fieldLabel: 'Nodefile Path',
	    allowBlank: true
	},
	{	
	    xtype: 'textfield',
	    id: 'collectiondate',
	    fieldLabel: 'Date',
	    allowBlank: true
	}
    ]
});
