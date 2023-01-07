import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import SidebarContent from "./SidebarContent";
import logo from "../../assets/images/terrasapp.png";
import logoLightPng from "../../assets/images/terrasapp.png";
import logoLightSvg from "../../assets/images/terrasapp.png";
import logoDark from "../../assets/images/terrasapp.png";

/**
 * Classe que renderiza o componente que exibe o menu lateral
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Método que faz a rendeização do componente
   * @returns componente renderizado
   */
  render() {

    //renderiza o componente
    return (
      <React.Fragment>
        <div className="vertical-menu">
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logo} alt="" width="64" height="32" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" width="128" height="48" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img style={{marginTop: 15}} src={logoLightSvg} alt="" width="64" height="32" />
              </span>
              <span className="logo-lg">
                <img style={{marginTop: 15}} src={logoLightPng} alt="" width="128" height="48" />
              </span>
            </Link>
          </div>
          <div data-simplebar className="h-100">
            {this.props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
          </div>
          <div className="sidebar-background"></div>
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
Sidebar.propTypes = {
  type: PropTypes.string,
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

//conecta o componente com o redux
export default connect(mapStateToProps,{})(withRouter((Sidebar)));
