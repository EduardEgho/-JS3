//MODAL WINDOW

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () =>{
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
modalTrigger.onclick = () => {
    openModal()
}
modalCloseButton.onclick = () => {
    closeModal()
}
modal.onclick = (e) => {
    if (e.target === modal){
        closeModal()
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    setTimeout(openModal, 10000)
})

// Модальное окно при прокпутке

// let modalShown = false


// function isPageAtBottom() {
//     return window.innerHeight + window.scrollY >= document.body.offsetHeight
// }

// function showModalOnScroll() {
//     if (isPageAtBottom() && !modalShown) {
//         openModal()
//         modalShown = true
//     }
// }
// window.addEventListener('scroll', showModalOnScroll)



// Функция для определения, находится ли страница в самом низу
function isPageAtBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight
}

// Функция для отображения модального окна
function showModalOnScroll() {
    if (isPageAtBottom()) {
        openModal()
        window.removeEventListener('scroll', showModalOnScroll)
    }
}

window.addEventListener('scroll', showModalOnScroll)












