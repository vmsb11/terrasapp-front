import React, { Component } from 'react';
import PropTypes from "prop-types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class ItemDetail extends Component {
    
    render() {
        const {label, value} = this.props;

        return (
            <List>
                <ListItem>
                    <ListItemText primary={label} secondary={value} />
                </ListItem>
            </List>
        );
    }
}

ItemDetail.propTypes = {
    label: PropTypes.any,
    value: PropTypes.any
};
