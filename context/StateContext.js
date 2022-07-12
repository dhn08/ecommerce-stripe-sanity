import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, settotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  useEffect(() => {
    const cItem = JSON.parse(localStorage.getItem("cartItems"));
    const tprice = JSON.parse(localStorage.getItem("totalPrice"));
    const tqty = JSON.parse(localStorage.getItem("totalQuantities"));
    const qt = JSON.parse(localStorage.getItem("qty"));
    console.log("hello from first");
    console.log("cartitems: start:", cartItems);
    if (cItem) {
      console.log("hello from citem");
      console.log("citem", cItem);
      setCartItems(cItem);
      console.log("After citem set :", cartItems);
    }
    if (tprice) {
      console.log("hello from tpricwe");
      console.log("trpice", tprice);
      setTotalPrice(tprice);
      console.log("After trpice set :", totalPrice);
    }
    if (tqty) {
      console.log("hello from tqty");

      settotalQuantities(tqty);
    }
    if (qt) {
      console.log("hello from qt");

      setQty(qt);
    }
  }, []);

  useEffect(() => {
    console.log("hello from state context");
    console.log("cartitems:", cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("totalprice:", totalPrice);

    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
    localStorage.setItem("qty", JSON.stringify(qty));
  }, [cartItems, totalPrice, totalQuantities, qty]);
  const onAdd = (product, qty) => {
    const checkProductInCart = cartItems.findIndex(
      (item) => item._id === product._id
    );
    setTotalPrice((prevPrice) => prevPrice + qty * product.price);
    settotalQuantities((prevQty) => prevQty + qty);

    // localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    // localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));

    if (checkProductInCart >= 0) {
      console.log("cpi:", checkProductInCart);
      let tempcart = [...cartItems];
      tempcart[checkProductInCart].quantity += 1;
      // const updatedCartItems = cartItems.map((item) => {
      //   if (item._id === product._id)
      //     return {
      //       ...item,
      //       quantity: item.quantity + qty,
      //     };
      // });
      // console.log(updatedCartItems);
      setCartItems(tempcart);
      // localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log(cartItems);
    } else {
      product.quantity = qty;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart`);
  };
  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    console.log(foundProduct);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    setTotalPrice(
      (prevTotal) => prevTotal - foundProduct.price * foundProduct.quantity
    );
    settotalQuantities((prevQTy) => prevQTy - foundProduct.quantity);
    setCartItems(newCartItems);
  };
  const toggleCartItemQuantity = (id, value) => {
    const tempcart = [...cartItems];

    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    // console.log("tempcart", tempcart);
    // console.log("tempindesx", tempcart[index]);
    // const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value == "inc") {
      tempcart[index].quantity += 1;
      setCartItems([...tempcart]);
      // setCartItems([
      //   { ...foundProduct, quantity: foundProduct.quantity + 1 },
      //   ...newCartItems,
      // ]);
      setTotalPrice((prevTotal) => prevTotal + foundProduct.price);
      settotalQuantities((prevQTy) => prevQTy + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        tempcart[index].quantity -= 1;
        setCartItems([...tempcart]);
        // setCartItems([
        //   { ...foundProduct, quantity: foundProduct.quantity - 1 },
        //   ...newCartItems,
        // ]);
        setTotalPrice((prevTotal) => prevTotal - foundProduct.price);
        settotalQuantities((prevQTy) => prevQTy - 1);
      }
    }
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setshowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        settotalQuantities,
        setQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
