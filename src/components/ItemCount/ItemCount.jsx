import { useState } from "react"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../ItemCount/itemCount.css"

const ItemCount = ({ initial = 1, stock = 10, onAdd }) => {
    const [count, setCount] = useState(initial)

    const handleSum = () => {
        if (count < stock) {
            setCount(count + 1)
        }
    }
    const handleSubtract = () => {
        if (count > initial) {
            setCount(count - 1)
        }
    }
    const handleTotal = (e) => {
        if (count < stock) {
            if (Number(e.target.value) <= 0) {
                setCount(0)
            }
            else {
                setCount(Number(e.target.value))
            }
        }
    }
    const handleOnAdd = () => {
        onAdd(count)
    }

    return (
        <div className="card ml-5 w-50 margin_left" >
            <div className="input-group">
                
                <input type="number" class="form-control" onChange={handleTotal} value={count == 0 ? "" : count} />
                <span className="input-group-text"><button className="btn w-100" onClick={handleSum}> + </button></span>
                <span className="input-group-text"><button className="btn w-100" onClick={handleSubtract}> - </button></span>
                
            </div>
            <label htmlFor="cantidad">Cupos Disponibles: {stock}</label>
            <div className="card-footer">
                <button className="btn w-100" onClick={handleOnAdd}>Agregar al carrito</button>
            </div>


        </div>
    )
}

export default ItemCount