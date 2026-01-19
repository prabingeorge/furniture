import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    localStorage.getItem("selectedCategoryId") !== undefined
      ? parseInt(localStorage.getItem("selectedCategoryId"))
      : 2
  );

  const addSelectedCategoryToCart = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // const addToCart = (item) => {
  //   setCartItems([{ ...item, quantity: 1 }]);
  // };

  const addToCart = (item) => {
    const isCartItem = cartItems.find((cartItem) => cartItem.categoryId === item.categoryId);

    if (isCartItem) {
      const isCartListItem = cartItems.find((cartItem) => cartItem.category_list_id === item.category_list_id);
      if (isCartListItem) {

        const isCartListItemsItem = cartItems.find((cartItem) => cartItem.category_list_item_id === item.category_list_item_id);
        if (isCartListItemsItem) {
          cartItems.map((cartItem) => {
            if (cartItem.category_list_item_id == item.category_list_item_id) {
              return { ...cartItem, quantity: cartItem.quantity++ };
            }
            return cartItem;
          });
          setCartItems([...cartItems]);
        } else {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }

    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => (cartItem.categoryId === item.categoryId && cartItem.category_list_id === item.category_list_id));

    // if (isItemInCart && isItemInCart.quantity === 1) { // Check if the item is in the cart and its quantity is 1
    if (isItemInCart) {
      setCartItems(cartItems.filter((cartItem) => cartItem.category_list_item_id !== item.category_list_item_id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.categoryId === item.categoryId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addCartQuantityCount = (item, qty) => {
    const isCartItem = cartItems.find((cartItem) => (cartItem.categoryId === item.categoryId && cartItem.category_list_id === item.category_list_id ));

    if (isCartItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.category_list_item_id === item.category_list_item_id
            ? { ...cartItem, quantity: qty }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const totalCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("selectedCategoryId", selectedCategoryId);
  }, [selectedCategoryId]);

  // useEffect(() => {
  //   const cartItemString = localStorage.getItem("cartItems");

  //   if (cartItemString) {
  //     const parsedCartItem = JSON.parse(cartItemString);

  //     setCartItems(parsedCartItem);
  //   }
  // }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        addCartQuantityCount,
        totalCartCount,
        selectedCategoryId,
        addSelectedCategoryToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node, // Define PropTypes for children prop
};