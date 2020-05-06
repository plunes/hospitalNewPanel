import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./index.css"



export default function SimpleSelect(props) {

  const dropdownMenuProps={
    menuStyle:{
      border: "1px solid black",
      borderRadius: "5%",
      backgroundColor: 'lightgrey',
    },
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      border: '5px solid #d3d4d5 !important ',
    },
    labelClass:{
     ...props.labelStyles
    },
    formControl: {
      minWidth: 120,
      width:'100%',
      borderBottom:'none !important' ,
      ...props.formControlStyles
    },
    select: {
     
      ...props.selectStyles
      
   },
    selectEmpty: {
      borderBottom: '1px solid',
      marginTop: theme.spacing(2),
    },
    li:{
      borderBottom:'1px solid red'
    },
    list:{
      backGroundColor:'grey'
    }
  }))

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  
 

  const handleChange = (event) => {
    setAge(event.target.value);
  };

if(props.multiple===true){
  console.log(props,"props when multiple true")  
}
  return (
    <div style ={{...props.wrapperDivStyles}}>
      <FormControl className={classes.formControl}>
      <InputLabel className={classes.labelClass} id="demo-simple-select-label">{props.label}</InputLabel>
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
          dropDownMenuProps={dropdownMenuProps}
        >
          <MenuItem value=" " disabled>
            {props.placeholder}
          </MenuItem>
          {props.options.map((item,i)=>(
            <MenuItem  value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
         </div>
  );
}
