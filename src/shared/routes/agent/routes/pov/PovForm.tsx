import React, { useState } from 'react';
import { Segment, Header, Divider, Form, Input, Button } from 'semantic-ui-react';

interface Props {
  title: string;
  record_date?: string | null;
  net_worth?: number | null;
  position_ratio?: number | null;
  szzs?: number | null;
  onSubmit: (data: any) => void;
}

export function PovForm({
  record_date = null,
  net_worth = null,
  position_ratio = null,
  szzs = null,
  onSubmit,
  title,
}: Props) {
  const [_record_date, setRecordDate] = useState(record_date);
  const [_net_worth, setNetWorth] = useState(net_worth);
  const [_position_ratio, setPositionRatio] = useState(position_ratio);
  const [_szzs, setSzzs] = useState(szzs);

  const handleChange = (fn: any) => {
    return (e: any, target: any) => {
      fn(target.value);
    };
  };

  const handleSubmit = () => {
    onSubmit({
      record_date: _record_date,
      net_worth: _net_worth,
      position_ratio: _position_ratio,
      szzs: _szzs,
    });
  };
  return (
    <Segment>
      <Header as={'h3'}>{title}</Header>
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>日期</label>
          <Input name="record_date" value={_record_date} placeholder="日期" onChange={handleChange(setRecordDate)} />
        </Form.Field>
        <Form.Field>
          <label>净值</label>
          <Input name="net_worth" value={_net_worth} placeholder="净值" onChange={handleChange(setNetWorth)} />
        </Form.Field>
        <Form.Field>
          <label>持仓比例</label>
          <Input
            name="position_ratio"
            value={_position_ratio}
            placeholder="持仓比例"
            onChange={handleChange(setPositionRatio)}
          />
        </Form.Field>
        <Form.Field>
          <label>上证指数</label>
          <Input name="szzs" value={_szzs} placeholder="上证指数" onChange={handleChange(setSzzs)} />
        </Form.Field>
        <Button primary type="submit">
          提交
        </Button>
      </Form>
    </Segment>
  );
}
