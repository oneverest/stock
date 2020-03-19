import React, { useState, useEffect } from 'react';
import { Segment, Form, Header, Input, Divider, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addPovRecord } from 'store/agent/actions';

function PovAdd(props: any) {
  const [net_worth, setNetWorth] = useState(0);
  const [position_ratio, setPositionRatio] = useState(0);
  const [szzs, setSzzs] = useState(0);
  const [record_date, setRecordDate] = useState('');

  const handleChange = (fn: any) => {
    return (e: any, target: any) => {
      fn(target.value);
    };
  };

  const handleSubmit = (e: any, target: any) => {
    console.log(net_worth, position_ratio, szzs, record_date);

    props.dispatch(
      addPovRecord({
        net_worth,
        position_ratio,
        szzs,
        record_date,
      }),
    );
  };

  // useEffect(() => {
  //   console.log(net_worth, position_ratio, szzs, record_date);
  // });
  return (
    <React.Fragment>
      <Segment>
        <Header as={'h3'}>创建记录</Header>
        <Divider />
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>日期</label>
            <Input name="record_date" onChange={handleChange(setRecordDate)} placeholder="日期" />
          </Form.Field>
          <Form.Field>
            <label>净值</label>
            <Input name="net_worth" onChange={handleChange(setNetWorth)} placeholder="净值" />
          </Form.Field>
          <Form.Field>
            <label>持仓比例</label>
            <Input name="position_ratio" onChange={handleChange(setPositionRatio)} placeholder="持仓比例" />
          </Form.Field>
          <Form.Field>
            <label>上证指数</label>
            <Input name="szzs" onChange={handleChange(setSzzs)} placeholder="上证指数" />
          </Form.Field>
          <Button primary type="submit">
            提交
          </Button>
        </Form>
      </Segment>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any, ownProps: any) => {
  return { ...ownProps };
};
export default connect(mapStateToProps)(PovAdd);
