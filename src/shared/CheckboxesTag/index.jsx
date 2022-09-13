import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const callCenters = [
  { title: 'Alimosho Amuwo-odofin Court', year: 1994 },
  { title: 'Mr. Biggs', year: 1972 },
  { title: 'Sweet Sensation', year: 1974 },
  { title: 'Farm City', year: 2008 },
  { title: 'The Place', year: 1957 },
  { title: 'Labule', year: 1993 },
  { title: 'Food Matter', year: 1994 },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={callCenters}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label="Party" placeholder="Call" width="100%" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
