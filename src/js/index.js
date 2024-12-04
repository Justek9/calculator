import '../styles/style.css'
import { MAX_NUMBER_OF_DIGITS, THEMES } from './config'

const themeSwitch = document.querySelector('.toggle-theme')
const result = document.querySelector('#result')
const allCalculatorButtons = document.querySelector('.calculator-buttons')

let total = null
let currentNumber = ''
let currentOperator = null

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

result.innerHTML = result.innerHTML || '0'

allCalculatorButtons.addEventListener('click', function (event) {
	const value = event.target.innerHTML

	if (isNaN(parseInt(value)) && value !== '.') {
		handleOperator(value)
	} else {
		handleNumber(value)
	}
})

const handleOperator = operator => {
	if (currentNumber !== '') {
		if (total === null) {
			total = parseFloat(currentNumber)
		} else if (currentOperator) {
			total = calculate(total, parseFloat(currentNumber), currentOperator)
		}
	}

	currentOperator = operator

	if (operator === '=') {
		result.innerHTML = showResult(total)
		currentNumber = ''
		currentOperator = null
	} else if (operator === 'AC') {
		total = null
		currentNumber = ''
		currentOperator = null
		result.innerHTML = '0'
	} else if (operator === '+/-') {
		if (currentNumber) {
			currentNumber = (-parseFloat(currentNumber)).toString()
			result.innerHTML = currentNumber
		}
	} else if (operator === '%') {
		currentNumber = (total / 100).toString()
		result.innerHTML = currentNumber
	} else {
		currentNumber = ''
	}
}

const handleNumber = value => {
	if (value === '.') {
		if (!currentNumber.includes('.')) {
			currentNumber = currentNumber === '' ? '0.' : currentNumber + '.'
			result.innerHTML = currentNumber
		}
		return
	}

	if (currentNumber.length < MAX_NUMBER_OF_DIGITS) {
		currentNumber = currentNumber === '0' ? value : currentNumber + value
		result.innerHTML = currentNumber
	}
}

const calculate = (total, current, operator) => {
	switch (operator) {
		case '+':
			return total + current
		case '−':
			return total - current
		case '×':
			return total * current
		case '÷':
			return current === 0 ? 'Error' : total / current
		default:
			return current
	}
}

const showResult = value => {
	let resultStr = value.toString()

	if (resultStr.includes('.')) {
		resultStr = parseFloat(resultStr).toString()
	}

	if (resultStr.length > MAX_NUMBER_OF_DIGITS) {
		resultStr = resultStr.substring(0, MAX_NUMBER_OF_DIGITS)
	}

	return resultStr
}
