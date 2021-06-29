import React from 'react';

const Loader: React.FC = () => {
    return (
      <div className="loader">
        <div className="duo duo1">
          <div className="dot dot-a"></div>
          <div className="dot dot-b"></div>
        </div>
        <div className="duo duo2">
          <div className="dot dot-a"></div>
          <div className="dot dot-b"></div>
        </div>
      </div>
    )
}

export default Loader;