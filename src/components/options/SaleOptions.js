import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import DeleteModal from 'components/modals/DeleteModal';
import { 
  selectSale, 
  showSalePanel,
  updateSale,
  deleteSale
} from '../../store/actions';

/**
 * Classe que renderiza um quadro com opções de gerenciamento de uma venda
 */
class SaleOptions extends Component {

  constructor(props) {

    super(props);

    this.state = {
      showDeleteModal: false
    };

    //faz o "bind" das funções
    this.editSale = this.editSale.bind(this);
    this.deleteSale = this.deleteSale.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.onDeleteSale = this.onDeleteSale.bind(this);
  }

  /**
   * Função que exibe/oculta o modal de confirmação de exclusão de sale
   */
  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal});
  }

  /**
   * Função que seleciona e exibe os detalhes de uma venda
   */
  selectSale() {
    //obtém as informações da venda
    const { sale, selectSale, showSalePanel } = this.props;

    selectSale(sale);
    //exibe o formulário de edição
    showSalePanel('SALE_DETAIL');
  };

  /**
   * Função que edita o cadastro de uma venda
   */
  editSale() {
    //obtém as informações da venda
    const { sale, selectSale, showSalePanel } = this.props;

    selectSale(sale);
    //exibe o formulário de edição
    showSalePanel('EDIT_SALE');
  };

  /**
   * Função que deleta o cadastro da venda
   */
  deleteSale() {

    //obtém as informações da venda
    const { sale, deleteSale, loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que deleta o cadastro da venda
    deleteSale(sale, token);
  };

  /**
   * Método chamado após o usuário confirmar a remoção da venda
   */
  onDeleteSale = () => {
    
    this.deleteSale();
  }

  /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
  render() {

    //obtém as informações da venda
    const { sale } = this.props;
    const { showDeleteModal } = this.state;
    
    //renderiza o componente
    return (
      <React.Fragment>
        <div className='contact-links d-flex font-size-20'>
          <div className='flex-fill'>
            <Link to='#' onClick={() => this.selectSale()} className='text-primary' id={'detail' + sale.saleId}>
              <i className='bx bx-detail font-size-22' />
              <UncontrolledTooltip
                placement='top'
                target={'detail' + sale.saleId}>
                Ver Detalhes da Venda
              </UncontrolledTooltip>
            </Link>
          </div>
          <div className='flex-fill'>
            <Link to='#' onClick={() => this.editSale()} className='text-primary' id={'edit' + sale.saleId}>
              <i className='bx bx-edit font-size-22' />
              <UncontrolledTooltip
                placement='top'
                target={'edit' + sale.saleId}>
                Editar Venda
              </UncontrolledTooltip>
            </Link>
          </div>
          <div className='flex-fill'>
            <Link to='#' onClick={() => this.toggleDeleteModal()} className='text-primary' id={'delete' + sale.saleId}>
              <i className='bx bx-trash-alt font-size-22' />
              <UncontrolledTooltip
                placement='top'
                target={'delete' + sale.saleId}>
                Deletar Venda
              </UncontrolledTooltip>
            </Link>
          </div>
        </div>
        <DeleteModal 
          isOpen={showDeleteModal}
          toggle={this.toggleDeleteModal}
          question={`Deseja remover a venda selecionada ?`}
          onDeleteClick={this.onDeleteSale}/>
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
SaleOptions.propTypes = {
  saleStore: PropTypes.any,
  loginStore: PropTypes.any,
  sale: PropTypes.any,
  selectSale: PropTypes.func,
  showSalePanel: PropTypes.func,
  updateSale: PropTypes.func,
  deleteSale: PropTypes.func,
  history: PropTypes.any
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
  selectSale,
  showSalePanel,
  updateSale,
  deleteSale
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(SaleOptions);