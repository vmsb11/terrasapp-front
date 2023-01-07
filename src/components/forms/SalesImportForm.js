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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { showToast } from '../common/Toast';
import {
  importSales
} from '../../store/actions';
import { getFileExtension, parseFileToSales } from '../../helpers/general_helpers';
import { bytesToMB } from '../../helpers/math_helper';

/**
 * Classe responsável por renderizar o formulário de importação de vendas
 */
class SalesImportForm extends Component {
  
  constructor(props) {
    
    super(props);

    this.state = {
      fileExtension: '',
      fileSize: 0,
      sales: []
    };

    this.importSales = this.importSales.bind(this);
		this.onSelectFile = this.onSelectFile.bind(this);
    this.resetFormValues = this.resetFormValues.bind(this);
	}

  /**
   * Método invocado quando o arquivo é selecionado
   * @param {*} e evento gerador
   */
  onSelectFile(e) {
        
    //se for um arquivo válido
    if (e.target.files && e.target.files.length > 0) {
        
      const reader = new FileReader();
      //obtém informações adicionais do arquivo como extensão e tamanho
      const size = bytesToMB(e.target.files[0].size);
      const extension = getFileExtension(e.target.files[0].name);

      //realiza a leitura do arquivo
      reader.addEventListener('load', () => {
      
        //obtém o conteúdo do arquivo no formato base64 e retira informações desnecessárias como o cabeçalho que indica o tipo
        const fileContent = reader.result.replaceAll(`data:application/octet-stream;base64,`, '');
        //invoca a função que realiza o parse do arquivo e converte para um vetor no formato JSON com as informações da venda
        const sales = parseFileToSales(fileContent);

        //salva no estado do componente os dados obtidos da leitura
        this.setState({ 
          fileSize: size,
          fileExtension: extension,
          sales: sales
        });
      });
      
      //inicia a leitura do arquivo
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  /**
   * Função que reseta as informações do formulário
   */
	resetFormValues() {

		this.setState({
      fileExtension: '',
      fileSize: 0,
      sales: []
		});
	}
  
  /**
   * Função que valida o formulário
   * @returns true se o formulário está validado ou false se não estiver.
   */
  validateForm() {

    const { sales, fileExtension, fileSize } = this.state;
    
    if(sales.length === 0) {

      showToast('info', 'Terras App - Gerenciamento', 'Você deve selecionar um arquivo', 'toast-top-center', 5000);
      return false;
    }
    if(fileSize > 25) {

      showToast('info', 'Terras App - Gerenciamento', 'O tamanho do arquivo deve ser inferior a 25 MB', 'toast-top-center', 5000);
      return false;
    }
    else if(!(fileExtension === 'tab')) {

      showToast('info', 'Terras App - Gerenciamento', 'O arquivo deve estar no formato TAB', 'toast-top-center', 5000);
      return false;
    }

    return true;
  }

  /**
   * Método que realiza o import das vendas na base de dados
   */
  importSales() {

    const { importSales, loginStore } = this.props;
    const { token } = loginStore;
    //obtém as vendas a serem importadas
    const { sales } = this.state;

    //se o formulário for validado com sucesso

    if(this.validateForm()) {
    
      //invoca a action que importa as vendas na base de dados
      importSales(sales, token);
    }
	}

	render() {
    
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <Row className='mb-2'>
                    <Row>
                      <Col lg='12'>
                        <h5>
                          <span>
                            Selecione o arquivo com os dados da venda para serem importados e clique em <b>SALVAR</b> para finalizar a operação
                            <br />
                            O limite de tamanho do arquivo de envio é de 25 MB
                          </span>
                        </h5>
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg='6'>
                        <InputLabel htmlFor="status">Arquivo de vendas (formato TAB, tamanho máximo de 25 MB)</InputLabel>
                        <input
                          type='file'
                          accept='.tab'
                          onChange={(e) => this.onSelectFile(e)}/>
                        <FormHelperText id="component-helper-text">Arquivo com os dados das vendas a serem importadas na base de dados</FormHelperText>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='text-end mt-3'>
                          <button
                            onClick={() => this.importSales()}
                            type='button'
                            className='btn btn-primary'>
                            <i className='bx bx-save' /> Salvar
                          </button>
                        </div>
                      </Col>
                    </Row>
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
SalesImportForm.propTypes = {
  saleStore: PropTypes.any,
  loginStore: PropTypes.any,
  importSales: PropTypes.func,
	className: PropTypes.any,
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = (state) => ({
  saleStore: state.saleStore,
  loginStore: state.loginStore
});

/**
 * Mapeia com o componente as actions necessárias para o cadastro e alteração
 */
const mapDispatchToProps = {
  importSales
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesImportForm));