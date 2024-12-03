import '../styles/style.css'
import { THEMES } from './config'

const themeSwitch = document.querySelector('.toggle-theme')
let theme = localStorage.getItem('theme') || THEMES.dark
document.documentElement.setAttribute('data-theme', theme)

if (theme === THEMES.dark) {
	document.documentElement.setAttribute('data-theme', THEMES.dark)
} else {
	document.documentElement.setAttribute('data-theme', THEMES.light)
}

themeSwitch.addEventListener('click', () => {
	if (theme === THEMES.dark) {
		document.documentElement.setAttribute('data-theme', THEMES.light)
		theme = THEMES.light
		themeSwitch.innerHTML = 'Enable dark mode'
	} else {
		document.documentElement.setAttribute('data-theme', THEMES.dark)
		theme = THEMES.dark
		themeSwitch.innerHTML = 'Enable light mode'
	}

	localStorage.setItem('theme', theme)
})
