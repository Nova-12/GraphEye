Ext.define('grapheye.view.main.Import', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainimport',

    requires: [
        'grapheye.view.main.MainController'
    ],

    controller: 'main',
    title: 'Import',
    closable: false,
    autoShow: true,

    items: [{
        xtype: 'textfield',
        id: 'edgefilepath',
        fieldLabel: 'Enter edge file path',
        allowBlank: false
    }, {
        xtype: 'textfield',
        id: 'nodefilepath',
        fieldLabel: 'Enter node file path',
        allowBlank: true
    }],
    buttons: [{
        text: 'Confirm',
        formBind: true,
        handler: function(){
            grapheye.store.Request.importEdgeFile = Ext.getCmp('edgefilepath').getValue();
            grapheye.store.Request.importNodeFile = Ext.getCmp('nodefilepath').getValue();
            console.log(grapheye.store.Request);
        }
    }]
});
