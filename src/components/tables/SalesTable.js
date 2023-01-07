import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import SaleOptions from '../options/SaleOptions';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: 'rgb(31, 43, 243)',
      color: 'white',
      textAlign: 'center',
      fontSize: 12,
    },
  },
  rows: {
    style: {
      textAlign: 'center',
      fontSize: 12,
    },
  },
};

const paginationOptions = { rowsPerPageText: 'Registros por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

/**
 * Classe responsável por renderizar a tabela das vendas cadastradas
 */
class SalesTable extends Component {
  constructor(props) {
    super(props);

    //configura cada coluna para exibir da tabela
    this.state = {
      resetPaginationToggle: false,
      saleColumns: [
        {
          name: 'ID',
          selector: (row) => row.saleId,
          omit: false,
          maxWidth: '40px',
        },
        {
          name: 'Cliente',
          selector: (row) => row.purchaserName,
          omit: false,
          center: true,
          wrap: true,
        },
        {
          name: 'Item adquirido',
          selector: (row) => { 
            
            return (
              <div
                style={{
                  verticalAlign: 'middle',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: 10,
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    <span className='align-items-start'>
                      <b>{row.itemDescription}</b>
                    </span>
                    <span><b>Preço unitário: </b>R$ {row.itemPrice}</span>
                    <span><b>Quantidade: </b>R$ {row.purchaseCount}</span>
                  </div>
                </div>
              </div>
            );
          },
          omit: false,
        },
        {
          name: 'Comerciante',
          selector: (row) => { 
            
            return (
              <div
                style={{
                  verticalAlign: 'middle',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: 10,
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span className='align-items-start'>
                      <b>{row.merchantName	}</b>
                    </span>
                    <span><b>Endereço: {" "}</b>{row.merchantAddress}</span>
                  </div>
                </div>
              </div>
            );
          },
          omit: false,
        },
        {
          name: 'Ações',
          omit: false,
          center: true,
          maxWidth: '40px',
          cell: (row) => (
            <SaleOptions sale={row}/>
          ),
        },
      ],
    };
  }

  /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
  render() {
    //obtém as propriedades da tabela como as vendas a serem exibidas, página atual, eventos de interação com a paginação do componente
    const { sales, currentPage, onChangePage, onChangeRowsPerPage, notPagination } = this.props;
    const { saleColumns, resetPaginationToggle } = this.state;
    let hasPagination = true;

    if(notPagination === true) hasPagination = false;

    //renderiza o formulário de cadastro
    return (
      <React.Fragment>
        <div className="table-responsive">
          <DataTable 
            title="" 
            columns={saleColumns} 
            data={sales !== null ? sales.data : []} 
            paginationResetDefaultPage={resetPaginationToggle} 
            pagination={hasPagination} paginationServer 
            paginationTotalRows={sales !== null ? sales.totalItems : 0} 
            paginationComponentOptions={paginationOptions} 
            customStyles={customStyles} 
            fixedHeader 
            onChangePage={onChangePage} 
            onChangeRowsPerPage={onChangeRowsPerPage} 
            paginationDefaultPage={currentPage} 
            noDataComponent="Sem vendas para exibir" />
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SalesTable.propTypes = {
  sales: PropTypes.any,
  currentPage: PropTypes.any,
  totalItems: PropTypes.any,
  className: PropTypes.any,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  notPagination: PropTypes.any
};

export default SalesTable;
