import React from 'react';
import { Form, FormGroup, Button, Container, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { API, RESOURCES, removeEmptyProps } from './api/api';
import { Success } from './Toasts';
const _ = require('lodash');

class CreateProduct extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pricing: undefined,
      discount: "",
      discounts: [],
      products: []
    };
  }

  componentDidMount() {
    this.loadProducts();
    this.loadDiscounts();
  }

  loadDiscounts = () => API.get(RESOURCES.DISCOUNT)
    .then(response => this.setState({discounts: response.data}))

  loadProducts = () => API.get(RESOURCES.PRODUCT)
    .then(response => this.setState({ products: response.data }))
  
  updateProduct = (product, id) => API.put(`${RESOURCES.PRODUCT}/${id}`, removeEmptyProps(product))
    .then(() => {
      Success("Produto atualizado com sucesso!");
    })

  onChangeName = event => this.setState({ name: event.target.value })

  onChangePricing = event => this.setState({ pricing: event.floatValue })

  onChangeDiscount = discount => this.setState({ discount })

  onUpdateProperty = (property, entity, newValue) => {
    const indexOfEntity = _.findIndex(this.state.products, product => product.id === entity.id);
    const products = [...this.state.products];
    products[indexOfEntity][property] = newValue;
    this.setState({products});
  }

  form = React.createRef()

  submit = event => {
    const { name, pricing, discount } = this.state;
    event.preventDefault();
    return API.post(RESOURCES.PRODUCT, removeEmptyProps({
      name, pricing, discount}))
       .then(response => {
          Success("Produto cadastrado com sucesso!");
          this.form.current.reset();
          this.setState({
            name: "",
            pricing: 0,
            discount: "",
            products: [...this.state.products, response.data]
          });
    })
  }
  
  render() {
    const { discounts, pricing } = this.state;
    return (
      <Container>
        <h1> Cadastrar Produto </h1>
        <Form ref={this.form} onSubmit={this.submit.bind(this)}>
          <FormGroup controlId="productsName">
            <Form.Label> Nome do Produto </Form.Label>
            <Form.Control onChange={this.onChangeName} type="text" required placeholder="Nome do Produto" />
          </FormGroup>
          <FormGroup controlId="pricing">
            <Form.Label> Preço do Produto </Form.Label>
            <CurrencyFormat id="pricing" className="form-control" required value={pricing}
            onValueChange={this.onChangePricing} thousandSeparator={true} prefix={'$'}/>
          </FormGroup>
          <Form.Group controlId="selectDiscount">
            <Form.Label>Selecionar Promoção</Form.Label>
            <Form.Control as="select">
              <option onClick={() => this.onChangeDiscount()} ></option>
              {discounts.map((discount, index) => 
                <option onClick={() => this.onChangeDiscount(discount.discount)} key={index}> {discount.name} </option>
              )}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
        <h1 style={{ marginTop:30 }}> Produtos Cadastrados </h1>
        <Table striped bordered hover style={{ marginTop: 30 }}>
          <thead>
            <tr>
              <th> Identificador </th>
              <th> Nome do Produto </th>
              <th> Preço por Item </th>
              <th> Desconto </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => (
              <tr key={index}>
                <td> { product.id } </td> 
                <td> 
                  <input className="form-group" type="text" value={product.name} 
                    onChange={event => this.onUpdateProperty("name", product, event.target.value)}/> 
                </td>
                <td> 
                  <CurrencyFormat id="pricing" className="form-control" required value={product.pricing}
                    onValueChange={event => this.onUpdateProperty("pricing", product, event.floatValue)} 
                    thousandSeparator={true} prefix={'$'}/>
                </td>
                <td>
                  <select value={product.discount || ""}
                    onChange={() => undefined}>
                      <option onClick={() => this.onUpdateProperty("discount", product, "")} value=""> </option>
                    {discounts.map((discount, index) =>
                      <option value={discount.discount} 
                        onClick={() => this.onUpdateProperty("discount", product, discount.discount)} 
                        key={index}> {discount.name} </option>
                    )}
                  </select>
                </td>
                <td>
                  <Button onClick={() => this.updateProduct(product, product.id)} variant="success"> Atualizar </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default CreateProduct;