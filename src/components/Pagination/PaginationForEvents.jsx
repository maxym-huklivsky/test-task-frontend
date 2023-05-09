import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResponsivePagination from 'react-responsive-pagination';

import { selectPage, selectTotalPages } from '../../redux/events/selectors';
import { setPage } from '../../redux/events/slice';

const PaginationForEvents = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();

  const onChange = (p) => {
    dispatch(setPage(p));
  };

  return <ResponsivePagination current={page} total={totalPages} onPageChange={onChange} />;
};

export default PaginationForEvents;
