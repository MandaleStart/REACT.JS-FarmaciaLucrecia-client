/* eslint-disable no-unused-vars */
import { auth } from './fireAuth';
import { signOut } from "firebase/auth";

export const userID = localStorage.getItem('user');
if (userID == null) {
  localStorage.setItem('user', 'unlogged');
}
export const userIDN = {}

export const resetPassword = (mail) => {
  auth
    .sendPasswordResetEmail(mail)
    .then(() => {
      alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
    })
    .catch((error) => {
      alert('Error al enviar el correo electrónico. Verifica la dirección de correo.');
    });
};

export const loginSession = async (mail, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(mail, password);
    const uID = userCredential.user.uid;
    localStorage.setItem('user', uID);
  } catch (error) {
    console.error('Error en Firebase:', error);
    alert('Error al iniciar sesión. Verifica el correo y la contraseña.');
    throw error;  
  }
};

export const closeSession = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
    })
    .catch((error) => {
      console.error('An error happened:', error);
    });
  localStorage.removeItem('user');
};

export const onLoginSession = async (mail, password, navigate) => {
  try {
    await loginSession(mail, password); // Espera a que la sesión se inicie
    navigate('/'); // Redirige solo si loginSession se completó correctamente
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Muestra cualquier error que ocurra
  }
};

export const onSignin = (navigate) => {
  navigate('/registro');
};

export const onResetPassword = (mail) => {
  resetPassword(mail);
};

