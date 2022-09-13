/* eslint-disable */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import FilterBoxes from '../FilterBoxes';
import { TextField } from 'shared';

function SearchAndFilters({
  filters,
  showFilters,
  getFilterValue,
  date,
  onChange,
  isDate,
  filterBackgroundColor,
  extraNode,
  getSearchValue,
  setPage,
  grid,
  showSelectedDate,
}) {
  const { control } = useForm({});
  const values = filters?.map((fil) => {
    return {
      name: fil.label,
      value: '',
      isOpen: false,
      checked: false,
      checkedValue: [],
    };
  });
  const [searchValue, setSearchValue] = useState(values);

  const handleClose = (label) => {
    const result = searchValue?.map((el) => {
      if (el.name === label) {
        el.isOpen = !el.isOpen;
      } else {
        el.isOpen = false;
      }
      return el;
    });
    setSearchValue(result);
  };

  const filteredSearchResult = (list = [], search) => {
    if (Boolean(search)) {
      let filteredList = list.filter(({ value }) => {
        let filtered = value?.toLowerCase()?.includes(search?.toLowerCase());
        return filtered;
      });
      return filteredList;
    }
    return list;
  };

  const handleChecked = (e, selected, id, index) => {
    const ids = filters
      ?.map(({ options }) => options)
      [index]?.map(({ id }) => id);

    if (e.target.checked) {
      if (id === 'all') {
        const result = searchValue?.map((el) => {
          if (el.name === selected.name) {
            el.checkedValue = ids;
            el.checked = !el.checked;
          }
          return el;
        });
        setSearchValue(result);
        return;
      }
      const result = searchValue?.map((el) => {
        if (el.name === selected.name) {
          el.checkedValue.push(id);
          el.checked = !el.checked;
        }
        return el;
      });
      setSearchValue(result);
    } else {
      if (id === 'all') {
        const result = searchValue?.map((el) => {
          if (el.name === selected.name) {
            el.checkedValue = [];
            el.checked = !el.checked;
          }
          return el;
        });
        setSearchValue(result);
        return;
      }
      const result = searchValue?.map((el) => {
        if (el.name === selected.name) {
          el.checkedValue = el.checkedValue?.filter((un) => un !== id);
          el.checked = !el.checked;
        }
        return el;
      });
      setSearchValue(result);
    }
  };

  return (
    <Grid container spacing={4} alignItems="flex-end">
      <Grid item xs={grid?.t?.xs || 12} md={grid?.t?.md || 5}>
        <TextField
          control={control}
          name="search"
          label="Search"
          type="search"
          onChange={(e) => {
            !!setPage ? setPage(0) : null;
            getSearchValue?.(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {showFilters || isDate ? (
        <Grid item xs={grid?.f?.xs || 12} md={grid?.f?.md || 5}>
          <FilterBoxes
            filters={filters}
            setPage={setPage}
            handleClose={handleClose}
            searchValue={searchValue}
            filteredSearchResult={filteredSearchResult}
            handleChecked={handleChecked}
            getFilterValue={getFilterValue}
            isDate={isDate}
            showFilters={showFilters}
            date={date}
            onChange={onChange}
            filterBackgroundColor={filterBackgroundColor}
            extraNode={extraNode}
            showSelectedDate={showSelectedDate}
          />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default SearchAndFilters;
