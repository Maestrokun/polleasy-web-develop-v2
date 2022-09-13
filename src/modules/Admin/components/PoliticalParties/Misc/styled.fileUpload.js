import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  file_upload: {
    cursor: 'pointer',
    textAlign: 'center',
    border: 'dashed 1px #CDCED9',
    borderRadius: '4px',
    paddingTop: '40px',
    paddingBottom: '40px',
    height: 'max-content',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#F2F7F9',
      cursor: 'pointer',
    },
  },
  image_preview: {
    width: '100%',
    borderRadius: '10px',
    height: '250px',
    objectFit: 'cover',
  },
  image_container: {
    position: 'relative',
    overflow: 'hidden',
    height: '250px',
  },
  delete_icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 9999,
  },
  input_field: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 99,
    cursor: 'pointer',
  },
}));

export default useStyles;
