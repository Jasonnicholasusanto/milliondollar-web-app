import React, { useState } from 'react';
import './Dashboard.scss';

const Dashboard = () => {

    const [firstName, setFirstName] = useState('');

  return (
    <div className="dashboard">
        <h1>Welcome John Doe!</h1>
    </div>
  )
}

export default Dashboard