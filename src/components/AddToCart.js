import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { addToCart } from './actions/CartActions';
import { Success, Error } from './Toasts';
import { API, RESOURCES } from './api/api';

class AddToCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  calculateCart = cart => API.post(RESOURCES.CART, cart);

  onIncrement = value => this.setState({quantity: value + 1})

  onDecrement = value => value <= 1 ? 1 : this.setState({quantity: value - 1})
  
  onCartPostSuccessCallBack = response => {
    const { add } = this.props;
    add(response.data);
    Success("Produto adicionado com sucesso!");
  }

  onErrorCallback = error => Error(error.message)

  onClickAddCart = (product, quantity) => {
    const { cart } = this.props;
    const itemOnCart = cart.items.find(cartProduct => cartProduct.item.id === product.id);
    if (itemOnCart) {
      itemOnCart.quantity = itemOnCart.quantity + quantity;
      this.calculateCart(cart).then(this.onCartPostSuccessCallBack, this.onCartPostSuccessCallBack);
    } else {
      cart.items = [...cart.items, { item: product, quantity }];
      this.calculateCart(cart).then(this.onCartPostSuccessCallBack, this.onErrorCallback);
    }
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;
    return (
      <Container style={{ alignContent: 'center' }}>
        <Row>
          <Col>
            <Button onClick={() => this.onDecrement(quantity)} style={styles.buttonContainer}
              variant="outline-primary"> <FontAwesomeIcon icon={faMinus} /> </Button>
            <Button onClick={() => this.onIncrement(quantity)} style={styles.buttonContainer}
              variant="outline-primary"> <FontAwesomeIcon icon={faPlus} /> </Button>
            Quantidade: { quantity }
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" style={styles.addToCartButton}
              onClick={() => this.onClickAddCart(product, quantity)}> Adicionar ao Carrinho </Button>
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