import Main from "../containers/Main";
import Login from '../containers/Login'
import Register from '../containers/Register'
import Notfound from '../containers/notFound';

const routes = [
    {
        exact: true,
        path: "/",
        component: Main,
    },
    {
        exact: true,
        path: "/login",
        component: Login,
    },
    {
        exact: true,
        path: "/register",
        component: Register,
    },
    {
        name: 'NotFound',
        component: Notfound,
    },
];

export default routes;