
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDI0sBlnH4h-x5NT6zkGfBNhthtvPD1HTA",
    authDomain: "whatsapp-mern-fc3ef.firebaseapp.com",
    projectId: "whatsapp-mern-fc3ef",
    storageBucket: "whatsapp-mern-fc3ef.appspot.com",
    messagingSenderId: "948239025600",
    appId: "1:948239025600:web:6dc500f8c30afa0f4bf425"
  };

const firebaseApp =firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db
