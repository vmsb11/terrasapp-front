import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row
} from 'reactstrap';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import {
  addNewSale,
	updateSale
} from '../../store/actions';

/**
 * Classe responsável por renderizar o formulário de cadastro de vendas
 */
class SaleForm extends Component {
  
  constructor(props) {
    
    super(props);

    //faz o "bind" das funções
    this.createSale = this.createSale.bind(this);
		this.editSale = this.editSale.bind(this);
  }

  /**
   * Função que cadastra uma venda
   * @param {*} values informações da venda
   */
  createSale(values) {

    const { loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que realiza o cadastro
    this.props.addNewSale(values, token);
  }

  /**
   * Função que altera o cadastro de uma venda
   * @param {*} values informações da venda a ser alterado
   */
	editSale(values) {

    const { loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que realiza a alteração do cadastro
    this.props.updateSale(values, token);
  }

  /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
	render() {
    
    //obtém as informações da venda e do usuário logado
    const { selectedSale } = this.props.saleStore;
    
    //renderiza o formulário de cadastro
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <Row className='mb-2'>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        saleId: 
                          (selectedSale && selectedSale.saleId) || '',
                        purchaserName: 
                          (selectedSale && selectedSale.purchaserName) || '',
                        itemDescription:
                          (selectedSale && selectedSale.itemDescription) || '',
                        itemPrice:
                          (selectedSale && selectedSale.itemPrice) || '',
                        purchaseCount:
                          (selectedSale && selectedSale.purchaseCount) || 1,
                        merchantAddress:
                          (selectedSale && selectedSale.merchantAddress) || '',
                        merchantName:
                          (selectedSale && selectedSale.merchantName) || '',
                      }}
                      validationSchema={Yup.object().shape({
                        purchaserName: Yup.string().required(
                          'Por favor, informe o nome do cliente'
                        ),
                        itemDescription: Yup.string().required(
                          'Por favor, informe a descrição do item'
                        ),
                        itemPrice: Yup.string().required(
                          'Por favor, informe o preço do item'
                        ),
                        purchaseCount: Yup.string().required(
                          'Por favor, informe a quantidade de itens'
                        ),
                        merchantAddress: Yup.string().required(
                          'Por favor, informe o endereço'
                        ),
                        merchantName: Yup.string().required(
                          'Por favor, informe o nome'
                        ),
                      })}
                      onSubmit={values => {
                      
                        if (selectedSale !== null) {
                          
                          this.editSale(values);
                        }
                        else {
                          
                          this.createSale(values);
                        }
                      }}>
                      {({ isSubmitting, values, handleChange, errors, touched, setFieldValue }) => (
                        <Form>
                          <Row>
                            <Col lg='12'>
                              <h5>
                                <span>
                                  Informe os dados da venda e clique em <b>SALVAR</b> para finalizar a operação
                                </span>
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg='6'>
                              <TextField
                                fullWidth
                                id="purchaserName"
                                name="purchaserName"
                                label="Cliente*"
                                type="text"
                                value={values.purchaserName}
                                onChange={handleChange}
                                error={touched.purchaserName && Boolean(errors.purchaserName)}
                                helperText={touched.purchaserName && errors.purchaserName}/>
                            </Col>
                            <Col lg='6'>
                              <TextField
                                fullWidth
                                id="itemDescription"
                                name="itemDescription"
                                label="Descrição do item*"
                                type="text"
                                value={values.itemDescription}
                                onChange={handleChange}
                                error={touched.itemDescription && Boolean(errors.itemDescription)}
                                helperText={touched.itemDescription && errors.itemDescription}/>
                            </Col>
                          </Row>
                          <Row className='mt-3'>
                             <Col lg='4' style={{marginTop: 8}}>
                              <TextField
                                id="itemPrice"
                                name="itemPrice"
                                type={"number"}
                                value={values.itemPrice} 
                                onChange={handleChange}
                                label="Preço unitário*"
                                error={touched.itemPrice && Boolean(errors.itemPrice)}
                                helperText={touched.itemPrice && errors.itemPrice}/>
                            </Col>
                            <Col lg='4' style={{marginTop: 8}}>
                              <TextField
                                id="purchaseCount"
                                name="purchaseCount"
                                type={"number"}
                                value={values.purchaseCount} 
                                onChange={handleChange}
                                label="Quantidade unitária*"
                                error={touched.purchaseCount && Boolean(errors.purchaseCount)}
                                helperText={touched.purchaseCount && errors.purchaseCount}/>
                            </Col>
                          </Row>
                          <Row className='mt-3'>
                            <Col lg='6'>
                              <TextField
                                fullWidth
                                id="merchantName"
                                name="merchantName"
                                label="Comerciante*"
                                type="text"
                                value={values.merchantName}
                                onChange={handleChange}
                                error={touched.merchantName && Boolean(errors.merchantName)}
                                helperText={touched.merchantName && errors.merchantName}/>
                            </Col>
                            <Col lg='6'>
                              <TextField
                                fullWidth
                                id="merchantAddress"
                                name="merchantAddress"
                                label="Endereço*"
                                type="text"
                                value={values.merchantAddress}
                                onChange={handleChange}
                                error={touched.merchantAddress && Boolean(errors.merchantAddress)}
                                helperText={touched.merchantAddress && errors.merchantAddress}/>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className='text-end mt-3'>
                                <button
                                  type='submit'
                                  className='btn btn-primary'>
                                  <i className='bx bx-save' /> Salvar
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SaleForm.propTypes = {
  saleStore: PropTypes.any,
  loginStore: PropTypes.any,
  interfaceStore: PropTypes.any,
  addNewSale: PropTypes.func,
	updateSale: PropTypes.func,
  className: PropTypes.any,
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = (state) => ({
  saleStore: state.saleStore,
  loginStore: state.loginStore,
  interfaceStore: state.interfaceStore
});

/**
 * Mapeia com o componente as actions necessárias para o cadastro e alteração
 */
const mapDispatchToProps = {
  addNewSale,
	updateSale
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaleForm));