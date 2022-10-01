const newModal = $.modal({closable:true,
    buttons:[
    {text:"Ok",type:"confirm",fun(){
        console.log("Modal is confirm");
    }
    },
    {text:"Cancel",type:"cancel",fun(){
        console.log("Modal is close");
        newModal.close();
    }},
]})
function getTabData (event){
    const tab = event.target.closest('.tab')
    const title = tab.querySelector('.title').textContent
    const content = tab.querySelector('.content').textContent
    return {title:title,content:content}
}
const openModalWindow = event =>{
   const tabData = getTabData(event);
    newModal.setTabData(tabData);
    newModal.open();
}
const btns = document.querySelectorAll('.open-btn');
for(let item of btns)
{
    item.addEventListener('click',openModalWindow)
}
const block = document.querySelector('.block');

const images = ['image1.jpg','image2.jpg','image3.jpg','image4.jpg','image5.jpg']
const title = document.getElementById('title');
const slider = $.carousel({images:images,element:title,arrow:true,dots:true})

