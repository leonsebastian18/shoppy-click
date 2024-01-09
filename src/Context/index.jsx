import { createContext, useState, useEffect } from "react";

import { apiUrl } from "../Api";

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

    //Get products
    const [items, setItems] = useState(null);
    const [filteredItems, setfilteredItems] = useState(null);

    //
    const [searchByTitle, setSearchByTitle] = useState(null)
    
    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await 
            fetch (`${apiUrl}`) 
              const data = await 
              response.json()
              setItems(data)
          } catch (error) {
            console.error(`oh no, ocurrió un error: ${error}`);
          }
        }
       fetchData()
    }, []);
  

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    useEffect(() => {
        if (searchByTitle) setfilteredItems(filteredItemsByTitle(items, searchByTitle))

    }, [items, searchByTitle])


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
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,

        }} >
            {children}
        </ShoppingCartContext.Provider>
        
    );
}