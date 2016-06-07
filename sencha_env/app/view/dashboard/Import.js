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
	    xtype: 'fieldcontainer',
		id: 'sourcetypefield',
	    reference: 'sourcetypefield',
		defaultType: 'radiofield',
		
		defaults:{
		    flex: 2,
		    width: 200
		},
	
		layout: 'hbox',

		items: [{
	    boxLabel: 'TextFile',
	    name: 'sourcetype',
	    inputValue: 'text',
	    id: 'textfilesource'
	    }, {
	    boxLabel: 'MySQL',
	    name: 'sourcetype',
	    inputValue: 'mysql',
	    id: 'mysqlsource'
	    }, {
	    boxLabel: 'MongoDB',
	    name: 'sourcetype',
	    inputValue: 'mongodb',
	    id: 'mongodbsource'
	    }]
	},  {
	    xtype: 'textfield',
	    id: 'edgefilepath',
	    fieldLabel: 'Edgefile Path',
	    allowBlank: false
	},  {
	    xtype: 'textfield',
	    id: 'nodefilepath',
	    fieldLabel: 'Nodefile Path',
	    allowBlank: false
	},	{	
	    xtype: 'textfield',
	    id: 'collectiondate',
	    fieldLabel: 'Date',
	    allowBlank: true
	}
	]
});
