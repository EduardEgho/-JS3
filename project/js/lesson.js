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











