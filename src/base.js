import Rebase from "re-base"
import firebase from "firebase"

const config ={
  apiKey: "AIzaSyAfb_IzEMgeRa227FN9ujkVSdhjtBRTopI",
  authDomain: "csia-2d0cd.firebaseapp.com",
  databaseURL: "https://csia-2d0cd.firebaseio.com",
  projectId: "csia-2d0cd",
  storageBucket: "csia-2d0cd.appspot.com",
  messagingSenderId: "1024104534606",
  appId: "1:1024104534606:web:d1bfa17847ca954d0f291f"
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())


export { app, base }