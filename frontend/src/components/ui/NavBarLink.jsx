import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// This component displays navigation links based on authentication state.
// It shows profile and logout if authenticated, otherwise shows login and register.
const NavBarLink = () => {
  // Get authentication state and username from context
  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext);

  // Handle user logout: remove tokens and update authentication state
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {isAuthenticated ? (
        <>
          {/* Profile Link */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "nav-link active fw-semibold"
                : "nav-link fw-semibold"
            }
          >
            Hi, {username}
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-link nav-link fw-semibold m-0 p-0"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {/* Login Button */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "nav-link active fw-semibold"
                : "nav-link fw-semibold"
            }
          >
            Login
          </NavLink>
          
          {/* Register Button */}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "nav-link active fw-semibold"
                : "nav-link fw-semibold"
            }
          >
            Register
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBarLink;