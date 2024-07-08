/* eslint-disable no-unused-vars */
import { auth } from '../../fireAuth';
import { signOut } from "firebase/auth";

export const userID = localStorage.getItem('user');
if (userID == null) {localStorage.setItem('user', 'unlogged');}
export const resetPassword = (mail) => {
  const emailAddress = mail;
  auth
    .sendPasswordResetEmail(emailAddress)
    .then(() => {
      alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
    })
    .catch((error) => {
      alert('Error al enviar el correo electrónico. Verifica la dirección de correo.');
    });
};

export const loginSession = (mail, password) => {
  auth
    .signInWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      const uID = userCredential.user.uid;
      localStorage.setItem('user', uID);
    })
    .catch((error) => {
      alert('Error al iniciar sesión. Verifica el correo y la contraseña.');
    });
};

export const closeSession = () => {
  signOut(auth).then(() => {
    console.log('Sign-out successful.')
  }).catch((error) => {
    console.log('An error happened')

  });
  localStorage.removeItem('user');
};