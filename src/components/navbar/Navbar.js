import './navbar.css';
import Logo from '../../resources/img/cabecera.png';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const [show, setShow] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const closeSession = () => {
        localStorage.clear();
        window.location.href = '/';
        setShow(0);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expired = token ? JSON.parse(atob(token.split('.')[1])).exp < Date.now() / 1000 : false;
        let user = localStorage.getItem('user');

        if (user && token && !expired) {
            user = JSON.parse(user);

            if (user.role === 'SUPERADMIN') {
                setShow(1);
            } else if (user.role === 'ADMIN') {
                setShow(2);
            } else {
                setShow(3);
            }

        } else {
            setShow(0);
        }
    }, [])


    return (
        <div className={'navbar-container'}>
            <div className={'navbar'}>
                <div className={'logo'}>
                    <img src={Logo} alt={'logo'} />
                </div>
                <ul className={'items-navbar'}>
                    {
                        show === 1 ?
                            <>
                                <li className={'navbar-item'}>
                                    <a href={'/'}>Bienvenid@ {user.name} {user.lastName}</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <a href={'/superadmin-users'}>Usuarios</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <button onClick={closeSession}>Salir</button>
                                </li>

                            </>
                            : show === 2 ?
                                <>
                                    <li className={'navbar-item'}>
                                        <a href={'/'}>Bienvenid@ {user.name} {user.lastName}</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin-careers'}>Carreras</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin-works'}>Trabajos</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin-news'}>Noticias</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <button onClick={closeSession}>Salir</button>
                                    </li>
                                </>
                                : show === 3 ?
                                    <>
                                        <li className={'navbar-item'}>
                                            <a href={'/'}>Bienvenido@ {user.name} {user.lastName}</a>
                                        </li>
                                        <li className={'navbar-item'}>
                                            <a href={'/student-notification'}>Notificaciones</a>
                                        </li>
                                        <li className={'navbar-item'}>
                                            <a href={'/student-profile'}>Perfil</a>
                                        </li>
                                        <li className={'navbar-item'}>
                                            <button onClick={closeSession}>Salir</button>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className={'navbar-item'}>
                                            <a href="./login">Iniciar Sesion</a>
                                        </li>
                                    </>

                    }
                </ul>
            </div>
        </div>
    );
}

export default Navbar
