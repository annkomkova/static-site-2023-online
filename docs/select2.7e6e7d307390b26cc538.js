/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var multiSelectOptions = [];
function initMultiSelect() {
  var selectElement = document.querySelector('.O_multiSelect');
  var selectInput = document.querySelector('.C_multiSelectInput');
  var dropdownButton = document.querySelector('.A_multiSelectDropdownButton');
  var uniqueTags = getContentCardTags();
  uniqueTags.forEach(function (item) {
    multiSelectOptions.push({
      text: item,
      active: false
    });
  });
  updateSelectOptionList();
  dropdownButton.addEventListener('click', function () {
    selectElement.classList.toggle('focus');
  });
  selectInput.addEventListener('click', function () {
    selectElement.classList.add('focus');
  });
  document.body.addEventListener('click', function (e) {
    if (!e.target.classList.contains('A_multiSelectInput') && !e.target.classList.contains('A_multiSelectDropdownButton')) {
      selectElement.classList.remove('focus');
    }
  });
}
function createChip(option) {
  var text = option.text;
  // const text = option.text // старый метод получения значения ключа

  var chipElement = document.createElement('div');
  chipElement.classList.add('A_multiSelectChip');
  var chipElementText = document.createElement('span');
  chipElementText.classList.add('Q_multiSelectChipText');
  chipElementText.innerText = text;
  var chipElementButton = document.createElement('span');
  chipElementButton.classList.add('Q_multiSelectChipButton');
  chipElementButton.addEventListener('click', function () {
    updateSelectData(option);
    updateSelectOptionList();
    updateContent();
    chipElement.remove();
  });
  chipElement.appendChild(chipElementText);
  chipElement.appendChild(chipElementButton);
  return chipElement;
}
function updateSelectData(option) {
  multiSelectOptions.forEach(function (obj) {
    if (obj.text === option.text) {
      obj.active = !option.active;
    }
  });
}
function updateSelectOptionList() {
  var optionList = document.querySelector('.C_multiSelectOptionList');
  var selectElement = document.querySelector('.O_multiSelect');
  var selectInput = document.querySelector('.C_multiSelectInput');
  optionList.innerHTML = '';
  multiSelectOptions.forEach(function (option) {
    var text = option.text,
      active = option.active;
    if (!active) {
      var listItem = document.createElement('div');
      listItem.classList.add('A_multiSelectOptionListItem');
      listItem.innerText = text;
      listItem.addEventListener('click', function () {
        updateSelectData(option);
        updateSelectOptionList();
        updateContent();
        var chipElement = createChip(option);
        selectInput.appendChild(chipElement);
        selectElement.classList.remove('focus');
      });
      optionList.appendChild(listItem);
    }
  });
}
function getContentCardTags() {
  var contentCards = document.getElementsByClassName('O_contentCard');
  var tags = [];
  for (var i = 0; i < contentCards.length; i++) {
    var contentCard = contentCards[i];
    var contentCardTags = contentCard.dataset.tags.split(', ');

    // contentCardTags.forEach((item) => {
    //   tags.push(item)
    // })

    tags.push.apply(tags, _toConsumableArray(contentCardTags));
  }
  var transformedTags = [];
  tags.forEach(function (item) {
    transformedTags.push(item.toLowerCase());
  });
  var uniqueTags = _toConsumableArray(new Set(transformedTags));
  return uniqueTags;
}
function updateContent() {
  var contentCards = document.getElementsByClassName('O_contentCard');
  var selectedTags = [];
  multiSelectOptions.forEach(function (item) {
    if (item.active) {
      selectedTags.push(item.text);
    }
  });
  var _loop = function _loop() {
    var contentCard = contentCards[i];
    var contentCardTags = contentCard.dataset.tags.split(', ');
    var transformedTags = [];
    contentCardTags.forEach(function (item) {
      transformedTags.push(item.toLowerCase());
    });
    contentCard.classList.remove('hidden');
    selectedTags.forEach(function (tag) {
      if (!transformedTags.includes(tag)) {
        contentCard.classList.add('hidden');
      }
    });
  };
  for (var i = 0; i < contentCards.length; i++) {
    _loop();
  }
}
document.addEventListener('DOMContentLoaded', function () {
  getContentCardTags();
  initMultiSelect();
  updateContent();
});
/******/ })()
;