import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

type InputDateProps = {
  value?: string | null;
  defaultValue?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  disableFuture?: boolean;
};
export default function InputDate({
  value,
  onChange,
  disabled,
  defaultValue,
  disableFuture,
}: InputDateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        value={value ? dayjs(value) : undefined}
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        onChange={(newValue) => {
          onChange(newValue!.format("YYYY-MM-DD"));
        }}
        disabled={disabled}
        disableFuture={disableFuture}
        //decresed the padding of the date picker
        slotProps={{
          textField: {
            size: "small",
            sx: {
              padding: "0px",
              maxWidth: "250px",
              width: "100%",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
