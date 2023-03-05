import { useState } from "react"
import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import ItemCount from "../ItemCount/ItemCount"

const ItemDetail = ({ product }) => {
    const [isCount, setIsCount] = useState(true)
    const { addProduct } = useCartContext()

    const onAdd = (cant) => {
        // agragar al carrito     
        addProduct({ ...product, cantidad: cant })
        setIsCount(false)
    }
    return (


        <>
            <div className="col-md-6">
                <img src={product.foto} alt={product.name} height="400px" width="400px" />
            </div>
            <div className="col-md-6">
                <div className="text-center">
                    <h4 className="text-uppercase text-black-50">{product.categoria}</h4>
                    <h1 className="display-5">{product.name}</h1>
                    <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
                </div>
                {
                    isCount ?
                        <ItemCount initial={1} stock={product.stock} onAdd={onAdd} />
                        :
                        <>
                            <Link className="btn btn-outline-primary" to='/cart'>
                                Ir al carrito
                            </Link>
                            <Link className="btn btn-primary" to='/'>
                                Continuar comprando
                            </Link>

                        </>
                }

            </div>
        </>
    )
}

export default ItemDetail