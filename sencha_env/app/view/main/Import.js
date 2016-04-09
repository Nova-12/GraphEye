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
        var edgefilepath = Ext.getCmp('edgefilepath').getValue();
        var nodefilepath = Ext.getCmp('nodefilepath').getValue();
        console.log(edgefilepath) // well received
        console.log(nodefilepath) // well received
        }
    }]
});
