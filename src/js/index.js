import '../styles/style.css'
import { THEMES } from './config'

const themeSwitch = document.querySelector('.toggle-theme')
const result = document.querySelector('#result')

const numbers = document.querySelectorAll('.number')
const allCalculatorButtons = document.querySelector('.calculator-buttons')

let total = 0
let currentNumber
let theme = localStorage.getItem('theme') || THEMES.dark
document.documentElement.setAttribute('data-theme', theme)

const setTheme = () => {
	if (theme === THEMES.dark) {
		document.documentElement.setAttribute('data-theme', THEMES.light)
		theme = THEMES.light
		themeSwitch.innerHTML = 'Dark mode'
	} else {
		document.documentElement.setAttribute('data-theme', THEMES.dark)
		theme = THEMES.dark
		themeSwitch.innerHTML = 'Light mode'
	}
}

setTheme()

themeSwitch.addEventListener('click', () => {
	setTheme()
	localStorage.setItem('theme', theme)
})

if (!result.innerHTML) {
	result.innerHTML = '0'
}

allCalculatorButtons.addEventListener('click', function (event) {
	const value = event.target.innerHTML

	if (isNaN(parseInt(value))) {
		handleOperator(value)
	} else {
		handleNumber(value)
	}
})

const handleOperator = operator => {
	console.log(operator)

	switch (operator) {
		case '+':
			total += Number(currentNumber)
			console.log(Number(currentNumber))
			console.log(total)
			result.innerHTML = 0
			break

		case '-':
			total -= Number(currentNumber)
			result.innerHTML = 0
			break

		case 'x':
			total *= Number(currentNumber)
			result.innerHTML = 0
			break

		case '÷':
			if (currentNumber === 0) {
				result.innerHTML = 'Error'
				return
			}
			total /= Number(currentNumber)
			result.innerHTML = 0
			break

		case '=':
			result.innerHTML = total
			console.log(' result:', total)
			break

		case 'AC':
			total = 0
			currentNumber = 0
			operator = null
			result.innerHTML = '0'
			break

		case '+/-':
			if (currentNumber) {
				currentNumber = -currentNumber
				result.innerHTML = currentNumber
			}
			break

		case '%':
			if (currentNumber) {
				currentNumber = currentNumber / 100
				result.innerHTML = currentNumber
			}
			break

		default:
			console.log(`test`)
	}
}
const handleNumber = value => {
	currentNumber = result.innerHTML === '0' ? value : result.innerHTML + value
	result.innerHTML = currentNumber
}
