import Cookies from "js-cookie";
import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({element, unauthorizedOnly}) {
    const accessToken = Cookies.get('accessToken');
    const location = useLocation();

    if (unauthorizedOnly) {
        return accessToken === undefined ? element : <Navigate to={"/"}/>;
    }

    return accessToken !== undefined
        ? element
        : <Navigate to={"/login"} state={{targetPath: location.pathname}}/>;
}

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    unauthorizedOnly: PropTypes.bool
}

export default ProtectedRoute;
