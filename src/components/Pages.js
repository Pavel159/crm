import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap';
// import { setPage } from '../redux/leadSlice';

const Pages = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();
  const pageCount = Math.ceil(leads.totalCount / leads.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination classes='mt-5'>
      {pages.map((p) => (
        <Pagination.Item key={p} active={leads.page === p}>
          {p}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Pages;
