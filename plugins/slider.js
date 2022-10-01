function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
const _generateDots = options=>{
    const dots = document.createElement('div');
    dots.classList.add('dots')
    for(i=0;i<options.images.length;i++){
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-index',i);
        dots.appendChild(dot)
    }
    return dots
}
const _createCarousel = options =>{
    const carousel = document.createElement('div')
    const slides = document.createElement('ul');
    const $nextBtn = document.createElement('div')
    const $prevBtn = document.createElement('div')
    const buttonsContent = '<img src="images/next.png">';
    $nextBtn.classList.add('nextBtn');
    $prevBtn.classList.add('prevBtn');
    $prevBtn.insertAdjacentHTML('afterbegin',buttonsContent)
    $nextBtn.insertAdjacentHTML('afterbegin',buttonsContent)
    slides.classList.add('slides');
    carousel.classList.add('carousel')
    for(i=0;i<options.images.length;i++){
        const $slide = document.createElement('li');
        $slide.classList.add('slide');
        $slide.insertAdjacentHTML('afterbegin', `<img class="image" src="images/${options.images[i]}" alt="image${i}">`);
        slides.appendChild($slide);
    }
    if(options.arrow){
        carousel.appendChild($prevBtn);
        carousel.appendChild($nextBtn);
    }
    carousel.appendChild(slides);
    if(options.dots){
        carousel.appendChild(_generateDots(options))
    }
    insertAfter(carousel,options.element)
    return carousel;
}

$.carousel = function(options){
    const $carousel = _createCarousel(options);
    let index = 0;
    const imagesLength = options.images.length;
    const items = $carousel.querySelectorAll('.slide');
    const dots = $carousel.querySelectorAll('.dot');
    items[index].classList.add('active');
    const nextBtn = $carousel.querySelector('.nextBtn');
    const prevBtn = $carousel.querySelector('.prevBtn');
    const carousel={
        nextBtn(){
            index++;
            checkIndex();
            setActiveItem();
        },
        prevBtn(){
            index--;
            checkIndex();
            setActiveItem();
        },
    }
    const setDotImage = event=>{
        index = event.target.dataset.index;
        setActiveItem();
    }
    if(options.dots){
        dots.forEach(g => g.addEventListener('click',setDotImage))
        dots[index].classList.add('active');
    }
    if(options.arrow){
        nextBtn.addEventListener('click',carousel.nextBtn)
        prevBtn.addEventListener('click',carousel.prevBtn)
    }
    

    const checkIndex = ()=>{
        if(index>imagesLength-1){
            index=0
        }else if(index<0){
            index=imagesLength-1
        }
    }
    function setActiveItem(){
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active')
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active')
    }

    return carousel;
}