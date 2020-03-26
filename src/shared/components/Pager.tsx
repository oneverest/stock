import React, { SyntheticEvent } from 'react';
import { Pagination } from 'semantic-ui-react';

interface Props {
  totalPages: number;
  defaultActivePage: number;
  onHandlePageChange: (page: number) => void;
}

export function Pager(props: Props) {
  const handlePageChange = (e: SyntheticEvent, data: any) => {
    props.onHandlePageChange(data.activePage);
  };
  const p = Object.assign({}, props);
  delete p.onHandlePageChange;
  return <Pagination {...p} onPageChange={handlePageChange} />;
}
