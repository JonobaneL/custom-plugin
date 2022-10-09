$.confirm = function(options){
    return new Promise((resolve,reject)=>{
        const modal = $.modal({
            title:options.title,
            closable:false,
            onClose(){
                modal.destroy();
            },
            content:options.content,
            buttons:[
                {text:"Yes",type:"cancel",fun(){
                    modal.close();
                    resolve();
                }},
                {text:"No",type:"confirm",fun(){
                    modal.close();
                    reject();
                }},
            ]
        })
    modal.open();
    })
}