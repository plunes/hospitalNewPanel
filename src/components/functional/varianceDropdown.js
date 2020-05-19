import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useToasts } from 'react-toast-notifications'

export default function VarianceDropdown(props) {
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false) 
  const { addToast }  = useToasts()
  const useStyles = makeStyles((theme) => ({
    formControl: {
      // margin: theme.spacing(1),
      borderBottom:"0px !important",
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
    dropdownStyle: {
      // top:'228px !important'
    }
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = (event) => {
    if(props.editFlag){
      setOpen(true);
    }else{
      // addToast("Select procedure  to change variance", {appearance: 'error', autoDismiss:true})
    }
   
  };

  const handleClose = (event) => {
    setOpen(false);
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
          onOpen = {handleOpen}
          onClose = {handleClose}
          open = {open}
          name ="variance"
          styles={{
              marginBottom:'0px'
          }}
          MenuProps={{ classes: { paper: classes.dropdownStyle } }}
        >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="35">35</MenuItem>
            <MenuItem value="45">45</MenuItem>
        </Select>
      </FormControl>
         </div>
  );
}
