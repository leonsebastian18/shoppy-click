import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();


export const ShoppingCartProvider = ({children}) => {
    //shopping cart -increment quantity
    
    const [count, setCount] = useState(0);
    
    //Product detail - open/close
    const [isProductDetailOpen, setProductDetailOpen] = useState(false);    
    const openProductDetail = () => setProductDetailOpen(true);
    const closeProductDetail = () => setProductDetailOpen(false);

        //Checkout side Menu - open/close
        const [isCheckoutSideMenuOpen, setCheckoutSideMenuOpen] = useState(false);    
        const openCheckoutSideMenu = () => setCheckoutSideMenuOpen(true);
        const closeCheckoutSideMenu = () => setCheckoutSideMenuOpen(false);
    
    //Product detail- show product
    const [productToShow, setProductToShow] = useState({});

    //Shopping cart-add products to cart
    const [cartProducts, setCartProducts] = useState([]);


    //shopping cart - order
    const [order, setOrder] = useState([]);
    


    return (

        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,

        }} >
            {children}
        </ShoppingCartContext.Provider>
        
    );
}