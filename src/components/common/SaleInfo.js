import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col
} from 'reactstrap';

/**
 * Classe que renderiza uma venda com o total cadastrados de um status
 */
class SaleInfo extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Função que renderiza uma venda
   * @returns venda renderizada
   */
  render() {

    //obtém as informações da venda a ser renderizado
    const { xl, sm, color, title, subtitle, icon, urlSale } = this.props;
    
    return (

    /**
     * Renderiza a venda utilizando a biblioteca reactstrap
     */
    <React.Fragment>
      <Col sm={sm} xl={xl}>
        <Card color={color}>
          <CardBody>
            <Link to={urlSale}>
              <div className='d-flex flex-wrap'>
                <div className='me-3'>
                  <p className='text-white mb-2'>{title}</p>
                  <h5 className='mb-0 text-white'>{subtitle}</h5>
                </div>
                {
                  (icon) ?
                  <div className='avatar-sm ms-auto'>
                    <div className='avatar-title bg-light rounded-circle text-primary font-size-20'>
                      <i className={icon}></i>
                    </div>
                  </div>
                  : <></>
                }
              </div>
            </Link>
          </CardBody>
        </Card>
      </Col>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SaleInfo.propTypes = {
  xl: PropTypes.any,
  sm: PropTypes.any,
  color: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  urlSale: PropTypes.any,
  icon: PropTypes.any
};

export default SaleInfo;