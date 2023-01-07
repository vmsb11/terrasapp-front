import React, { Component } from "react";
import PropTypes from "prop-types";
import { 
  Card, 
  CardBody, 
  Col, 
  Container, 
  Row 
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as Yup from "yup";
import { loginUser } from "../../store/actions";
import logo from "../../assets/images/terrasapp.png";

/**
 * Classe que renderiza a página de login do usuário
 */
class Login extends Component {
  
  constructor(props) {
    
    super(props);
    
    //estado que armazena as informações de login e senha
    this.state = {
      login: "",
      password: "",
    };

    //faz o bind das funções
    this.login = this.login.bind(this);
  }

  /**
   * Método que executa o login
   * @param {*} values dados do login
   * @param {*} history controle do histórico de navegação
   */
  login(values, history) {
    
    const { loginUser } = this.props;

    //invoca a action que realiza o login
    loginUser(values, history);
  }

  /**
   * Método que faz a renderização da página
   * @returns página renderizada
   */
  render() {
    
    //renderiza o formulário de login
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <div className="text-center mt-3">
                        <img 
                          src={logo}
                          width={128}
                          height={72}/>
                        <h3><b>Bem-vindo de volta</b></h3>
                        <h5>
                          <span>Faça o seu login para acessar o sistema.</span>
                        </h5>
                      </div>
                    </div>
                    <div className="p-2">
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          login: (this.state && this.state.login) || "",
                          password: (this.state && this.state.password) || "",
                        }}
                        //valida as informações do login
                        validationSchema={Yup.object().shape({
                          login: Yup.string().required(
                            "Por favor, informe o seu login"
                          ),
                          password: Yup.string().required(
                            "Por favor, informe a sua senha"
                          ),
                        })}
                        onSubmit={values => {
                          //ao submeter o formulário chama a função de login
                          this.login(values, this.props.history);
                        }}
                      >
                        {({ isSubmitting, values, handleChange, errors, touched, setFieldValue }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
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
                            </div>
                            <div className="mb-3">
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
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit">
                                <i className="mdi mdi-login font-size-18 me-2"/>
                                Entrar
                              </button>
                            </div>
                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted">
                                <i className="mdi mdi-lock me-1" /> Esqueceu a sua senha?
                              </Link>
                            </div>
                            <div className="mt-4 text-center">
                              <Link
                                to="/register"
                                className="text-muted">
                                <i className="mdi mdi-lock me-1" /> Faça o seu cadastro
                              </Link>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>© {new Date().getFullYear()} Terras App - Gerenciamento</p>
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
Login.propTypes = {
  login: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
};

/**
 * Mapeia o estado do login da aplicação controlado pelo redux com a página
 * @param {*} state estado do login da aplicação
 * @returns o estado do login da aplicação
 */
const mapStateToProps = state => {
  return {
    login: state.Login,
  };
};

/**
 * Mapeia com a página as actions necessárias para o login (no caso, só a action que efetivamente realiza o login)
 */
const mapDispatchToProps = {
  loginUser
};

//conect a página com o redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
