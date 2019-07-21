import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import AddToCart from '../components/AddToCart';

class ProductCard extends React.Component {
  
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  render() {
    const { name, pricing } = this.props.product;

    return (
      <Card>
        <Card.Header> {name} </Card.Header>
        <Card.Body>
          <Card.Title> 
            <CurrencyFormat value={pricing} displayType={'text'} thousandSeparator={true} prefix={'$'} /> 
          </Card.Title>
          <AddToCart product={this.props.product}></AddToCart>
        </Card.Body>
      </Card>
    )
  }
}

export default ProductCard;