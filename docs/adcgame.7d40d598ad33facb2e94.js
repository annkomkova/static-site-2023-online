/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

var eventListeners = [];
var messageGroup = [{
  questions: ['Ghbdtn! Rfr ltkf?', 'Ой', 'Привет! Как дела?', 'Ладно, знаешь меня?'],
  answers: ['Да', 'Нет']
}, {
  questions: ['Хей! приветствую тебя из глубин интернета', 'Ты ведь не знаешь кто я, верно?'],
  answers: ['Вообще-то знаю', 'Нет']
}, {
  questions: ['О, как хорошо, что ты заглянул', 'Кажется, мы уже встречались?', 'На вечеринке... Ну этого... того '],
  answers: ['Ну точно, было', 'Ты меня с кем-то путаешь']
}, {
  questions: ['ЙОУ', 'ДИП!', 'РЭП'],
  answers: ['ДИП!', 'ЭЭЭ, ЧТО?']
}];
function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function showQuestion(wrapper, question) {
  removeListenerFromAnswer();
  var element = document.createElement('div');
  element.innerText = question;
  element.classList.add('question');
  wrapper.appendChild(element);
}
function removeListenerFromAnswer() {
  eventListeners.forEach(function (element, i) {
    element.removeEventListener('click', showQuestions);
  });
}
function showQuestions() {
  var messages = sample(messageGroup);
  var timeout = 2000;
  var wrapper = document.createElement('div');
  wrapper.classList.add('questionsWrapper');
  messages.questions.forEach(function (question, i) {
    if (i == 0) {
      showQuestion(wrapper, question);
    } else if (i + 1 == messages.questions.length) {
      setTimeout(function () {
        showQuestion(wrapper, question);
        showAnswers(messages.answers);
      }, timeout);
    } else {
      setTimeout(function () {
        showQuestion(wrapper, question);
      }, timeout);
    }
    //  timeout = timeout + 2000
    timeout += 2000;
  });
  document.body.appendChild(wrapper);
}
function showAnswers(answers) {
  var wrapper = document.createElement('div');
  wrapper.classList.add('answersWrapper');
  document.body.appendChild(wrapper);
  answers.forEach(function (answer, i) {
    var element = document.createElement('div');
    element.innerText = answer;
    element.classList.add('answer');
    element.addEventListener('click', showQuestions);
    eventListeners.push(element);
    wrapper.appendChild(element);
  });
}
document.addEventListener('DOMContentLoaded', function () {
  showQuestions();
});
/******/ })()
;