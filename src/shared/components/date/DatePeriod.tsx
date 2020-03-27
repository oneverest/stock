import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { subDays, format } from 'date-fns';
import { DatePeriodPicker } from './DatePeriodPicker';
import qs from 'qs';

interface Props {
  today_opt?: boolean;
  yesterday_opt?: boolean;
  week_opt?: boolean;
  month_opt?: boolean;
  year_opt?: boolean;
  custom_opt?: boolean;
  period_type?: PeriodType;
  history: any;
  match: any;
  location: any;
}

type PeriodType = 'today' | 'yesterday' | 'week' | 'month' | 'year' | 'custom';

interface IState {
  period_type: PeriodType;
}

const initialState: IState = {
  period_type: 'today',
};

const formatDate = (d: number | Date) => format(d, 'yyyy-MM-dd');

const constructSearch = (type: PeriodType) => {
  const dateOfToday = new Date();
  switch (type) {
    case 'today':
      return `?start=${format(new Date(), 'yyyy-MM-dd')}`;
    case 'yesterday':
      return `?start=${formatDate(subDays(dateOfToday, 1))}&end=${formatDate(subDays(dateOfToday, 1))}`;
    case 'week':
      return `?start=${formatDate(subDays(dateOfToday, 6))}`;
    case 'month':
      return `?start=${formatDate(subDays(dateOfToday, 29))}`;
    case 'year':
      return `?start=${formatDate(subDays(dateOfToday, 359))}`;
    default:
      throw new Error();
  }
};

export function DatePeriod({
  today_opt = true,
  yesterday_opt = true,
  week_opt = true,
  month_opt = true,
  year_opt = true,
  custom_opt = true,
  location,
  history,
}: Props) {
  // console.log('DatePeriod:', location);
  let period_type: PeriodType = today_opt
    ? 'today'
    : yesterday_opt
    ? 'yesterday'
    : week_opt
    ? 'week'
    : month_opt
    ? 'month'
    : 'year';

  if (period_type === 'year' && !year_opt) {
    throw new Error('DatePeriod component argument error');
  }
  if (location.state && location.state.period_type) {
    period_type = location.state.period_type;
  }
  initialState.period_type = period_type;
  if (location.state === undefined) {
    history.push({
      pathname: `${location.pathname}`,
      state: { period_type },
      search: constructSearch(period_type),
    });
  }

  const handlePick = (start: Date | null, end: Date | null) => {
    const search = {} as any;
    start && (search.start = formatDate(start));
    end && (search.end = formatDate(end));

    const query = qs.stringify(search);

    start &&
      search ==
        history.push({
          pathname: `${location.pathname}`,
          state: { period_type },
          search: query ? `?${query}` : '',
        });
  };

  return (
    <React.Fragment>
      <Button.Group basic size="mini">
        {today_opt && (
          <Button
            as={Link}
            to={{
              pathname: `${location.pathname}`,
              state: { period_type: 'today' },
              search: constructSearch('today'),
            }}
            active={period_type === 'today'}
          >
            今天
          </Button>
        )}
        {yesterday_opt && (
          <Button
            as={Link}
            to={{
              pathname: `${location.pathname}`,
              state: { period_type: 'yesterday' },
              search: constructSearch('yesterday'),
            }}
            active={period_type === 'yesterday'}
          >
            昨天
          </Button>
        )}
        {week_opt && (
          <Button
            as={Link}
            to={{
              pathname: `${location.pathname}`,
              state: { period_type: 'week' },
              search: constructSearch('week'),
            }}
            active={period_type === 'week'}
          >
            近一周
          </Button>
        )}
        {month_opt && (
          <Button
            as={Link}
            to={{
              pathname: `${location.pathname}`,
              state: { period_type: 'month' },
              search: constructSearch('month'),
            }}
            active={period_type === 'month'}
          >
            近一月
          </Button>
        )}
        {year_opt && (
          <Button
            as={Link}
            to={{
              pathname: `${location.pathname}`,
              state: { period_type: 'year' },
              search: constructSearch('year'),
            }}
            active={period_type === 'year'}
          >
            近一年
          </Button>
        )}
        {custom_opt && (
          <Button
            as={Link}
            // to={{ pathname: `${location.pathname}`, state: { period_type: 'custom' }, search: '?z=s' }}
            to={{ pathname: `${location.pathname}`, state: { period_type: 'custom' } }}
            active={period_type === 'custom'}
          >
            自定义
          </Button>
        )}
      </Button.Group>
      {custom_opt && period_type === 'custom' && <DatePeriodPicker onPick={handlePick} />}
    </React.Fragment>
  );
}
