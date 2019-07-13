import PropTypes from 'prop-types';

export const treatShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rarityDescriptor: PropTypes.string.isRequired
});

export const resourceShape = PropTypes.shape({
  class: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    level: PropTypes.number.isRequired
  }).isRequired
});
