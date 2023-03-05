import { createContext, useState, useContext } from "react";

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({ children }) => {

    const [cartList, setCartList] = useState([])
    const addProduct = (newProducto) => {
        const idxProd = cartList.findIndex(product => product.id === newProducto.id)
        if (idxProd !== -1) {
            cartList[idxProd].cantidad += newProducto.cantidad
            setCartList([...cartList])
            return
        }

        setCartList([
            ...cartList,
            newProducto
        ])

    }

    const totalPrice = () => cartList.reduce((count, producto) => count += (producto.cantidad * producto.price), 0)

    const totalCount = () => cartList.reduce((count, producto) => count += producto.cantidad, 0)

    const deleteProduct = (id) => setCartList(cartList.filter(prod => prod.id !== id))


    const emptyCart = () => setCartList([])

    return (
        <CartContext.Provider value={{
            cartList,
            addProduct,
            emptyCart,
            totalPrice,
            totalCount,
            deleteProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}