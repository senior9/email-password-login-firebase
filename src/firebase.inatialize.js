import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';
const intializeAuthentication = ()=>{
    initializeApp(firebaseConfig)
}
export default intializeAuthentication;