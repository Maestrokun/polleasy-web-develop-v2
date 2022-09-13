import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { TextField } from 'shared';
import { Controller } from 'react-hook-form';
import { agentLanguage } from 'constant/agentData';
import { userManagementRoles } from 'constant/agentRoles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import useStyles from 'modules/Admin/components/Agent/Form/SingleUserForm/styled.singleUserForm';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EditUserForm({ control, setValue }) {
  const classes = useStyles();
  const inputFieldMargin = 4;
  const [userLang, setUserLang] = React.useState([]);
  const [langClick, setLangClick] = React.useState([]);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openNo, setOpenNo] = React.useState(1);

  const handleOutboundAgent = (e) => {
    const {
      target: { value },
    } = e;

    if (!userLang.map(({ value: fg }) => fg).includes(value[0]?.value)) {
      setUserLang((prev) => [...prev, ...value]);
    } else {
      const filterValue =
        userLang?.filter(({ value: fg }) => fg !== value[0]?.value) || [];
      setUserLang(filterValue);
    }
  };
  const handleSelectMenu = () => {
    setOpenSelect(true);
    setOpenNo(0);
  };
  const handleSelectClose = () => {
    setOpenSelect(false);
    setOpenNo(1);
  };
  const handleCheckSearchClick = () => {
    const ids = userLang.map(({ value }) => value) || [];
    setLangClick(userLang);
    setValue('languages', ids);
    handleSelectClose();
    return ids;
  };
  React.useMemo(() => {
    const name = userLang
      .map((agent) => {
        return `${agent?.title}`;
      })
      .join(', ');
    setValue('checkSearch', name);
  }, [userLang]);

  const handleRemoveAgent = (langValue) => {
    const langArr = userLang.filter(({ value }) => value !== langValue);
    const ids = langArr.map(({ value }) => value) || [];
    setUserLang(langArr);
    setLangClick(langArr);
    const name = langArr
      .map((agent) => {
        return `${agent?.title}`;
      })
      .join(', ')
      .trim();
    setValue('checkSearch', name);
    setValue('languages', ids);
    return ids;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '92vh' }}>
      <Box m={4} sx={{ flex: 1 }}>
        <Box className={classes.form}>
          <TextField
            variant="outlined"
            label="First Name"
            name="firstname"
            control={control}
          />

          <TextField
            variant="outlined"
            label="Middle Name (Optional)"
            name="middle_name"
            control={control}
          />

          <TextField
            variant="outlined"
            label="Last Name"
            fullWidth
            name="lastname"
            control={control}
            sx={{ mt: inputFieldMargin }}
          />

          <TextField
            variant="outlined"
            label="Phone Number"
            name="phone"
            control={control}
            sx={{ mt: inputFieldMargin }}
          />

          <TextField
            variant="outlined"
            label="Email Address"
            sx={{ mt: inputFieldMargin }}
            name="email"
            control={control}
          />

          <TextField
            select
            variant="outlined"
            label="Role"
            sx={{
              mt: inputFieldMargin,
            }}
            name="role"
            control={control}
          >
            {/* <MenuItem value="">None</MenuItem> */}
            {userManagementRoles.map((role) => (
              <MenuItem value={role.value}>{role.title}</MenuItem>
            ))}
          </TextField>

          <Controller
            name="languages"
            control={control}
            sx={{ mt: inputFieldMargin }}
            render={({ field: { ref, onBlur } }) => (
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>Languages</InputLabel>
                <Select
                  multiple
                  value={langClick}
                  onChange={(e) => {
                    handleOutboundAgent(e);
                  }}
                  label="languages"
                  input={<OutlinedInput label="Languages" />}
                  renderValue={(selected) =>
                    selected
                      .map((agent) => {
                        return `${agent?.title}`;
                      })
                      .join(',')
                  }
                  MenuProps={{
                    ...MenuProps,
                    open: openSelect,
                    onClose: () => handleSelectClose(),
                  }}
                  onClick={openNo === 1 ? handleSelectMenu : () => {}}
                  onBlur={onBlur}
                  inputRef={ref}
                  fullWidth
                >
                  <Box className={classes.searchBox2}>
                    <TextField
                      control={control}
                      name="checkSearch"
                      placeholder="Search"
                      type="search"
                      onChange={() => {}}
                      sx={{ width: '95%', paddingLeft: '20px' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {agentLanguage.map((agent) => (
                    <MenuItem key={agent.title} value={agent}>
                      <Checkbox
                        size="small"
                        checked={userLang
                          .map(({ value }) => value)
                          .includes(agent?.value)}
                      />
                      <ListItemText
                        primary={`${agent.title}`}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </MenuItem>
                  ))}

                  <Box className={classes.actionWrapper}>
                    <Grid container spacing={2} className={classes.actions}>
                      <Grid item>
                        <Button onClick={handleCheckSearchClick}>Select</Button>
                      </Grid>
                      <Grid item>
                        <Button className="btnCancel">Cancel</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Select>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  {langClick.map(({ title, value }) => (
                    <Box className={classes.selectedLanguages}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            paddingRight: '1em',
                            textTransform: 'capitalize',
                          }}
                        >
                          {`${title}`}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveAgent(value)}
                        >
                          <CloseIcon
                            fontSize="small"
                            sx={{ fontSize: '14px' }}
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </FormControl>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}

EditUserForm.propTypes = {
  control: PropTypes.shape({}),
  // watch: PropTypes.func,
  setValue: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

EditUserForm.defaultProps = {
  control: {},
  // watch: () => {},
  setValue: () => {},
};

export default EditUserForm;
