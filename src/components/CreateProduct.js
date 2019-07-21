import React from 'react';
import { Form, FormGroup, Button, Container, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { toast } from 'react-toastify';
const axios = require('axios');
const _ = require('lodash');

class CreateProduct extends React.Component {
  initialState = {
    name: "",
    pricing: 0.0,
    discount: "",
    discounts: [],
    products: []
  }

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount() {
    this.loadProducts();
    this.loadDiscounts();
  }

  loadDiscounts = () => axios.get("http://localhost:8080/discount")
    .then(response => this.setState({discounts: response.data}))

  loadProducts = () => axios.get("http://localhost:8080/product")
    .then(response => this.setState({ products: response.data }))
  
  updateProduct = (product, id) => axios.put(`http://localhost:8080/product/${id}`, product)
    .then(response => {
      this.notify("Produto atualizado com sucesso!");
    })

  onChangeName = event => this.setState({ name: event.target.value })

  onChangePricing = pricing => this.setState({ pricing: pricing.floatValue })

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
    return axios.post("http://localhost:8080/product", _.omitBy({
      name, pricing, discount
    }, field => _.isUndefined(field) || (_.isString(field) && _.isEmpty(field)))).then(response => {
      this.notify("Produto cadastrado com sucesso!");
      this.form.current.reset();
      this.setState({
        name: "",
        pricing: 0,
        discount: "",
        products: [...this.state.products, response.data]
      });
    })
  }

  notify = message => toast.success(message);
  
  render() {
    const { discounts, pricing } = this.state;
    return (
      <Container>
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