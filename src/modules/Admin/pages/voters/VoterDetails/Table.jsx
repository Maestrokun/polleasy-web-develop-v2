import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import results, { columns } from 'constant/voterData';

import { Table } from 'shared';

function Index() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewCampaign = () => {
    navigate('/admin/voter/10/campaign-name');
  };

  function createData({ id, title, type, name, year }) {
    return {
      id,
      data: <Typography>{title}</Typography>,
      type,
      name,
      year,
    };
  }

  const list = results?.map(
    ({ id, title, type, name, year }) =>
      createData({ id, title, type, name, year }) || []
  );

  return (
    <Table
      emptyIconTitle="No Agent"
      emptyIconMessage="You currently do not have any Agent"
      results={list || []}
      columns={columns}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      handleRowClick={(row) => handleViewCampaign(row)}
    />
  );
}

export default Index;
