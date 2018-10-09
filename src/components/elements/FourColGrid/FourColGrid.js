import React from 'react';
import { PropTypes } from 'prop-types';
import './FourColGrid.css';

const FourColGrid = ({ header, loading, children }) => {
  const renderElements = () =>
    children.map((element, childIndex) => {
      return (
        <div key={childIndex} className="rmdb-grid-element">
          {element}
        </div>
      );
    });

  return (
    <div className="rmdb-grid">
      {header && !loading ? <h1>{header}</h1> : null}
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
};

FourColGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
};

export default FourColGrid;
