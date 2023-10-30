import { Fragment } from "react";
import {Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
// import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";
import { useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
    // const { currentUser } = useContext(UserContext);
    // const { isCartOpen } = useContext(CartContext);
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    return <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks>
            <NavLink to="/shop">
                SHOP
            </NavLink>
            {
                currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>{' '}SIGN OUT{' '}</NavLink>
                )
                    : 
                     (<NavLink to="/auth">
                Sign In
            </NavLink>)
                
            }
            <CartIcon/>
            </NavLinks>
            {isCartOpen && <CartDropdown/>} 
        </NavigationContainer>
      <Outlet/>
    </Fragment>
  };

  export default Navigation;