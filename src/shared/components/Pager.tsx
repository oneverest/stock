import React, { SyntheticEvent } from 'react';
import { Pagination } from 'semantic-ui-react';

interface Props {
  totalPages: number;
  defaultActivePage: number;
  onHandlePageChange: (page: number) => void;
}

export function Pager(props: Props) {
  const handlePageChange = (e: SyntheticEvent, data: any) => {
    console.log(data);
    props.onHandlePageChange(data.activePage);
  };
  return <Pagination {...props} onPageChange={handlePageChange} />;
}
