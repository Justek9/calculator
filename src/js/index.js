import '../styles/style.css'
import { THEMES } from './config'

const themeSwitch = document.querySelector('.toggle-theme')
let theme = localStorage.getItem('theme') || THEMES.dark
document.documentElement.setAttribute('data-theme', theme)
const result = document.getElementById('#result')

const setThemeText = () => {
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

setThemeText()

themeSwitch.addEventListener('click', () => {
	setThemeText()
	localStorage.setItem('theme', theme)
})
