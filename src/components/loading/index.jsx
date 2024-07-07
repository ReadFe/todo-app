import React from 'react';
import './index.css'; // Import file CSS untuk styling

const Loading = () => {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <div className="loader"></div> {/* Animasi loading menggunakan CSS */}
    </div>
  );
}

export default Loading;