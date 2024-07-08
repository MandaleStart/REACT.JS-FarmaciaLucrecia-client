import { useState, useEffect } from 'react';

import { db } from '../../firedb';

function UserPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const uid = localStorage.getItem('user')

                const userSnapshot = await db.collection('usuarios').doc(uid).get();

                if (userSnapshot.exists) {
                    setUser(userSnapshot.data());
                } else {
                    console.log('El usuario no tiene datos en la base de datos.');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUser();
    }, []);

    const renderWelcomeMessage = () => {
        return <h2>Bienvenido, {user ? user.username : 'Usuario'}!</h2>;
    };

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            {renderWelcomeMessage()}
            <div className='alert alert-success'>
                <h3>Detalles del Usuario:</h3>
                <p>Nombre:{user.firstname} {user.lastname}</p>
                <p>Correo electrónico: {user.mail}</p>
                <p>Telefono: {user.tel}</p>
                <p>Registrado el: {user.createdDate}</p>
            </div>
        </div>
    );
}

export default UserPage;
