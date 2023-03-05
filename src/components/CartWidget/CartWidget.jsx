
import { useCartContext } from "../../context/CartContext"

const CartWidget = () => {
  const {totalCount} = useCartContext()
  return (
    <>
        <div> {totalCount() !== 0 && totalCount()} 🛒</div>
    </>
  )
}

export default CartWidget