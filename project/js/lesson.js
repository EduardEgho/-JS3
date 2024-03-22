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


const converter = (element, targetElement, nextElement, andElement, current) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
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
    }
}

converter(somInput, usdInput, eurInput, rubInput, 'som')
converter(usdInput, somInput, eurInput, rubInput, 'usd')
converter(eurInput, somInput, usdInput, rubInput, 'eur')
converter(rubInput, somInput, usdInput, eurInput, 'rub')











