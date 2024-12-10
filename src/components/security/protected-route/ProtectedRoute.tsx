import Cookies from "js-cookie";
import {Navigate, useLocation} from "react-router-dom";
import {ReactElement} from "react";

function ProtectedRoute({element, unauthorizedOnly = false}: { element: ReactElement, unauthorizedOnly?: boolean }) {
    const accessToken = Cookies.get('accessToken');
    const location = useLocation();

    if (unauthorizedOnly) {
        return accessToken === undefined ? element : <Navigate to={"/"}/>;
    }

    return accessToken !== undefined
        ? element
        : <Navigate to={"/login"} state={{targetPath: location.pathname}}/>;
}

export default ProtectedRoute;
