import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  agentsCard: {
    height: '115px',
    left: '24px',
    top: '88px',
    borderRadius: '4px',
    padding: '24px 0px 24px 0px;',
  },
  agentsCardColor: { backgroundColor: '#E5E5EA' },

  secondAgentsCard: {
    height: '115px',
    left: '24px',
    top: '88px',
    borderRadius: '4px',
    padding: '24px 0px 24px 0px;',
  },
  secondAgentsCardColor: { backgroundColor: '#E5E5EA' },

  thirdAgentsCard: {
    height: '115px',
    left: '24px',
    top: '88px',
    borderRadius: '4px',
    padding: '24px 0px 24px 0px;',
  },
  thirdAgentsCardColor: { backgroundColor: '#E5E5EA' },

  fourthAgentsCard: {
    height: '115px',
    left: '24px',
    top: '88px',
    borderRadius: '4px',
    padding: '24px 0px 24px 0px;',
  },
  fourthAgentsCardColor: { backgroundColor: '#E5E5EA' },

  fifthAgentsCard: {
    height: '115px',
    left: '24px',
    top: '88px',
    borderRadius: '4px',
    padding: '24px 0px 24px 0px;',
  },
  fifthAgentsCardColor: { backgroundColor: '#E5E5EA' },

  root: {
    '& .topNav': {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'space-between',
      height: '64px',
      width: '100%',
      left: '0px',
      top: '64px',
      borderRadius: '0px',
      padding: '0px 14% 0px 12%',
      borderBottom: '2px solid #E5E5EA',
      backgroundColor: '#fff',
      zIndex: '4',
      '& .back': {
        height: '32px',
        width: '67px',
        marginTop: '16px',
        '&:hover': {
          cursor: 'pointer',
        },
      },
      '& .btn': {
        height: '32px',
        width: '67px',
        top: '16px',
        borderRadius: '4px',
        padding: '5px 16px 6px 16px',
      },
    },
  },
  content: {
    height: '2094px',
    width: '74%',
    margin: '9rem 12%',
    '& .frame1': {
      backgroundColor: '#F7F8F9',
      height: '314px',
      border: '1px solid #E5E5EA',
      '& .infoCard': {
        backgroundColor: '#F0F5FF',
        height: '37px',
        borderRadius: '0px',
      },
      '& .titleCard': {
        height: '29px',
        width: '300px',
        left: '0px',
        top: '0px',
        borderRadius: '22px',
        padding: '4px 8px 4px 8px',
        backgroundColor: '#E5EDFF',
        border: '1px solid #0050C8',
      },
      '& .bottomCard': {
        height: '35px',
        width: '100%',
        left: '24px',
        marginTop: '28px',
        borderRadius: '4px',
        padding: '4px 8px 4px 8px',
        backgroundColor: '#0047BD',
      },
    },
    '& .assignment': {
      height: '1740px',
      marginTop: '35px',
      borderRadius: '4px',
      padding: '16px',
      border: '1px solid #E5E5EA',
      '& .candidateCard': {
        height: '88px',
        left: '0px',
        marginTop: 2,
        borderRadius: '4px',
        padding: '24px',
        backgroundColor: '#F0F5FF',
      },
      '& .agentAssigned': {
        height: '283px',
        left: '0px',
        marginTop: '35px',
        borderRadius: '4px',
        border: '1px solid #E5E5EA',
        '& .headerCard': {
          display: 'flex',
          height: '56px',
          left: '0px',
          top: '0px',
          borderRadius: '2px',
          padding: '16px 16px 16px 24px',
          backgroundColor: '#F1F2F6',
        },
        '& .selectedAgents': {
          backgroundColor: '#F3F2F1',
          height: '35px',
          width: '80px',
          left: '4px',
          top: '4px',
          borderRadius: '5px',
          padding: '5px',
          marginLeft: '10px',
        },
      },
    },
  },
});

export default useStyles;
