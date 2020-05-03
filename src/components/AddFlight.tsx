import React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { FlightType } from "../stores/flights/types";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addFlight } from "../stores/flights/actions";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  link: {
    marginTop: theme.spacing(2),
  },
  pickerFormControl: {
    marginTop: theme.spacing(1),
  },
  pickerLabel: {
    top: "-25px",
  },
  textError: {
    color: "red",
  },
}));

interface FormValues {
  departure: string;
  departureTime: Date;
  arrival: string;
  arrivalTime: Date;
  flightType: FlightType;
}

export const AddFlight: React.FC = () => {
  const { register, handleSubmit, control, reset, errors } = useForm<
    FormValues
  >();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const onSubmit = (flight: FormValues) => {
    dispatch(addFlight({ ...flight, uuid: uuidv4() }));
    reset();
    enqueueSnackbar("The flight was successfully added", {
      variant: "success",
    });
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <FormControl fullWidth>
        <TextField
          label="Departure"
          name="departure"
          inputRef={register({ required: true })}
          error={!!errors?.departure}
        />
        <ErrorMessage
          name="departure"
          errors={errors}
          as="span"
          className={classes.textError}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="Arrival"
          name="arrival"
          inputRef={register({ required: true })}
          error={!!errors?.arrival}
        />
        <ErrorMessage
          name="arrival"
          errors={errors}
          as="span"
          className={classes.textError}
        />
      </FormControl>
      <FormControl fullWidth className={classes.pickerFormControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <InputLabel className={classes.pickerLabel} htmlFor="departure-time">
            Departure Time
          </InputLabel>
          <Controller
            as={
              <DateTimePicker
                value="values.departureTime"
                onChange={() => {}}
                error={!!errors?.departureTime}
                id="departure-time"
              />
            }
            name="departureTime"
            control={control}
            defaultValue={null}
            rules={{ required: "Field Required" }}
          />
          <ErrorMessage
            name="departureTime"
            errors={errors}
            as="span"
            className={classes.textError}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl fullWidth className={classes.pickerFormControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <InputLabel className={classes.pickerLabel} htmlFor="arrival-time">
            Arrival Time
          </InputLabel>
          <Controller
            as={
              <DateTimePicker
                value="values.arrivalTime"
                onChange={() => {}}
                error={!!errors?.departureTime}
                id="arrival-time"
                className={classes.link}
              />
            }
            name="arrivalTime"
            control={control}
            defaultValue={null}
            rules={{ required: "Field Required" }}
          />
          <ErrorMessage
            name="arrivalTime"
            errors={errors}
            as="span"
            className={classes.textError}
          />
        </MuiPickersUtilsProvider>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="label-select-label">Type</InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value={FlightType.CHEAP}>{FlightType.CHEAP}</MenuItem>
              <MenuItem value={FlightType.BUSINESS}>
                {FlightType.BUSINESS}
              </MenuItem>
            </Select>
          }
          name="flightType"
          control={control}
          defaultValue={FlightType.CHEAP}
        />
      </FormControl>

      <Button
        id="add-button"
        type="submit"
        variant="contained"
        color="primary"
        className={classes.link}
      >
        Add Flight
      </Button>
    </form>
  );
};
