/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DateRangePicker from './DateRangePicker';
import DatePicker from './DatePicker';

import useStyles from 'shared/FilterBoxes/styled.filterBoxes';
import { useTheme } from '@mui/material/styles';

function FilterBoxes({
  filters,
  handleClose,
  searchValue,
  filteredSearchResult,
  handleChecked,
  getFilterValue,
  showFilters,
  isDate,
  onChange,
  date,
  filterBackgroundColor,
  showSelectedDate,
  // extraNode,
  setPage,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container spacing={1} className={classes.root} alignItems="center">
      <Grid item md={12}>
        <Grid container>
          <Grid item xs={12} md={3} display="flex" alignItems="center">
            <Typography
              sx={{
                // marginBottom: '0.7rem',
                color: (theme) => theme.palette.text.secondary,
                textTransform: 'capitalize !important',
              }}
              variant="subtitle2"
            >
              Filter by:
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems="center">
            {showFilters && (
              <>
                {filters?.map(({ label, options, backgrounColor }, index) => {
                  return (
                    <Box key={label} position="relative">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        width="max-content"
                        onClick={() => handleClose(label)}
                        position="relative"
                        sx={{
                          background: (theme) =>
                            backgrounColor || theme.palette.background,
                          cursor: 'pointer',
                        }}
                        p={2}
                        borderRadius={1}
                        // mb={4}
                        mr={2}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: (theme) => `${theme.palette.text.white}`,
                          }}
                        >
                          {label}
                        </Typography>
                        {searchValue?.[index]?.isOpen ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon sx={{ marginLeft: 1 }} />
                        )}
                      </Box>
                      {searchValue?.[index]?.isOpen && (
                        <Box
                          position="absolute"
                          top={45}
                          left={0}
                          mb={2}
                          p={4}
                          component={Paper}
                          elevation={0}
                          square
                          maxHeight="320px"
                          width="200px"
                          sx={{
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            zIndex: 99,
                            // border: '1px solid red',
                            background: 'white',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Box>
                            {filteredSearchResult(
                              options,
                              searchValue[index]?.value
                            ).length > 0 ? (
                              filteredSearchResult(
                                options,
                                searchValue?.[index]?.value
                              )?.map(({ id, value }) => {
                                return (
                                  <Box key={id}>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="flex-start"
                                      padding={2}
                                      sx={{
                                        cursor: 'pointer',
                                        bgcolor: 'grey',
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle2"
                                        color="textPrimary"
                                        className={classes.dropdownLabel}
                                      >
                                        {value}
                                      </Typography>
                                    </Box>
                                  </Box>
                                );
                              })
                            ) : (
                              <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                sx={{ padding: 2 }}
                              >
                                No search found
                              </Typography>
                            )}
                          </Box>
                          {/* <Box my={1.5}>
                            <Grid container spacing={2}>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    const selecteds = searchValue?.map(
                                      (res) => {
                                        return {
                                          filter: res.name,
                                          value: res.checkedValue,
                                        };
                                      }
                                    );
                                    getFilterValue(
                                      selecteds?.filter((item) => {
                                        if (item.value)
                                          return item.value.length > 0;
                                      })
                                    );
                                    handleClose(label);
                                    setPage ? setPage(0) : null;
                                  }}
                                >
                                  Select
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  sx={{ marginLeft: 1 }}
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {handleClose(label); getFilterValue()}}
                                >
                                  cancel
                                </Button>
                              </Grid>
                            </Grid>
                          </Box> */}
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </>
            )}

            {isDate && (
              <DateRangePicker
                date={date}
                onChange={onChange}
                showSelectedDate={showSelectedDate}
              />
            )}

            {/* {isDate && <DateRangePicker date={date} onChange={onChange} />} */}
            {/* {extraNode ? extraNode : null} */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FilterBoxes;
