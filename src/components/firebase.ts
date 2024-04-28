import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';




const firebaseConfig = {
	apiKey: 'AIzaSyDdLndgeg3cInYCDX4Q1iaCR2lsm4OgtJ4',
	authDomain: 'auth-4d105.firebaseapp.com',
	projectId: 'auth-4d105',
	storageBucket: 'auth-4d105.appspot.com',
	messagingSenderId: '1043963055179',
	appId: '1:1043963055179:web:3113608bed90a15ee191ce',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();


