import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { API, RESOURCES } from './api/api';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => API.get(RESOURCES.PRODUCT)
    .then(response => {
      this.setState({products: response.data})
    });

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