import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { CiDiscount1 } from "react-icons/ci";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" alt="logo" src={logo} />
      </Link>
      <ul className="nav-bar">
        <li>
          <div className="nav-item">
            <CiDiscount1 />
            Offers
          </div>
        </li>

        <li>
          <div className="nav-item">
            <FiShoppingCart />
            <p data-testid="cart">Cart - 0</p>
          </div>
        </li>
        <li>
          <div className="nav-item">
            <FiUser />
            Krunal
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
