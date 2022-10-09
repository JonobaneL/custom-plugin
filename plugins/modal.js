// Element.prototype.Apend
const noop =()=>{}
function _createModalFooter(buttons = []){
    if(buttons.length === 0){
        return;
    }
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('footer-buttons');

    buttons.forEach(btn=>{
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type}` || 'primary');
        $btn.onclick = btn.fun || noop;
        modalFooter.appendChild($btn)
    })
    return modalFooter;
}
function _createModal(options){
    const defaltWidth = '400px'
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal')
    modalWindow.insertAdjacentHTML('afterbegin',`
        <div class="overlay" >
            <div class="modal-window" style="width:${options.width || defaltWidth}">
                <div class="modal-header">
                    <h2 data-title>${options.title}</h2>
                    ${options.closable ? `<span id="modal__close-bth" class="modal-close" data-close="true">&times;</span>`:''}
                </div>
                <hr>
                <div class="modal-content">${options.content || `<span></span>`}</div>
                <div class="modal-footer"></div>
            </div>
        </div>
    `)
    document.body.appendChild(modalWindow);
    const footer = _createModalFooter(options.buttons);
    const modalFooter = modalWindow.querySelector('.modal-footer');
    if(footer){
        modalFooter.appendChild(footer)
    }
    return modalWindow;
}

$.modal = function (options){
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;
    let overleyBlock = $modal.querySelector('.overlay')
    const modal = {
        open(){
            if(destroyed){
                return console.log("Modal was destroyed")
            }
            !closing && $modal.classList.add('open')
            overleyBlock.setAttribute('data-close', 'true')
        },
        close(){
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hidden');
            setTimeout(()=>{
                $modal.classList.remove('hidden');
                closing = false;
            },500)
            overleyBlock.removeAttribute('data-close')
            if(typeof options.onClose === 'function'){
                options.onClose();
            }
        },
        setContent(property){
            $modal.querySelector('.modal-content').innerHTML = property;
        },
        
    }
    const closeListener = event =>{
        if(event.target.dataset.close){
            modal.close()
        }
    }
    $modal.addEventListener('click',closeListener)
    return Object.assign(modal,{
        destroy(){
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click',closeListener)
            destroyed = true;
        }
    });
}