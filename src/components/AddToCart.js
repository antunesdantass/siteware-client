import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { addToCart } from './actions/CartActions';
import { Success } from './Toasts';
const axios = require('axios');

class AddToCart extends React.Component {

  state = {
    quantity: 1
  }

  calculateCart = cart => axios.post('http://localhost:8080/cart', cart);

  onIncrement = value => this.setState({quantity: value + 1})

  onDecrement = value => value <= 1 ? 1 : this.setState({quantity: value - 1})

  onClickAddCart = (product, quantity) => {
    const { cart, add } = this.props;
    const itemOnCart = cart.items.find(cartProduct => cartProduct.item.id === product.id);
    if (itemOnCart) {
      itemOnCart.quantity = itemOnCart.quantity + quantity;
      this.calculateCart(cart).then(result => add(result.data) && Success("Produto adicionado com sucesso!"));
    } else {
      cart.items = [...cart.items, { item: product, quantity }];
      this.calculateCart(cart).then(result => add(result.data) && Success("Produto adicionado com sucesso!"));
    }
  }

  render() {
    const { product } = this.props
    return (
      <Container style={{ alignContent: 'center' }}>
        <Row>
          <Col>
            <Button onClick={() => this.onDecrement(this.state.quantity)} style={styles.buttonContainer}
              variant="outline-primary"> <FontAwesomeIcon icon={faMinus} /> </Button>
            <Button onClick={() => this.onIncrement(this.state.quantity)} style={styles.buttonContainer}
              variant="outline-primary"> <FontAwesomeIcon icon={faPlus} /> </Button>
            Quantidade: { this.state.quantity }
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" style={styles.addToCartButton}
              onClick={() => this.onClickAddCart(product, this.state.quantity)}> Adicionar ao Carrinho </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const propTypes = {
  product: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    add: cart => dispatch(addToCart(cart))
  } 
}

const styles = {
  buttonContainer: {
    marginRight: 10
  },
  addToCartButton: {
    marginTop: 10
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);