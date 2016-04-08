Ext.define('grapheye.view.main.Import', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainimport',

    requires: [
        'grapheye.view.main.MainController'
    ],

    controller: 'main',
    //bodyPadding: 10,
    title: 'Import',
    closable: false,
    autoShow: true,

    items: [{
        xtype: 'textfield',
        name: 'filepath',
        fieldLabel: 'Enter file path',
        allowBlank: false
    }],
    buttons: [{
        text: 'Confirm',
        formBind: true,
        listeners: {
            click: 'onLoginClick'
        }
    }]
});
