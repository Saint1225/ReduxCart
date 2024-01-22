import { showCartActions } from "./show-cart";
import { cartActions } from "./shopping-item";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-2bc42-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetching data failed...");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceItem({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showCartActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-2bc42-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("");
      }

      dispatch(
        showCartActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        showCartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
