import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    borderBottom:"0px !important",
    minWidth: 120,
    width:'100%',
    select: {
        height:'100px'
    }
  },
  select:{
    border:'1px solid lightgrey',
    padding:'3px',
    borderRadius:'20px',
    width:'10rem',
    '&:active':{
        backgroundColor:'none !important'
    }

  },
  input:{
    textAlign:'center !important'
  },
  
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function VarianceDropdown(props) {
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
          InputProps={{ classes }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.handleChange}
          className={classes.select}
          name ="variance"
          styles={{
              marginBottom:'0px'
          }}
        >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
         </div>
  );
}
