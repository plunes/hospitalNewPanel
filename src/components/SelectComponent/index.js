import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./index.css"

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width:'100%',
    select: {
        '&:before': {
            borderColor: 'green',
        },
        '&:after': {
            borderColor: 'green',
        }
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

if(props.multiple===true){
  console.log(props,"props when multiple true")  
}
  return (
    <div>
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          disableUnderline
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.handleChange}
          className={classes.select}
          placeholder ={props.placeholder}
          name ={props.name}
          displayEmpty
          multiple ={!!props.multiple?true:false}
        >
          <MenuItem value=" " disabled>
            {props.placeholder}
          </MenuItem>
          {props.options.map((item,i)=>(
            <MenuItem value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
         </div>
  );
}
