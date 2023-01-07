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
import FormHelperText from '@material-ui/core/FormHelperText';
import * as Yup from 'yup';
import { showToast } from '../common/Toast';
import {
  addNewUser,
	updateUser,
} from '../../store/actions';
import { validateMail } from '../../helpers/general_helpers';

/**
 * Classe responsável por renderizar o formulário de cadastro de usuários
 */
class UserForm extends Component {
  
  constructor(props) {
    
    super(props);

    //faz o "bind" das funções
    this.createUser = this.createUser.bind(this);
		this.editUser = this.editUser.bind(this);
  }

  /**
   * Função que valida o formulário
   * @param {*} values dados do usuário
   * @returns true se o formulário estiver validado ou caso contrário false
   */
  validadeForm(values) {

    //obtém o email, login e senha informada
    const { mail, login, password } = values;
    //verifica se o email é válido
    if(!validateMail(mail)) {

      showToast('info', 'Terras App - Vendas', 'Email no formato inválido', 'toast-top-center', 5000);
      return false;
    }
    //verifica se o login é válido
    else if(login.length < 6 || login.length > 16) { 
      
      showToast('info', 'Terras App - Vendas', 'O login deve conter entre 6 e 16 caracteres', 'toast-top-center', 5000);
      return false;
    }
    //verifica se a senha é válida
    else if(password.length < 6 || password.length > 16) {
      
      showToast('info', 'Terras App - Vendas', 'A senha deve conter entre 6 e 16 caracteres', 'toast-top-center', 5000);
      return false;
    }
    
    return true;
  }

   /**
   * Função que cadastra um usuário
   * @param {*} values informações do usuário
   */
  createUser(values) {

    //se o formulário foi validado com sucesso
    if(this.validadeForm(values)) {
    
      //invoca a action que realiza o cadastro
      this.props.addNewUser(values, this.props.history);
    }
	}

  /**
   * Função que altera o cadastro de um usuário
   * @param {*} values informações do usuário a ser alterado
   */
	editUser(values) {

    const { loginStore } = this.props;
    const { token } = loginStore;

    //se o formulário foi validado com sucesso
    if(this.validadeForm(values)) {
		
      //invoca a action que realiza a alteração do cadastro
      this.props.updateUser(values, token);
    }
	}

  /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
	render() {
    
    //obtém as informações do usuário logado
    const { user } = this.props.loginStore;
    const { mode } = this.props;
    
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
                        userId: 
                          (mode === 'edit' && user && user.userId) || '',
                        name: 
                          (mode === 'edit' && user && user.name) || '',
                        mail:
                          (mode === 'edit' && user && user.mail) || '',
                        login:
                          (mode === 'edit' && user && user.login) || '',
                        password:
                          (mode === 'edit' && user && user.password) || '',
                      }}
                      //valida as informações do formulário
                      validationSchema={Yup.object().shape({
                        name: Yup.string().required(
                          'Por favor, informe seu nome'
                        ),
                        mail: Yup.string().required(
                          'Por favor, informe o seu email'
                        ),
                        login: Yup.string().required(
                          'Por favor, informe o seu login'
                        ),
                        password: Yup.string().required(
                          'Por favor, informe a senha'
                        ),
                      })}
                      onSubmit={values => {
                      
                        //ao submeter o formulário verifica o modo do formulário (novo cadastro ou edição e invoca a função correspondente)
                        if (mode === 'edit') {
                          
                          this.editUser(values);
                        }
                        else {
                          
                          this.createUser(values);
                        }
                      }}>
                      {({ isSubmitting, values, handleChange, errors, touched, setFieldValue }) => (
                        <Form>
                          <Row>
                            <Col lg='12'>
                              <h5>
                                <span>
                                  Informe os seus dados e clique em <b>SALVAR</b> para finalizar a operação
                                </span>
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg='12' className='mt-2'>
                              <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Nome*"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}/>
                            </Col>
                          </Row>
                          <Row className='mt-4'>
                            <Col lg='12'>
                              <TextField
                                fullWidth
                                id="mail"
                                name="mail"
                                label="Email*"
                                type="text"
                                value={values.mail}
                                onChange={handleChange}
                                error={touched.mail && Boolean(errors.mail)}
                                helperText={touched.mail && errors.mail}/>
                            </Col>
                          </Row>
                          <Row className='mt-3'>
                            <Col lg='12' className='mt-2'>
                              <TextField
                                fullWidth
                                id="login"
                                name="login"
                                label="Login*"
                                type="text"
                                value={values.login}
                                onChange={handleChange}
                                error={touched.login && Boolean(errors.login)}
                                helperText={touched.login && errors.login}/>
                              <FormHelperText id="component-helper-text">Entre 6 e 16 caracteres</FormHelperText>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg='12' className='mt-2'>
                              <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Senha*"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}/>
                              <FormHelperText id="component-helper-text">Entre 6 e 16 caracteres</FormHelperText>
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
UserForm.propTypes = {
  loginStore: PropTypes.any,
  mode: PropTypes.any,
  history: PropTypes.object,
  addNewUser: PropTypes.func,
	updateUser: PropTypes.func,
  className: PropTypes.any,
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = (state) => ({
  loginStore: state.loginStore
});

/**
 * Mapeia com o componente as actions necessárias para o cadastro e alteração
 */
const mapDispatchToProps = {
  addNewUser,
	updateUser,
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserForm));