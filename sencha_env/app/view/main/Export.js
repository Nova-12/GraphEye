Ext.define('grapheye.view.main.Export', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainexport',

    requires: [
        'grapheye.store.Result'
    ],

    title: 'Export',

    store: {
        type: 'result'
    },

    columns: [
        { text: 'Node', dataIndex: 'node' },
        { text: 'Rank', dataIndex: 'rank', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
