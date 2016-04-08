Ext.define('grapheye.store.Result', {
    extend: 'Ext.data.Store',

    alias: 'store.result',

    fields: [
        'node', 'rank'
    ],

    data: { items: [
        { node: 'a', rank: "1"},
        { node: 'b', rank: "2"},
        { node: 'c', rank: "3"},
        { node: 'd', rank: "4"}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
