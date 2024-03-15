import './select.css'

const multiSelectOptions = []

function initMultiSelect() {
  const selectElement = document.querySelector('.O_multiSelect')
  const selectInput = document.querySelector('.C_multiSelectInput')
  const dropdownButton = document.querySelector('.A_multiSelectDropdownButton')
  const uniqueTags = getContentCardTags()

  uniqueTags.forEach((item) => {
    multiSelectOptions.push({
      text: item,
      active: false
    })
  })

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
    updateContent()
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
        updateSelectOptionList()
        updateContent()

        const chipElement = createChip(option)
        selectInput.appendChild(chipElement)

        selectElement.classList.remove('focus')
      })
      optionList.appendChild(listItem)
    }
  })
}

function getContentCardTags() {
  const contentCards = document.getElementsByClassName('O_contentCard')
  const tags = []

  for (let i = 0; i < contentCards.length; i++) {
    const contentCard = contentCards[i]
    const contentCardTags = contentCard.dataset.tags.split(', ')

    // contentCardTags.forEach((item) => {
    //   tags.push(item)
    // })

    tags.push(...contentCardTags)
  }
  const transformedTags = []
  tags.forEach((item) => {
    transformedTags.push(item.toLowerCase())
  })
  const uniqueTags = [...new Set(transformedTags)]

  return uniqueTags
}

function updateContent() {
  const contentCards = document.getElementsByClassName('O_contentCard')
  const selectedTags = []

  multiSelectOptions.forEach((item) => {
    if (item.active) {
      selectedTags.push(item.text)
    }
  })

  for (let i = 0; i < contentCards.length; i++) {
    const contentCard = contentCards[i]
    const contentCardTags = contentCard.dataset.tags.split(', ')
    const transformedTags = []

    contentCardTags.forEach((item) => {
      transformedTags.push(item.toLowerCase())
    })

    contentCard.classList.remove('hidden')

    selectedTags.forEach((tag) => {
      if (!transformedTags.includes(tag)) {
        contentCard.classList.add('hidden')
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getContentCardTags()
  initMultiSelect()
  updateContent()
})
