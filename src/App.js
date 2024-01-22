import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showCartActions } from "./store/show-cart";
import { sendCartData, fetchCartData } from "./store/shopping-item-actions";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const isShowCart = useSelector((state) => state.cartVisible.isShowCart);
  const notification = useSelector((state) => state.cartVisible.notification);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(showCartActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending cart data!'
    //   }));
    //   const response = await fetch(
    //     "https://react-http-2bc42-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('');
    //   }

    //   dispatch(showCartActions.showNotification({
    //     status: 'success',
    //     title: 'Success',
    //     message: 'Sent cart data successfully!'
    //   }));
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }

    // sendCartData().catch((error) => {
    //   dispatch(showCartActions.showNotification({
    //     status: 'error',
    //     title: 'Error!',
    //     message: 'Sending cart data failed!'
    //   }));
    // });
    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
