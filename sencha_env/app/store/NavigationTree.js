Ext.define('grapheye.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    requires: [
	'grapheye.view.dashboard.Dashboard',
	'grapheye.view.resultsbrowser.Resultsbrowser'
    ],

    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                viewType: 'grapheyedashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Results Browser',
		iconCls: 'x-fa fa-folder-open',
		viewType: 'grapheyeresultsbrowser',
		routeId: 'resultsbrowser',
		leaf: true
	    }
        ]
    }
});
