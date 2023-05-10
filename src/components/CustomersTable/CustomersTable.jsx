import React from 'react';

import CustomerRow from '../CustomerRow/CustomerRow';
import css from './CustomersTable.module.css';

const CustomersTable = ({ centering, customers }) => {
  return (
    <div className={css.root}>
      <table className={css.table} style={{ margin: centering ? '0 auto' : 0 }}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Events Count</th>
            <th>Next Event Date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerRow key={customer._id} {...customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
