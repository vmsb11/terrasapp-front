import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom"

/**
 * Classe que é responsável renderizar os subcomponentes da aplicação quando o usuário não estiver logado
 */
class NonAuthLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.capitalizeFirstLetter.bind(this)
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }
  
  /**
   * Método que faz a rendeização do componente
   * @returns componente renderizado
   */
  render() {
    
    //renderiza o componente
    return <React.Fragment>{
      this.props.children
      }
    </React.Fragment>
  }
}

/**
 * Valida as propriedades do componente
 */
NonAuthLayout.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(NonAuthLayout)
