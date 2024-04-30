import './searchVanila.css'
import { getPostTeasers } from './searchVanilaData'

let content

function initSearch() {
  const O_Search = document.querySelector('.O_Search')
  const A_SearchInput = O_Search.querySelector('.A_SearchInput')
  const A_Button = O_Search.querySelector('.A_Button')

  let requestText = getSearchRequest()

  if (requestText != undefined) {
    A_SearchInput.value = requestText

    if (content) {
      SearchContent(requestText)
    }
  } else {
    A_SearchInput.value = ''
  }

  A_SearchInput.addEventListener('input', (e) => {
    requestText = e.target.value

    if (requestText.length >= 3) {
      A_Button.classList.remove('disabled')
    } else {
      A_Button.classList.add('disabled')
    }

    console.log(content)
  })

  A_SearchInput.addEventListener('keydown', (e) => {
    requestText = e.target.value

    if (e.key === 'Enter') {
      setSearchRequest(requestText)
    }
  })

  A_Button.addEventListener('click', (e) => {
    if (!e.target.classList.contains('disabled')) {
      requestText = A_SearchInput.value
      setSearchRequest(requestText)
      SearchContent(requestText)
    }
  })
}

function getSearchRequest() {
  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)

  if (searchParams.has('request')) {
    return searchParams.get('request')
  }
}

function setSearchRequest(requestText) {
  const url = window.location.href.split('?')[0]

  window.location.href = url + '?request=' + requestText
}

function SearchContent(requestText) {
  const contentItemsContainer = document.querySelector('.S_Content')
  contentItemsContainer.innerHTML = ''

  let contentItemIds = []

  content.forEach((contentItem) => {
    const nbspRegex = /[\u202F\u00A0]/gm

    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm
    let { title, description } = contentItem

    title = title.replaceAll(nbspRegex, ' ')
    title = title.replaceAll(punctuationRegex, '')

    description = description.replaceAll(nbspRegex, ' ')
    description = description.replaceAll(punctuationRegex, '')

    if (requestText.length >= 3) {
      if (title.includes(requestText) || description.includes(requestText)) {
        contentItemIds.push(contentItem.id)
      }
    } else {
      contentItemIds.push(contentItem.id)
    }
  })

  if (contentItemIds.length > 0) {
    renderCardsByIds(contentItemsContainer, contentItemIds)
  } else {
    renderNothingFound(contentItemsContainer)
  }
}

//ошибка при рендере
function renderNothingFound(container) {
  container.innerHTML = 'Ничего не найдено'
}

function renderCardsByIds(container, ids) {
  ids = [...new Set(ids)]

  ids.forEach((id) => {
    content.forEach((item) => {
      if (item.id === id) {
        container.appendChild(createContentCard(item))
      }
    })
  })
}

function createContentCard(contentItemData) {
  const contentItem = document.createElement('div')
  contentItem.classList.add('O_ContentItem')

  const contentItemCover = document.createElement('img')
  contentItemCover.classList.add('A_ContentItemCover')
  contentItemCover.src = contentItemData.image

  const contentItemTitle = document.createElement('h2')
  contentItemTitle.classList.add('A_ContentItemTitle')
  contentItemTitle.innerText = contentItemData.title

  const contentItemDescription = document.createElement('p')
  contentItemDescription.classList.add('A_ContentItemDescription')
  contentItemDescription.innerText = contentItemData.description

  const contentItemTags = document.createElement('div')
  contentItemTags.classList.add('C_ContentItemTags')

  contentItemData.tags.forEach((tag) => {
    const contentItemTag = document.createElement('div')
    contentItemTag.classList.add('A_ContentItemTag')
    contentItemTag.innerText = tag
    contentItemTags.appendChild(contentItemTag)
  })

  // contentItem.appendChild(contentItemCover)
  contentItem.appendChild(contentItemTitle)
  contentItem.appendChild(contentItemDescription)
  contentItem.appendChild(contentItemTags)

  return contentItem
}

document.addEventListener('DOMContentLoaded', () => {
  getPostTeasers().then((data) => {
    content = data
    initSearch()
  })
})
