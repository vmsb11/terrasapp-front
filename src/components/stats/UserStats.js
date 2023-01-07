import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Table,
} from 'reactstrap';
import { formatDatetime } from 'helpers/dates_helpers';

/**
 * Classe que renderiza um componente que exibe uma tabela com as informações de cadastro de um usuário
 */
class UserStats extends Component {

    constructor(props) {

        super(props);

        //faz o "bind" das funções
        this.print = this.print.bind(this);
    }

    /**
     * Método que realiza a impressão da janela
     */
    print() {

        window.print();
    }
    
    /**
     * Método que faz a renderização do componente
     * @returns componente renderizado
     */
    render() {

        //obtém as informações do usuário
        const { user } = this.props;
        
        //renderiza o componente com as informações do usuário
        return (
            <React.Fragment>
                <Card>
                    <CardBody className='border-top'>
                        <CardTitle className='h4'>Informações pessoais 12</CardTitle>

                        <p className='text-muted mb-4'>
                            {user.description}
                        </p>
                        <div className='table-responsive'>
                            <Table className='table-wrap mb-0'>
                                <tbody>
                                    <tr>
                                        <th scope='row'>Nome:</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Login:</th>
                                        <td>{user.login}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Status:</th>
                                        <td>{user.status}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Criado em:</th>
                                        <td>{formatDatetime(user.createdAt)}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Última atualização:</th>
                                        <td>{formatDatetime(user.updatedAt)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className='text-center'>
                            <Link
                                to='#'
                                onClick={this.print}
                                className='btn btn-primary w-md'>
                                <i className='fa fa-print'/>
                                Imprimir
                            </Link>
                            </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

/**
 * Valida as propriedades do componente
 */
UserStats.propTypes = {
    user: PropTypes.any
}

export default UserStats;