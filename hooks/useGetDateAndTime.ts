import { useState } from "react";

export const useGetDateAndTime = () => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (_event: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) setDate(selected.toISOString().split("T")[0]);
  };

  const onTimeChange = (_event: any, selected?: Date) => {
    setShowTimePicker(false);
    if (selected) {
      const h = selected.getHours().toString().padStart(2, "0");
      const m = selected.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    }
  };

  return {
    date,
    time,
    showDatePicker,
    showTimePicker,
    setShowDatePicker,
    setShowTimePicker,
    onDateChange,
    onTimeChange,
  };
};
