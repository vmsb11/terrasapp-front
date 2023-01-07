import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import logo from "../../assets/images/terrasapp.png";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      menu: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  render() {
    
    const { loginStore } = this.props;
    const { user } = loginStore;
     
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item"
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={logo}
              alt="Avatar"
            />{" "}
            <span className="d-none d-xl-inline-block ms-1">
              {(user !== null) ? `Olá, ${user.name} `: ''}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem tag="a" href="/profile">
              <i className="bx bx-user font-size-16 align-middle ms-1" />
              {"Perfil"}
            </DropdownItem>
            <DropdownItem tag="a" href="/profile/edit">
              <i className="bx bx-edit font-size-17 align-middle me-1" />
              {"Editar Cadastro"}
            </DropdownItem>
            <div className="dropdown-divider" />
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{"Sair"}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
ProfileMenu.propTypes = {
  loginStore: PropTypes.any,
  success: PropTypes.string
}

const mapStateToProps = state => {
  return ({
    loginStore: state.loginStore
  })
}

export default withRouter(connect(mapStateToProps, null)(ProfileMenu));
