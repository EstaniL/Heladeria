import { BrowserRouter, Navigate, Route, Routes  } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CartContainer from './components/CartContainer/CartContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContextProvider } from './context/CartContext';


function App() { 
   // estados 
    return (
        <BrowserRouter>
            <CartContextProvider>
                <NavBar />
                <div>
                    <Routes>
                        <Route  path='/' element={ <ItemListContainer/> } />
                        <Route  path='/categoria/:idCategory' element={ <ItemListContainer/> } />

                        <Route  path='/detalle/:idProducto' element={ <ItemDetailContainer /> } />
                        <Route  path='/cart' element={ <CartContainer />  } />
                        <Route  path='/ordenConfirmada' element={ <ItemListContainer/> } />                 

                        <Route path='*' element={ <Navigate to='/' /> } /> {/*Cuando se escriba una ruta que no esta definida, va a el home */}
                    </Routes>
                </div>               
            </CartContextProvider>
            
        </BrowserRouter>

       
    )
}

export default App
