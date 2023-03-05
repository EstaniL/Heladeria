import { memo } from "react"
import { Link } from "react-router-dom"
import "./Item.css"

const Item = memo(({ producto }) => {
  return (
    <>
      <div className="col-md-3 mb-4">
        <Link to={`/detalle/${producto.id}`}>
          <div class="card h-100 text-center p-4" key={producto.id}>
            <img src={producto.foto} class="card-img-top" alt={producto.name} height="250px" />
            <div class="card-body">
              <h5 class="card-title mb-0">{producto.name}</h5>
              <p class="card-text lead fw-bold">$ {producto.price}</p>
              <a href="#" class="btn btn-primary">Detalle</a>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

)

export default Item