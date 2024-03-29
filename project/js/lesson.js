//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const regExp =/^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.addEventListener('click', ()=>{
    if (regExp.test(phoneInput.value.trim())) {
        phoneSpan.innerHTML = 'ОК'
        phoneSpan.style.color = 'green'
    }else {
        phoneSpan.innerHTML = 'NOT OK'
        phoneSpan.style.color = 'red'
    }
})

//TAB

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContent.forEach((content) => {
        content.style.display = 'none'
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) =>{
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}


hideTabContent()
showTabContent()


tabsParent.onclick = (e) => {
    if (e.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (e.target === tab) {
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}



let intervalId

const autoTab = (i = 0) => {
    intervalId = setInterval(() => {
        i++
        if (i > tabs.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}
tabs.forEach(tab => {
    tab.onclick = (e) => {
        clearInterval(intervalId)
        autoTab(Array.from(tabs).indexOf(e.target))
    }
})

autoTab()


//CONVERTER

// принцип DRY - don`t repeat yourself - не повторяй самого себя
// KISS - keep it simple, stupid - делай проще тупица

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')
const rubInput = document.querySelector('#rub')

const urlJson = '../data/converter.json'


const converter = async (element, targetElement, nextElement, andElement, current) => {
    element.oninput = async () => {
        try {
            // const response = await fetch(`${urlJson}`)
            // const data = await response.json()
            const request = new XMLHttpRequest()
            request.open('GET', `${urlJson}`)
            request.setRequestHeader('Content-type', 'application/json')
            request.send()



            request.onload = () => {
                const data = JSON.parse(request.response)
                switch (current) {
                    case 'som':
                        targetElement.value = (element.value / data.usd).toFixed(2)
                        nextElement.value = (element.value / data.eur).toFixed(2)
                        andElement.value = (element.value / data.rubSom).toFixed(2)
                        break
                    case 'usd':
                        targetElement.value = (element.value * data.usd).toFixed(2)
                        nextElement.value = (element.value * data.dollarToEuroExchangeRate).toFixed(2)
                        andElement.value = (element.value * data.dollarRub).toFixed(2)
                        break
                    case 'eur':
                        targetElement.value = (element.value * data.eur).toFixed(2)
                        nextElement.value = (element.value * data.euroToDollarExchangeRate).toFixed(2)
                        andElement.value = (element.value * data.euroRub).toFixed(2)
                        break
                    case 'rub':
                        targetElement.value = (element.value * data.rubSom).toFixed(2)
                        nextElement.value = (element.value * data.rubDollar).toFixed(2)
                        andElement.value = (element.value * data.rubEuro).toFixed(2)
                        break
                    default:
                        break
                }

                element.value === '' && (targetElement.value = '' || (nextElement.value = '') || (andElement.value = ''))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

converter(somInput, usdInput, eurInput, rubInput, 'som')
converter(usdInput, somInput, eurInput, rubInput, 'usd')
converter(eurInput, somInput, usdInput, rubInput, 'eur')
converter(rubInput, somInput, usdInput, eurInput, 'rub')



// CARD SWITCHER

const cardBlock = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1

async function flipThrough () {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json()
        cardBlock.innerHTML = `
       <p>${data.title}</p>
       <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
       <span>${data.id}</span>
         `
    } catch (error) {
        console.log(error)
    }


}
flipThrough()

btnNext.onclick = () => {
    count++
    if (count > 200) {
        count = 1
    }
    flipThrough()
}

btnPrev.onclick = () =>{
    count--
    if (count < 1){
        count = 200
    }
    flipThrough()
}

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))


// Weather search

const searchInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const URL = 'https://api.openweathermap.org/data/2.5/weather'

const citySearch = () => {
    searchInput.oninput = async (e) => {
        try {
            const response = await fetch(`${URL}?q=${e.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            city.innerHTML = data.name ? data.name : 'Город не найден...'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '...'      // формула получения из фарингейта на цельсии
        } catch (error) {
            console.log(error)
        }

    }
}

citySearch()

























