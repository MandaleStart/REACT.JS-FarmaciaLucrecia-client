import { useState } from 'react';
import { db } from '@utils/firedb';
import { auth } from '@utils/fireAuth';

const SigninPage = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const setNewUserDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };
  
  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena || !nombre || !email || !telefono) {
      swal('Error', 'Por favor, complete los campos requeridos.', 'error');
      return;
    } else if (contrasena !== repetirContrasena) {
      swal('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, contrasena);
      const uID = userCredential.user.uid;
      await db.collection('usuarios').doc(uID).set({
        username: usuario,
        firstname: nombre,
        lastname: apellido,
        birthDate: fechaNacimiento,
        mail: email,
        telefono: telefono,
        role: 'client',
        cart: [],
        fav: [],
        uID: uID,
        imgProfile: 'noimage.jpg',
        createdDate: setNewUserDate()
      });

      // Mostrar alerta de éxito
      swal('Registro exitoso', `El usuario ${usuario} ha sido registrado correctamente.`, 'success');

      // Resetear el formulario
      setUsuario('');
      setContrasena('');
      setRepetirContrasena('');
      setNombre('');
      setApellido('');
      setFechaNacimiento('');
      setEmail('');
      setTelefono('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      // Mostrar alerta de error
      swal('Error en el registro', 'Hubo un problema: ' + error.message, 'error');
    }
  };

  return (
    <main>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="wb">
          <h5 className="">Registrarse</h5>

          <div className="">
            <div>
              Usuario*:
              <input
                id="user-signin-input"
                required
                className="form-control me-2"
                type="text"
                placeholder="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div>
              <div>
                Contraseña:
                <input
                  id="pass-signin-input"
                  className="form-control me-2"
                  type="password"
                  placeholder="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>
              <div>
                Repetir Contraseña:
                <input
                  id="pass-confirm-signin-input"
                  className="form-control me-2"
                  type="password"
                  placeholder="password"
                  value={repetirContrasena}
                  onChange={(e) => setRepetirContrasena(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <div>
                Nombre*:
                <input
                  type="text"
                  className="form-control me-2"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                Apellido:
                <input
                  type="text"
                  className="form-control me-2"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>
            <div>
              Fecha de Nacimiento:
              <input
                type="date"
                className="form-control me-2"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <div>
              E-mail*:
              <input
                type="email"
                className="form-control me-2"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              Teléfono/Celular*:
              <input
                type="tel"
                className="form-control me-2"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <p>*:datos requeridos</p>
          </div>
          <div className="">
            <button type="button" className="btn btn-primary" onClick={handleSigninSubmit}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SigninPage;
