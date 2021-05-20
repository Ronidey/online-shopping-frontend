import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function SelectItemQty(props) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(props.qty);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setQty(e.target.value);
    props.handleItemQtyChange(e.target.value);
  };

  return (
    <FormControl>
      <InputLabel id='demo-controlled-open-select-label'>Age</InputLabel>
      <Select
        labelId='demo-controlled-open-select-label'
        id='demo-controlled-open-select'
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={qty}
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectItemQty;
