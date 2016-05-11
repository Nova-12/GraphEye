Ext.define('grapheye.view.dashboard.Export', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainexport',

    requires: [
        'grapheye.view.main.MainController'
    ],

    cls: 'dashboard-export shadow',
    height: 170,
    width: 484,
    bodyPadding: 15,
    title: 'Export',

    layout: {
	type: 'vbox',
	align: 'stretch'
    },

    tools:[
	{
	    xtype: 'button',
	    text: 'Enter',
	    formBind: true,
	    handler: function(){
		grapheye.store.Request.title = Ext.getCmp('exporttitle').getValue();
		console.log(grapheye.store.Request);
	    }
	}
    ],

    items: [
	{
	    xtype: 'textfield',
	    fieldLabel: 'Enter export destination',
	    id: 'exporttitle'
	}
    ]
});
