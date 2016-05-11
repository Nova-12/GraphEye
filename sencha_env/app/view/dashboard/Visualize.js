Ext.define('grapheye.view.dashboard.Visualize', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainvisualize',
    
    requires: [
	'grapheye.view.dashboard.DashboardController',
	'Ext.tab.Panel'
    ],

    controller: 'dashboard',
    title: 'Charts',
    width: '100%',
    layout: {
	type: 'vbox',
	pack: 'justify'
    },
    closable: false,
    autoShow: true,
    tools:[
	{
	 xtype: 'button',
	 text: 'Run',
	 margin: '10 0',
	 handler: 'onRunClick'
	}
    ],
    items: [{
	region: 'center',
	width: '100%',
	xtype: 'tabpanel',
	reference: 'visualPanel',
	items:[
	]
    }]
});
  
