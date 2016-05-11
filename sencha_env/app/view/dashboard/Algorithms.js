Ext.define('grapheye.view.dashboard.Algorithms', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainalgorithms',
    requires: [
	'Ext.form.*',
	'grapheye.view.dashboard.DashboardController'
    ],

    controller: 'dashboard',
    bodyPadding: 10,
    width: '100%',
    layout:{
	type: 'vbox',
	pack: 'justify'
    },
    title: 'Select Algorithm',
    closable: false,
    autoShow: true,

    tools: [
	{
	    xtype: 'button',
	    text: 'Enter',
	    formBind: true,
	    handler: 'onAlgChoice'
		    //function(){
		    //console.log();
		    //console.log(Ext.ComponentQuery.query('fieldcontainer').down('[name=algorithm]'));
		    //grapheye.store.Request.algorithmName = Ext.getCmp('algorithmfield').getValue();
		    //console.log(grapheye.store.Request);
	    //}
	}
    ],

    items: {
        xtype: 'fieldcontainer',
	id: 'algorithmfield',
        reference: 'algorithmfield',
	defaultType: 'radiofield',
	defaults:{
	    flex: 2,
	    width: 200
	},
	layout: 'hbox',
        
        items: [{
	    boxLabel: 'PageRank',
            name: 'algorithm',
	    inputValue: 'pagerank',
            id: 'pagerank'
        }, {
	    boxLabel: 'TriangleCount',
	    name: 'algorithm',
	    inputValue: 'trianglecount',
	    id: 'trainglecount'
        }, {
	    boxLabel: 'ConnectedComponent',
	    name: 'algorithm',
	    inputValue: 'connectedcomponent',
	    id: 'connectedcomponent'
        }, {
	    boxLabel: 'LabelPropagation',
	    name: 'algorithm',
	    inputValue: 'labelpropagation',
	    id: 'labelpropagation'
        }]
    }
});
