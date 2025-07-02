import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import NavBarLink from "./NavBarLink";
import styles from "./NavBar.module.css";

// NavBar component displays the top navigation bar with brand, navigation links, and cart button.
// It shows the number of items in the cart as a badge on the cart icon.
const NavBar = ({ numCartItems }) => {
  return (
    <nav className={`navbar navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/">JOBIJU MART</Link>
        <div className="d-flex align-items-center gap-3">
          {/* Dynamic Nav Links (login/register or profile/logout) */}
          <NavBarLink />
          {/* Cart Button */}
          <Link
            to="/cart"
            className={`btn btn-dark rounded-pill position-relative ${styles.responsiveCart}`}
            style={{ minWidth: "44px" }}
          >
            <FaCartShopping size={20} />
            {/* Show cart item count badge if there are items in the cart */}
            {numCartItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: '#6050DC' }}
              >
                {numCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;