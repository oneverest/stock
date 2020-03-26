import React, { useEffect, useReducer } from 'react';
// import PovChart from 'components/PovChart';
import PovChart from 'components/PovChart2';
import { getAllPovs } from 'services/pov';
import { Divider } from 'semantic-ui-react';
import { DatePeriod } from 'components/date/DatePeriod';
import qs from 'qs';

const initialState = { net_worth: [], position_ratio: [], date: [], szzs: [] };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'render':
      return { ...state, ...action.payload };
    default:
      throw new Error('unknown action type: ' + action.type);
  }
};

export function StatRoute(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { net_worth, position_ratio, date, szzs } = state;
  const { location } = props;
  console.log('st:', location);
  useEffect(() => {
    const criteria = {} as any;
    criteria.page = 1;
    criteria.pageSize = 300;
    const query = qs.parse(location.search.length > 0 ? location.search.slice(1) : '');
    console.log('obj:', query);
    query.start && query.start.length > 0 && (criteria.start = query.start);
    query.end && query.end.length > 0 && (criteria.end = query.end);
    const timer = setTimeout(() => {
      getAllPovs(criteria).then(result => {
        if (result.isSuccess) {
          const { data } = result.getValue() as any;
          if (data.length !== date.length) {
            dispatch({
              type: 'render',
              payload: {
                net_worth: data.map((item: any) => item.net_worth),
                position_ratio: data.map((item: any) => item.position_ratio),
                date: data.map((item: any) => item.record_date),
                szzs: data.map((item: any) => (item.szzs / 2000).toFixed(3)),
              },
            });
          }
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <React.Fragment>
      <DatePeriod
        // year_opt={false}
        // month_opt={false}
        // today_opt={false}
        yesterday_opt={false}
        history={props.history}
        match={props.match}
        location={props.location}
      />
      <Divider />
      <PovChart net_worth={net_worth} position_ratio={position_ratio} date={date} szzs={szzs} />
    </React.Fragment>
  );
}
