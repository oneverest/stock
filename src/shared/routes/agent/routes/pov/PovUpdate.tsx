import React from 'react';
import { connect } from 'react-redux';
import { updatePovRecord } from 'store/agent/actions';
import { PovForm } from './PovForm';

function PovUpdate(props: any) {
  const id: string = props.match.params.id;
  const handleSubmit = (data: any) => {
    props.dispatch(updatePovRecord(id, data));
  };

  return <PovForm {...props.location.state} title="编辑记录项" onSubmit={handleSubmit} />;
}

const mapStateToProps = (state: any, ownProps: any) => {
  return { ...ownProps };
};
export default connect(mapStateToProps)(PovUpdate);
