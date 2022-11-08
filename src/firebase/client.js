import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyBcdRnPqEXef_T8nowAxx1jn1x7TBtQJGc",
	authDomain: "twin-pixels.firebaseapp.com",
	projectId: "twin-pixels",
	storageBucket: "twin-pixels.appspot.com",
	messagingSenderId: "198103437891",
	appId: "1:198103437891:web:8aca23b60a07b089867af6",
	measurementId: "G-SVNZ6Y2ZDW"
}

const app = initializeApp(firebaseConfig)

export const signIn = (email, pass) => {
	const auth = getAuth()

	return signInWithEmailAndPassword(auth, email, pass)
}

export const checkUser = (callback) => {
	const auth = getAuth()
	
	return onAuthStateChanged(auth, user => {
		callback(user)
	})
}

export const updateUser = (displayName = undefined, photoURL = undefined) => {
	const auth = getAuth()

	return updateProfile(auth.currentUser, {
		displayName,
		photoURL
	})
}


export const logOut = () => {
	const auth = getAuth()

	return signOut(auth)
}