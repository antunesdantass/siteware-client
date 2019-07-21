import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
const axios = require('axios');

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  };

  componentDidMount() {
    axios.get("http://localhost:8080/product")
      .then(result => {
        this.setState({products: result.data})
      });
  }

  render() {
    const { products } = this.state;
    return(
      <Container style={styles.container}>
        {products.map((product, index) => (
        <Row key={index} style={styles.line}>
          <Container style={styles.card}>
            <ProductCard product={product}></ProductCard>
          </Container>
        </Row>
        ))}
      </Container>
    )
  }
}

const styles = {
  card: {
    marginRight: 30,
    marginBottom: 30
  },
  container: {
    columnCount: 3
  },
  line: {
    display: "inline-block"
  }
}

export default ProductList;