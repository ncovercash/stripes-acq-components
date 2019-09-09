import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { find } from 'lodash';

import { FieldMultiSelection } from '../../FieldMultiSelection';

const itemToString = item => item;
const label = <FormattedMessage id="stripes-acq-components.label.acqUnits" />;

const AcqUnitsField = ({ name, units, disabled }) => {
  const formatter = ({ option }) => {
    const item = find(units, { id: option }) || option;

    if (!item) return option;

    return item.name;
  };

  const getOptionsList = () => {
    return units.map(({ id }) => id);
  };

  return (
    <FieldMultiSelection
      name={name}
      label={label}
      dataOptions={getOptionsList()}
      itemToString={itemToString}
      formatter={formatter}
      disabled={disabled}
    />
  );
};

AcqUnitsField.propTypes = {
  name: PropTypes.string,
  units: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
};

AcqUnitsField.defaultProps = {
  name: 'acqUnitIds',
  units: [],
  disabled: false,
};

export default AcqUnitsField;