import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import ItemList from "../ItemList/ItemList"
import { Loading } from "../Loading/Loading"

export const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const { idCategory } = useParams()

  useEffect(() => {
    setLoading(true)
    const db = getFirestore()
    const queryCollections = collection(db, 'productos')
    const queryFilter = idCategory ? query(queryCollections, where('categoria', '==', idCategory)) : queryCollections

    getDocs(queryFilter)
      .then(resp => setProductos(resp.docs.map(product => ({ id: product.id, ...product.data() }))))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [idCategory])


  return (
    loading
      ?
      <Loading />
      :
      <>
        <div className="container py-5 ">
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 fw-bolder text-center">{idCategory?idCategory.toUpperCase():"Bienvenidos"}</h1>
              <hr />
            </div>
          </div>
          <div className="row justify-content-center">
            {loading ? <Loading/> :<ItemList productos={productos}/> }
          </div>
        </div>

      </>
  )
}


