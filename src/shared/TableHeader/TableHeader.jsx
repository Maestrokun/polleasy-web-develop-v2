/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
// import _debounce from 'lodash.debounce';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import useDebounce from 'hooks/useDebouncee';

function TableHeader({
  options,
  tableParams,
  setTableParams,
  paginationBool,
  filterBool,
}) {
  const theme = useTheme();
  const [text, setText] = React.useState(tableParams?.search || '');
  const debouceValue = useDebounce(text, 600);

  const handleChange = (event, value) => {
    event.preventDefault();
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          pageNumber: value,
        },
      };
    });
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  React.useEffect(() => {
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        search: debouceValue,
        pagination: {
          ...prevParams.pagination,
          pageNumber: 1,
        },
      };
    });
  }, [debouceValue]);

  const handleFilter = (e) => {
    e.preventDefault();
    setTableParams((prev) => ({
      ...prev,
      filterBy: e.target.value,
    }));
  };

  const handlePageSizeChange = (event) => {
    event.preventDefault();
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          pageNumber: 1,
          pageSize: event.target.value,
        },
      };
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleSearch = (event) => {
    event.preventDefault();
    // const textValue = useDebounce(event.target.value, 4000);
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        search: event.target.value,
        pagination: {
          ...prevParams.pagination,
          pageNumber: 1,
        },
      };
    });
  };

  return (
    <Box
      sx={{
        boxShadow: 'inset 0px 2px 1px -1px rgba(0,0,0, 0.1)',
        display: 'grid',
        gridTemplateColumns: '250px 200px auto',
        gap: '20px',
        py: 4,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        value={text}
        type="text"
        size="small"
        onChange={handleTextChange}
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {filterBool && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            fontWeight={500}
            lineHeight={1.33}
            color="text.secondary"
            sx={{ mr: 1 }}
          >
            Filter By:
          </Typography>
          <Box
            sx={{
              flex: 1,
              width: '120px',
              '& .MuiFormControl-root': {
                backgroundColor: '#f1f2f6',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.grey[400],
              },
            }}
          >
            <TextField
              value={tableParams.filterBy}
              select
              onChange={handleFilter}
              fullWidth
              sx={{
                '& .MuiMenuList-root': {
                  px: 1,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.grey[400],
                },
              }}
            >
              {options.map((v) => (
                <MenuList
                  key={v.label}
                  value={v.value}
                  sx={{
                    px: 2,
                    borderBottom: '1px solid #e8e8e8',
                    '&:hover': {
                      backgroundColor: '#e8e8e8',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {v.label}
                </MenuList>
              ))}
            </TextField>
          </Box>
        </Box>
      )}
      {tableParams && paginationBool && (
        <Box>
          <Pagination
            onRowsPerPageChange={handlePageSizeChange}
            onPageChange={handleChange}
            page={tableParams.pagination.pageNumber - 1}
            count={tableParams.pagination.total}
            rowsPerPage={tableParams.pagination.pageSize}
            rowsPerPageOptions={[10, 20, 30, 50]}
            component="div"
            // labelDisplayedRows={({ from, to, count }) => {
            //   return `${from}-${to} of ${
            //     count !== -1 ? count : `more of ${to}`
            //   }`;
            // }}
          />
        </Box>
      )}
    </Box>
  );
}

TableHeader.propTypes = {
  options: PropTypes.array.isRequired,
  tableParams: PropTypes.object,
  setTableParams: PropTypes.func.isRequired,
  paginationBool: PropTypes.bool,
  filterBool: PropTypes.bool,
};

TableHeader.defaultProps = {
  tableParams: {},
  paginationBool: false,
  filterBool: true,
};

export default TableHeader;
