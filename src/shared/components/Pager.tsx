import React, { SyntheticEvent } from 'react';
import { Pagination } from 'semantic-ui-react';

interface Props {
  totalPages: number;
  defaultActivePage: number;
}

export function Pager(props: Props) {
  const handlePageChange = (e: SyntheticEvent, data: any) => {
    console.log(data);
  };
  return <Pagination {...props} onPageChange={handlePageChange} />;
}
