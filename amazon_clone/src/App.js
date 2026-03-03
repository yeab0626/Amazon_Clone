import './App.css';
import Carousel from './Components/Carousel/Carousel';
import Catagory from './Components/Catagory/Category.jsx'
import Header from './Components/Header/Header';
import Product from './Components/Product/Product.jsx';

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Catagory />
      <Product />
    </>
  );
}

export default App;
