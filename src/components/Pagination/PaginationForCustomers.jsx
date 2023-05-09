import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResponsivePagination from 'react-responsive-pagination';

import { selectPage, selectTotalPages } from '../../redux/customer/selectors';
import { setPage } from '../../redux/customer/slice';

const PaginationForCustomers = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();

  const onChange = (p) => {
    dispatch(setPage(p));
  };

  return <ResponsivePagination current={page} total={totalPages} onPageChange={onChange} />;
};

export default PaginationForCustomers;
