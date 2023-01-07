import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Input,
} from "reactstrap";

/**
 * Classe que renderiza um formulário de busca de vendas
 */
class SalesSearchBar extends Component {
  
  constructor(props) {
    
    super(props);
  }

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {
    
    //obtém as propriedades do formulário como parametro de pesquisa, evento do botão de pesquisar, etc
    const { parameter, placeholder, onChangeParameter, onSearch } = this.props;
    
    //renderiza o componente
    return (
      <React.Fragment>    
        <div className="input-group">
          <Input
              id="parameter"
              name="parameter"
              value={parameter}
              placeholder={placeholder}
              onChange={(e) => onChangeParameter(e)}
              type="text" />
          <div className="input-group-append">
            <button 
              className="btn btn-primary" 
              type="button"
              color="primary"
              onClick={onSearch}>
              <i className="mdi mdi-magnify"></i>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SalesSearchBar.propTypes = {
  onChangeParameter: PropTypes.func,
  onSearch: PropTypes.func,
  parameter: PropTypes.any,
  placeholder: PropTypes.any,
  className: PropTypes.any,
};

export default SalesSearchBar;