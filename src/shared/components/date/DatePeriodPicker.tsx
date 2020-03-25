import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import zh from 'date-fns/locale/zh-CN';
import { Input, Button } from 'semantic-ui-react';
import './datePeriodPicker.css';
import { format } from 'date-fns';

declare module 'react-datepicker' {
  interface ReactDatePickerProps {
    customTimeInput?: any;
  }
}

registerLocale('zh', zh);

interface Props {
  start?: Date;
  end?: Date;
  onPick: (start: Date | null, end: Date | null) => void;
}

const CustomInput = ({ value, onClick }: { value?: any; onClick?: any }) => {
  return <Input size="mini" value={value} onClick={onClick} />;
};

const CustomTimeInput = ({ value, onChange }: { value?: any; onChange?: any }) => {
  return (
    <Input
      size="mini"
      type="time"
      min="00:00"
      max="11:59"
      required
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
    />
  );
};

export function DatePeriodPicker(props: Props) {
  const [startDate, setStartDate] = useState(props.start ? props.start : null);
  const [endDate, setEndDate] = useState(props.end ? props.end : null);

  const dateFormat = 'yyyy-MM-dd HH:mm';
  const timeformat = 'HH:mm';

  const handleConfirm = () => {
    props.onPick(startDate, endDate);
  };

  return (
    <React.Fragment>
      <div className="date-period-picker__wrapper">
        <DatePicker
          selectsStart
          dateFormat={dateFormat}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          locale="zh"
          // monthsShown={2}
          onChange={d => setStartDate(d)}
          customInput={<CustomInput />}
          shouldCloseOnSelect={false}
          showTimeInput
          timeInputLabel="时间"
          customTimeInput={<CustomTimeInput value={format(startDate ? startDate : new Date(), timeformat)} />}
        />
        <span className="date-period-picker__divider">至</span>
        <DatePicker
          selectsEnd
          dateFormat={dateFormat}
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale="zh"
          // monthsShown={2}
          onChange={d => setEndDate(d)}
          customInput={<CustomInput />}
          shouldCloseOnSelect={false}
          showTimeInput
          timeInputLabel="时间"
          customTimeInput={<CustomTimeInput value={format(endDate ? endDate : new Date(), timeformat)} />}
        />

        <Button className="date-period-picker__submit_btn" size="mini" color="blue" onClick={handleConfirm}>
          确认
        </Button>
      </div>
    </React.Fragment>
  );
}
