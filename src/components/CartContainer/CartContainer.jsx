import { addDoc, collection, doc, getFirestore, updateDoc, getDocs, query, where } from "firebase/firestore"
import { useState } from "react"
import { useCartContext } from "../../context/CartContext"
import "./style.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from "react-router-dom"
const CartContainer = () => {


    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        repetirEmail: ''
    })
    const [pedido, setPedido] = useState(false)
    const [id, setId] = useState()
    const { cartList, emptyCart, totalPrice, deleteProduct } = useCartContext()



    //agregar orden
    cartList.map((obj) => [{ id: obj.id, name: obj.name }])

    const insertarOrder = (evt) => {
        console.log(cartList) //Ya tiene todo lo de la base de datos
        console.log(cartList[0].id)
        console.log("confirmo")

        evt.preventDefault()
        if (formData.email != formData.repetirEmail) {
            alert("El mail es distinto")
            evt.preventDefault()
        }
        else {

            const order = {}
            // validar formData
            order.buyer = formData
            order.isActive = true
            order.items = cartList.map(({ id, name, price }) => ({ id, name, price }))
            order.total = totalPrice()


            //Firestore
            const db = getFirestore()
            const ordersCollection = collection(db, 'orders')
            const productsCollection = collection(db, 'productos')
            getDocs(query(productsCollection, where('name', '==', cartList[0].name)))
                .then(resp => console.log(resp.docs))


            // insertar en firestores - create
            const documento = collection(db, 'productos')
            console.log(documento)
            //
            addDoc(ordersCollection, order)
                .then(resp => setId(resp.id))
                .catch(err => console.log(err))
                .finally(() => {
                    emptyCart()
                    setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        repetirEmail: ''
                    })
                    setPedido(true)
                })
            // actualizar update 
            for (let i = 0; i < cartList.length; i++) {
                const productUpdate = doc(db, 'productos', cartList[i].id)
                updateDoc(productUpdate, {
                    stock: cartList[i].stock - cartList[i].cantidad
                })
                    .then(() => console.log('producto actualizado'))

            }



            // console.log(order)
            return (<Navigate to='/ordenConfirmada' />)

        }
    }

    const handleOnChange = (evt) => {
        // console.log(evt.target.name) // nombre del input 
        // console.log(evt.target.value) // valor del input
        console.log(evt)
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }

    console.log(formData)
    return (
        <div>
            {!pedido &&
                <section className='cart-items'>
                    <div className='container d_flex'>
                        <div className='cart-details'>
                            {cartList.length === 0 &&
                                <>
                                    <h1 className='no-items product'>No Items are add in Cart</h1>
                                    <Link className="btn btn-outline-primary" to='/'>
                                        Continuar comprando
                                    </Link></>}
                            {cartList.map(producto => {
                                const productQty = producto.price * producto.cantidad
                                return (
                                    <>
                                        <div className='cart-list product d_flex' key={producto.id}>
                                            <div className='img'>
                                                <img src={producto.foto} alt='' />
                                            </div>
                                            <div className='cart-details'>
                                                <h3>{producto.name}</h3>
                                                <h4>
                                                    ${producto.price}.00 * {producto.cantidad}
                                                    <span>${productQty}.00</span>
                                                </h4>
                                            </div>
                                            <div className='cart-items-function'>
                                                <div className='removeCart'>
                                                    <button className='removeCart'>
                                                        <button className="btn btn-danger" onClick={() => deleteProduct(producto.id)}> X </button>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </>
                                )
                            })}
                            {cartList.length != 0 &&<button className="btn btn-outline-danger" onClick={emptyCart}>Vaciar Carrito</button>}
                            
                        </div>


                        <div className='cart-total product'>
                            <h2>Cart Summary</h2>
                            <div className=' d_flex'>

                                <h4>Precio Total :</h4>
                                <h3>{totalPrice() !== 0 && `$${totalPrice()}.00`}</h3>

                            </div>

                            <Form onSubmit={insertarOrder}>
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Control type="text" name="name" placeholder="Nombre" onChange={handleOnChange} value={formData.name} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicTelefono">
                                    <Form.Control type="text" name="phone" placeholder="Telefono" onChange={handleOnChange} value={formData.phone} required pattern="[0-9]{0,15}" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleOnChange} value={formData.email} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmailValid">
                                    <Form.Control type="email" name="repetirEmail" placeholder="Valida tu email" onChange={handleOnChange} value={formData.repetirEmail} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={cartList.length === 0 ? true : false}>
                                    Confirmar Pedido
                                </Button>


                            </Form>


                        </div>
                    </div>


                </section>
            }
            {pedido && <section className='cart-items'>
                <div className='container d_flex'>
                    <div className='cart-details'>
                        <p className='no-items product'>Su pedido fue realizado, su id es: {id}</p>
                    </div>
                </div>
            </section>}

        </div>
    )
}

export default CartContainer