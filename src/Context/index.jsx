import { createContext, useState, useEffect } from "react";

import { apiUrl } from "../Api";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }
}


export const ShoppingCartProvider = ({children}) => {
  //my account
  const [account, setAccount] = useState({});
  
  //sign out
  const [signOut, setSignOut] = useState(false);
  
  
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
    const [filteredItems, setFilteredItems] = useState(null);

    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    //Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)
    
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
    
      const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
      }
    
      const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
          return filteredItemsByTitle(items, searchByTitle)
        }
    
        if (searchType === 'BY_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory)
        }
    
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
    
        if (!searchType) {
          return items
        }
      }

      useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
      }, [items, searchByTitle, searchByCategory])


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
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut,

        }} >
            {children}
        </ShoppingCartContext.Provider>
        
    );
}