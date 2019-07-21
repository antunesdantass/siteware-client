import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import Cart from './components/Cart';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <BrowserRouter>
        <Container>
          <AppNavbar></AppNavbar>
        </Container>
        <Container style={styles.contentContainer}>
          <Route exact path="/" component={ProductList}/>
          <Route exact path="/create" component={CreateProduct}/>
          <Route exact path="/cart" component={Cart}/>
        </Container>
      </BrowserRouter>        
      <ToastContainer/>
    </div>
  );
}

const styles = {
  contentContainer: {
    paddingTop: 100
  }
}

export default App;
