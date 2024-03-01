import './select.css'
import Cookies from 'js-cookie'

const selectOptions = [
  '#веловоскресенье',
  '#цветыпопонедельникам',
  '#архитектураповторникам',
  '#природнаясреда',
  '#жизненнаясреда',
  '#танцыпосредам',
  '#птицыпочетвергам',
  '#рыбныйчетверг',
  '#четвероногийчетверг',
  '#пятничныекотики',
  '#ачётаковапопятницам',
  '#субботниепёсики',
  '#субботнеефотодлядуши'
]

const multiSelectOptions = [
  {
    text: '#веловоскресенье',
    active: false
  },
  { text: '#цветыпопонедельникам', active: false },
  { text: '#архитектураповторникам', active: false },
  { text: '#природнаясреда', active: false },
  { text: '#жизненнаясреда', active: false },
  { text: '#танцыпосредам', active: false },
  { text: '#птицыпочетвергам', active: false },
  { text: '#рыбныйчетверг', active: false },
  { text: '#четвероногийчетверг', active: false },
  { text: '#пятничныекотики', active: false },
  { text: '#ачётаковапопятницам', active: false },
  { text: '#субботниепёсики', active: false },
  { text: '#субботнеефотодлядуши', active: false }
]

function initModal() {
  const openModal = document.querySelector('.openModal')
  const closeModal = document.querySelector('.closeModal')
  const modal = document.querySelector('.modal')

  openModal.addEventListener('click', () => {
    modal.classList.add('visible')
  })
  closeModal.addEventListener('click', () => {
    modal.classList.remove('visible')
  })
}

function initSwitch() {
  const checkbox = document.querySelector('input[type=checkbox]')

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      Cookies.set('theme', 'dark')
      changeTheme()
    } else {
      Cookies.remove('theme')
      changeTheme()
    }
  })
}

function changeTheme() {
  const body = document.querySelector('body')

  if (Cookies.get('theme') === 'dark') {
    body.classList.add('dark')
  } else {
    body.classList.remove('dark')
  }
}

function initSelect() {
  const selectElement = document.querySelector('.O_Select')
  const optionList = document.querySelector('.C_selectOptionList')
  const selectInput = document.querySelector('.A_selectInput')
  const dropdownButton = document.querySelector('.A_selectDropdownButton')

  selectOptions.forEach((option) => {
    const listItem = document.createElement('div')
    listItem.classList.add('A_selectOptionListItem')
    listItem.innerText = option

    listItem.addEventListener('click', () => {
      const listItems = document.getElementsByClassName(
        'A_selectOptionListItem'
      )

      for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index]
        element.classList.remove('active')
      }

      listItem.classList.add('active')
      selectInput.value = option
      selectElement.classList.remove('focus')
    })

    optionList.appendChild(listItem)
  })

  dropdownButton.addEventListener('click', () => {
    selectElement.classList.toggle('focus')
  })
  selectInput.addEventListener('click', () => {
    selectElement.classList.toggle('focus')
  })
}

function initMultiSelect() {
  const selectElement = document.querySelector('.O_multiSelect')
  const selectInput = document.querySelector('.C_multiSelectInput')
  const dropdownButton = document.querySelector('.A_multiSelectDropdownButton')

  updateSelectOptionList()

  dropdownButton.addEventListener('click', () => {
    selectElement.classList.toggle('focus')
  })
  selectInput.addEventListener('click', () => {
    selectElement.classList.add('focus')
  })

  document.body.addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('A_multiSelectInput') &&
      !e.target.classList.contains('A_multiSelectDropdownButton')
    ) {
      selectElement.classList.remove('focus')
    }
  })
}

function createChip(option) {
  const { text } = option
  // const text = option.text // старый метод получения значения ключа

  const chipElement = document.createElement('div')
  chipElement.classList.add('A_multiSelectChip')

  const chipElementText = document.createElement('span')
  chipElementText.classList.add('Q_multiSelectChipText')
  chipElementText.innerText = text

  const chipElementButton = document.createElement('span')
  chipElementButton.classList.add('Q_multiSelectChipButton')

  chipElementButton.addEventListener('click', () => {
    updateSelectData(option)
    updateSelectOptionList()
    chipElement.remove()
  })

  chipElement.appendChild(chipElementText)
  chipElement.appendChild(chipElementButton)

  return chipElement
}

function updateSelectData(option) {
  multiSelectOptions.forEach((obj) => {
    if (obj.text === option.text) {
      obj.active = !option.active
    }
  })
}

function updateSelectOptionList() {
  const optionList = document.querySelector('.C_multiSelectOptionList')
  const selectElement = document.querySelector('.O_multiSelect')
  const selectInput = document.querySelector('.C_multiSelectInput')

  optionList.innerHTML = ''

  multiSelectOptions.forEach((option) => {
    const { text, active } = option

    if (!active) {
      const listItem = document.createElement('div')
      listItem.classList.add('A_multiSelectOptionListItem')
      listItem.innerText = text

      listItem.addEventListener('click', () => {
        updateSelectData(option)
        updateSelectOptionList

        const chipElement = createChip(option)
        selectInput.appendChild(chipElement)

        selectElement.classList.remove('focus')
      })
      optionList.appendChild(listItem)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  changeTheme()
  initModal()
  initSwitch()
  initSelect()
  initMultiSelect()
})
