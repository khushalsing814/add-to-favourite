import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Navbar from './navbar';
import Form from './form';
import Welcome_card_page from './welcome_card_page';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Errorpage from './errorpage';
import Productsdetails from './productsdetails';
import Favourite from './favourite';
import Counter from './counter';
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Welcome_card_page />}></Route>
            <Route path='/signup' element={<Form />}></Route>
            <Route path='/productDetails/:id' element={<Productsdetails />}></Route>
            <Route path='/favourite' element={<Favourite />}></Route>
            <Route path='/counter' element={<Counter/>}></Route>
            <Route path='*' element={<Errorpage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
