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
      
      swal('Se ha enviado un correo electrónico para restablecer la contraseña.', 'Revisa tu casilla'+ mail , 'success');
    })
    .catch((error) => {
      swal('Error al enviar el correo electrónico. Verifica la dirección de correo', 'Hubo un problema: ' + error.message, 'error');
    });
};

export const loginSession = async (mail, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(mail, password);
    const uID = userCredential.user.uid;
    localStorage.setItem('user', uID);
    window.dispatchEvent(new Event('sessionUpdated')); 
  } catch (error) {
    //console.error('Error en Firebase:', error);
    swal('Error al iniciar sesión. Verifica el correo y la contraseña. ' , 'error');
    throw error;  
  }
};

export const closeSession = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      // Notificar que la sesión ha cambiado
      window.dispatchEvent(new Event('sessionUpdated'));
      swal('Se ha cerrado la sesión.', 'Adiós', 'success');
    })
    .catch((error) => {
      swal('😢', 'Ocurrió un error', 'error');
    });
};
export const onLoginSession = async (mail, password, navigate) => {
  try {
    await loginSession(mail, password);
    navigate('/'); 
  } catch (error) {
    swal('😢', 'Error al iniciar sesión:', 'error');
  }
};

export const onSignin = (navigate) => {
  navigate('/registro');
};

export const onResetPassword = (mail) => {
  resetPassword(mail);
};

