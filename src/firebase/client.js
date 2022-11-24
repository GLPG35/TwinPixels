import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth'
import { ref, getStorage, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, getDoc, getDocs, getFirestore, orderBy,
	query, doc, updateDoc, setDoc, deleteDoc, increment, where } from 'firebase/firestore'

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
const storage = getStorage()
const db = getFirestore(app)

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

export const uploadPFP = img => {
	const name = new Date().getTime().toString() + (Math.random() + 1).toString(36).substring(10)

	const refImage = ref(storage, `profilePics/${name}.jpg`)
	const task = uploadBytesResumable(refImage, img)

	return task
}

export const updateUser = ({displayName = undefined, photoURL = undefined}) => {
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

export const uploadThumb = img => {
	const name = new Date().getTime().toString() + (Math.random() + 1).toString(36).substring(10)

	const refImage = ref(storage, `thumbnails/${name}.jpg`)
	const task = uploadBytesResumable(refImage, img)

	return task
}

export const uploadItem = ({title, price, stock, pic, description, categories}) => {
	return addDoc(collection(db, 'items'), {
		title,
		price,
		stock,
		pic,
		description,
		categories
	})
}

export const addItemColors = (id, colors) => {
	return setDoc(doc(db, 'items', id), {
		colors
	}, { merge: true })
}

export const getItems = () => {
	return getDocs(query(collection(db, 'items'), orderBy('title', 'asc')))
	.then(({docs}) => {
		return docs.map(doc => {
			const data = doc.data()
			const id = doc.id

			return {
				...data,
				id
			}
		})
	})
}

export const getItemFID = id => {
	return getDoc(doc(db, `items/${id}`))
	.then(doc => {
		if (doc.exists()) {
			const data = doc.data()
			const id = doc.id

			return {
				...data,
				id
			}
		} else {
			return null
		}
	})
}

export const updateStock = (id, stock) => {
	return updateDoc(doc(db, `items/${id}`), {
		stock
	})
}

export const deleteItem = id => {
	return getItemFID(id).then(item => {
		if (item.colors) {
			const findColor = item.colors.findIndex(x => x.id == id)
			const newColors = [...item.colors]
			newColors.splice(findColor, 1)

			return Promise.all(
				newColors.map(({id}) => {
					return updateDoc(doc(db, `items/${id}`), {
						colors: newColors
					})
				})
			).then(() => {
				return deleteDoc(doc(db, `items/${id}`))
			})
		} else {
			return deleteDoc(doc(db, `items/${id}`))
		}
	})
}

export const uploadOrder = (email, name, address, phone, items, date) => {
	return Promise.all(
		items.map(({ id, quantity }) => {
			return updateDoc(doc(db, `items/${id}`), {
				stock: increment(-quantity)
			})
		})
	).then(() => {
		return addDoc(collection(db, 'orders'), {
			items,
			email,
			name,
			address,
			phone,
			date
		})
	})
}

export const getOrder = id => {
	return getDoc(doc(db, `orders/${id}`))
	.then(doc => {
		if (doc.exists()) {
			const data = doc.data()
			const id = doc.id

			return {
				...data,
				id
			}
		} else {
			return null
		}
	})
}