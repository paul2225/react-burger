import PropTypes from 'prop-types';

const orderInfoShape = PropTypes.shape({
    number: PropTypes.number.isRequired
});

export const orderShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    order: orderInfoShape.isRequired,
    success: PropTypes.bool.isRequired
});