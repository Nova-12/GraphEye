Ext.define('grapheye.view.resultsbrowser.ResultList', {
    extend: 'Ext.grid.Panel',
    xtype: 'rbresultlist',
    reference: 'rbresultlist',
    requires: [
        'grapheye.view.resultsbrowser.ResultsbrowserController',
	'Ext.form.*'
    ],
    controller: 'resultsbrowser',
    cls: 'resultsbrowser-resultlist shadow',
    bodyPadding: 15,
    width: '100%',
    collapsible: true,
    title: 'Results <i>(0 items selected)</i>',

    store: new Ext.data.Store({
	    autoLoad: true,
	    proxy :{
		type: 'ajax',
    		url: 'api/list',
    		reader: {
		    type: 'json',
    		    rootProperty: 'jobs'
	    	}
    	    }
    }),
    multiSelect: true,
    viewConfig: {
	emptyText: 'No results to display'
    },

    columns: [{
	text: 'Name',
	flex: 50,
	dataIndex: 'title'
    },
    {
	xtype: 'datecolumn',
	format: 'm-d h:i a',
	text: 'Date',
	flex: 30,
	dataIndex: 'date'
    },
    {
	text: 'Algorithm',
	flex: 40,
	dataIndex: 'algorithm'
    },
    {
	text: 'Group',
	flex: 30,
	dataIndex: 'group'
    }],
/*
    layout: {
	type: 'vbox',
	pack: 'justify',
	align: 'stretch'
    },
*/
    tools: [
	{
	    type: 'refresh',
	    handler: 'onRefresh'
	},
    	{
	    xtype: 'panel',
	    width: 10
	},
	{
	    xtype: 'button',
	    text: 'Chart',
	    handler: 'showChart'
	},
	{
	    xtype: 'button',
	    text: 'Compare',
	    handler: 'compareResults'
	},
    {
        xtype: 'button',
        text: 'Topology',
        handler: 'showTopology'
    }
    ]
/*
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
    */
});

