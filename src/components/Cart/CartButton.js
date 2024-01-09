import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showCartActions } from '../../store/show-cart';

const CartButton = (props) => {

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const dispatch = useDispatch();

  const toggleCartHangler = () => {
    dispatch(showCartActions.toggleShowCart());
  }

  return (
    <button onClick={toggleCartHangler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
