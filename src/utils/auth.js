// import {navigate} from 'gatsby'

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
	isBrowser() && window.localStorage.getItem("user")
		? JSON.parse(window.localStorage.getItem("user"))
		: {}

export const setUser = user =>
	window.localStorage.setItem("user", JSON.stringify(user))

export const logout = () =>
	setUser("no one")	
	// navigate('/login/')
