//Gmail BLOCK

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

//MOVE BLOCK

const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')

let positionX = 0
let positionY = 0

let maxOffsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth
let maxOffsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight

const moveBlock = () =>{
    if (positionX < maxOffsetWidth) {
        positionX ++
        childBlock.style.left = `${positionX}px`
    }else if (positionX >= maxOffsetWidth && positionY < maxOffsetHeight){
        positionY++
        childBlock.style.top = `${positionY}px`
    }else if (maxOffsetWidth > 0){
        maxOffsetWidth --
        childBlock.style.left = `${maxOffsetWidth}px`
    }else if (maxOffsetHeight > 0){
        maxOffsetHeight --
        childBlock.style.top = `${maxOffsetHeight}px`
    }else {
        positionY = 0
        positionX = 0
        maxOffsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth
        maxOffsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight
    }
    requestAnimationFrame(moveBlock)
}
moveBlock()


const buttonStart = document.querySelector('#start')
const buttonStop = document.querySelector('#stop')
const buttonReset = document.querySelector('#reset')
const seconds = document.querySelector('#seconds')

let timeOut
let second = 0

const startStopwatch = () => {
    clearInterval(timeOut)
    timeOut = setInterval(() => {
        second++
        seconds.innerHTML = second
    }, 1000)
}
const stopStopwatch = () => {
    clearInterval(timeOut)
}
const resetStopwatch = () => {
    clearInterval(timeOut)
    second = 0
    seconds.innerHTML = second
}

buttonStart.addEventListener('click', startStopwatch)
buttonStop.addEventListener('click', stopStopwatch)
buttonReset.addEventListener('click', resetStopwatch)




