import React, { Component } from "react";
import PropTypes from "prop-types";
import { 
  Card, 
  CardBody, 
  Col, 
  Container, 
  Row 
} from "reactstrap";
import { Link } from "react-router-dom";
import UserForm from "components/forms/UserForm";
import logo from "../../assets/images/terrasapp.png";

/**
 * Classe que renderiza a página de cadastro de um novo usuário
 */
class Register extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Método que faz a renderização da página
   * @returns página renderizada
   */
  render() {
    
    //renderiza a página de cadastro
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
                        <h3><b>Cadastro</b></h3>
                      </div>
                    </div>
                    <div className="p-2">
                      {/** Carrega o formulário de cadastro no modo "novo usuário" */}
                      <UserForm
                        history={this.props.history} 
                        mode={'new'}/>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Voltar para {' '}
                    <Link to='login' className='fw-medium text-primary'>
                      Login
                    </Link>{' '}
                  </p>
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
Register.propTypes = {
  history: PropTypes.object
};

export default Register;
