Ext.define('grapheye.view.main.Algorithms', {
    extend: 'Ext.window.Window',
    xtype: 'mainalgorithms',

    controller: 'main',
    bodyPadding: 10,
    title: 'Select Algorithm',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        
        items: [{
            xtype: 'button',
            text: 'PageRank',
            margin: '10 0',
            handler: function(){
                grapheye.store.Request.algorithm = "pagerank";
            }
        }, {
            xtype: 'button',
            text: 'Connected Components',
            margin: '10 0'
            //handler: 'onClickButton
        }, {
            xtype: 'button',
            text: 'Triangle Count',
            margin: '10 0'
            //handler: 'onClickButton
        }, {
            xtype: 'button',
            text: 'Label Propagation',
            margin: '10 0'
            //handler: 'onClickButton
        }]
    }

});