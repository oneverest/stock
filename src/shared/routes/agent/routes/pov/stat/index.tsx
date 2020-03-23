import React, { useEffect, useReducer } from 'react';
// import PovChart from 'components/PovChart';
import PovChart from 'components/PovChart2';
import { getAllPovs } from 'services/pov';
import { Button, Divider } from 'semantic-ui-react';

const initialState = { net_worth: [], position_ratio: [], date: [] };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'render':
      return { ...state, ...action.payload };
    default:
      throw new Error('unknown action type: ' + action.type);
  }
};

export function StatRoute() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { net_worth, position_ratio, date } = state;
  useEffect(() => {
    getAllPovs({ page: 1, pageSize: 300 }).then(result => {
      if (result.isSuccess) {
        const { data } = result.getValue() as any;
        if (data.length !== date.length) {
          dispatch({
            type: 'render',
            payload: {
              net_worth: data.map((item: any) => item.net_worth),
              position_ratio: data.map((item: any) => item.position_ratio),
              date: data.map((item: any) => item.record_date),
            },
          });
        }
      }
    });
  });
  return (
    <React.Fragment>
      <Button.Group basic size="mini">
        <Button active>近一周</Button>
        <Button>近一月</Button>
        <Button>近三月</Button>
        <Button>近一年</Button>
      </Button.Group>
      <Divider />
      <PovChart net_worth={net_worth} position_ratio={position_ratio} date={date} />
    </React.Fragment>
  );
}
