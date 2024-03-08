const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-z0-9.]{6,30}@gmail.com$/
gmailButton.addEventListener('click', ()=> {
    if (regExp.test(gmailInput.value.trim())){
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else{
        gmailResult.innerHTML = 'NOT OK'
        alert('Нельзя использоват: & = + <> , _ - ... Имя пользователя должно состоять из 6-30 знаков и содержать буквы, цифры и символы Например:sochi007@gmail.com')
        gmailResult.style.color = 'red'
    }
})

let block = document.querySelector('.child_block')
let position = 0
const moveBlock = () =>{
    position += 1
    block.style.left = `${position}px`

    if (position < 448){
        requestAnimationFrame(moveBlock)
    }
}
moveBlock()











