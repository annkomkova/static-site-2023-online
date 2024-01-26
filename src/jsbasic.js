import './jsbasic.css'

// function hello() {
//   const header = document.querySelector('h1')
//   if (header.innerHTML === 'Hello!') {
//     header.innerHTML = 'Bye!'
//   } else {
//     header.innerHTML = 'Hello!'
//   }
// }

// let counter = 0
// function count() {
//   counter++
//   document.querySelector('h1').innerHTML = counter

//   if (counter % 10 === 0) {
//     alert(`Count is now ${counter}`)
//   }
// }

// let counter = 0
// function count() {
//   counter++
//   document.querySelector('h1').innerHTML = counter

//   if (counter % 10 === 0) {
//     alert(`Count is now ${counter}`)
//   }
// }
// //v1
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('button').onclick = count
// })
// //v2
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('button').addEventListener('click', count)
// })

// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('form').onsubmit = function () {
//     const name = document.querySelector('#name').value
//     alert(`Привет, ${name}, рады тебя видеть!`)
//   }
// })

// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('.red').onclick = function () {
//     document.querySelector('.red').classList.remove('border')
//   }
//   document.querySelector('.gold').onclick = function () {
//     document.querySelector('.gold').classList.add('hidden')
//   }
//   document.querySelector('.blue').onclick = function () {
//     document.querySelector('.blue').classList.toggle('green')
//   }
// })

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('button').forEach(function (button) {
    button.onclick = function () {
      document.querySelector('h1').style.color = button.dataset.color
    }
  })
})
