import React from 'react';
import { connect } from 'react-redux';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { addToCart } from './actions/CartActions';
const _ = require('lodash');
const axios = require('axios');

class Cart extends React.Component {

  removeItem = item => {
    const cart = Object.assign(this.props.cart, {});
    const indexOfItem = _.findIndex(cart.items, cartItem => cartItem.item.id === item.item.id);
    cart.items.splice(indexOfItem, 1);
    axios.post("http://localhost:8080/cart", cart).then(response => {
      this.props.add(response.data);
    });
  }

  render() {
    const { cart } = this.props;
    return(
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> Nome do Produto </th>
              <th> Preço por Item </th>
              <th> Quantidade no Carrinho </th>
              {cart.items.length ? <th></th> : undefined}
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td> {item.item.name} </td>
                <td> {item.item.pricing} </td>
                <td> {item.quantity} </td>
                <td> <Button onClick={() => this.removeItem(item)} variant="outline-danger"> Remover Item </Button> </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Alert variant="primary">
          Total do Carrinho: 
          <CurrencyFormat value={cart.total} displayType={'text'} thousandSeparator={true} prefix={' R$ '} />
        </Alert>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    add: cart => dispatch(addToCart(cart))
  } 
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);