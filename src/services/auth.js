import { ref, firebaseAuth } from '../config/firebase'

export function signup (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}