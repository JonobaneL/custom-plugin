let sneakers = [
    {id:1,brand:"Nike",modal:"AIR VAPORMAX PLUS", gender:"men",price:"7 000",image:"sneakers1.jpg"},
    {id:2,brand:"Nike",modal:"VISION MID NEXT NATURE", gender:"men",price:"2 580",image:"sneakers2.jpg"},
    {id:3,brand:"Nike",modal:"BLAZER MID '77 VINTAGE", gender:"men",price:"3 900",image:"sneakers3.jpg"},
]
const itemHTML = sneakersItem =>  `
    <div class="item">
            <img class="item__image" src="images/sneakers/${sneakersItem.image}" alt="${sneakersItem.brand} ${sneakersItem.modal}">
            <div class="info">
                <p class="info__name">${sneakersItem.brand} ${sneakersItem.modal}</p>
                <p class="info__price">${sneakersItem.price}&#8372</p>
                <button class="info__btn" data-btn="buy" data-id="${sneakersItem.id}">Buy</button>
                <button class="info__delete" data-btn="delete" data-id="${sneakersItem.id}">&#x2715</button>
            </div>
        </div>
`
const buyModal = $.modal({
    title:"Buying",
    closable:false,
    buttons:[
    {text:"OK",type:"confirm",fun(){
        buyModal.close();
    }},
]})

const sneakersParent = document.querySelector('.sneakers');
const renderSneakers = ()=>{
    const items = sneakers.map(itemHTML).join('')
    sneakersParent.innerHTML = items;
}
renderSneakers();

document.addEventListener('click', event =>{
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id
       if(btnType === "buy"){
        const currentSneakers = sneakers.find(i =>i.id== id)
        buyModal.setContent(`<p>You bought ${currentSneakers.brand} ${currentSneakers.modal}!</p>`)
        buyModal.open();
       }
       else if(btnType === "delete"){
        $.confirm({
            title:"Remove shoes",
            content:`<p>Are you shure?</p>`
        }).then(()=>{
            console.log("Item was removed");
            sneakers = sneakers.filter(i=>i.id != id)
            renderSneakers();
        }).catch(()=>
            console.log("Item wasn`t removed")
        )
       }

})


const block = document.querySelector('.block');

const images = ['image1.jpg','image2.jpg','image3.jpg','image4.jpg','image5.jpg']
const title = document.getElementById('title');
const slider = $.carousel({images:images,element:title,arrow:true,dots:true})

