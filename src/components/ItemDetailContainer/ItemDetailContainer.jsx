import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({})
  const { idProducto } = useParams()
  console.log(idProducto)
  console.log(product)
  useEffect(() => {
    const db = getFirestore()
    const query = doc(db, 'productos', idProducto)
    getDoc(query)
      .then(resp => setProduct({ id: resp.id, ...resp.data() }))
  }, [])

  return (
    <div className="container text-center mt-4">
      <div className="row text-center">
        <ItemDetail product={product} />
      </div>
    </div>
  )
}

export default ItemDetailContainer
