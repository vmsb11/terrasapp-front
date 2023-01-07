import React from "react";
import PropTypes from 'prop-types';
import { Select } from "@material-ui/core";

/**
 * Component responsável por renderizar um combo de seleção de informações para ser utilizado no formulário
 */
const SelectFormik = ({ children, form, field }) => {
  //recebe as informações do combo
  const { name, value } = field;
  const { setFieldValue } = form;
  
  //faz a renderização do combo
  return (
    <Select
      style={{
        width:'100%'
      }}
      label="type"
      name={name}
      value={value || ''}
      onChange={e => {
        setFieldValue(name, e.target.value);
      }}>
      {children}
    </Select>
  );
};

/**
 * Valida as propriedades do componente
 */
SelectFormik.propTypes = {
    children: PropTypes.any,
    form: PropTypes.any,
    field: PropTypes.any
};

export default SelectFormik;