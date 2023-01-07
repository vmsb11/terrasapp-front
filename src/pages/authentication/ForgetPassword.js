import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { 
  Card, 
  CardBody, 
  Col, 
  Container, 
  Row 
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import { showToast } from '../../components/common/Toast';
import {
  recoveryUserPassword
} from "../../store/auth/login/actions";
import { validateMail } from 'helpers/general_helpers';
import logo from '../../assets/images/terrasapp.png';

/**
 * Classe que renderiza a página de recuperação de senha do usuário
 */
class ForgetPassword extends Component {
  
  constructor(props) {
    
    super(props);
    
    //estado que armazena as informações do email
    this.state = {
      mail: ""
    };

    //faz o bind das funções
    this.recoverPassword = this.recoverPassword.bind(this);
  }

  /**
   * Método que executa a recuperação de senha
   * @param {*} values informações do formulário
   */
  recoverPassword(values) {

    const { recoveryUserPassword } = this.props;

    //valida o email
    if(!validateMail(values.mail)) {

      showToast('info', 'Usuário', 'Email no formato inválido', 'toast-top-center', 5000);
    }
    else {
    
      //invoca a action que realiza a recuperação de senha
      recoveryUserPassword(values);
    }
  }

  /**
   * Método que faz a renderização da página
   * @returns página renderizada
   */
  render() {

    //renderiza o formulário de recuperação de senha
    return (
      <React.Fragment>
        <div className='account-pages my-5 pt-sm-5'>
          <Container>
            <Row className='justify-content-center'>
              <Col md={8} lg={6} xl={5}>
                <Card className='overflow-hidden'>
                  <CardBody className='pt-0'>
                    <div>
                      <div className="text-center mt-3">
                        <img 
                          src={logo}
                          width={128}
                          height={72}/>
                        <h3><b>Recuperação de senha</b></h3>
                        <h5>
                          <span>Informe o seu email para recuperar a sua senha.</span>
                        </h5>
                      </div>
                    </div>
                    <div className='p-2'>
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          mail:
                            (this.state && this.state.mail) || '',
                        }}
                        //valida as informações do formulário
                        validationSchema={Yup.object().shape({
                          mail: Yup.string().required(
                            'Por favor, informe o seu email'
                          ),
                        })}
                        onSubmit={values => {
                          //ao submeter o formulário chama a função de recuperação de senha
                          this.recoverPassword(values);
                        }}
                      >
                        {({ isSubmitting, values, handleChange, errors, touched, setFieldValue }) => (
                          <Form className='form-horizontal'>
                            <div className='mb-3'>
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
                            </div>
                            <div className='text-end'>
                              <button
                                className='btn btn-primary w-md'
                                type='submit'>
                                <i className="mdi mdi-send font-size-18 me-2"/>  
                                Reenviar Senha
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className='mt-5 text-center'>
                  <p>
                    Voltar para {' '}
                    <Link to='login' className='fw-medium text-primary'>
                      Login
                    </Link>{' '}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Terras App - Gerenciamento
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
ForgetPassword.propTypes = {
  history: PropTypes.object,
  recoveryUserPassword: PropTypes.func
};

/**
 * Mapeia com a página as actions necessárias para o login (no caso, só a action que efetivamente realiza a recuperação de senha)
 */
const mapDispatchToProps = {
  recoveryUserPassword
}

/**
 * Mapeia o estado do login da aplicação controlado pelo redux com a página
 * @param {*} state estado do login da aplicação
 * @returns o estado do login da aplicação
 */
const mapStateToProps = (state) => {
  return ({
    login: state.login
  })
};

//conect a página com o redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetPassword));