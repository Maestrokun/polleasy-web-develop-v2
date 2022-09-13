/* eslint-disable */
import { v4 as uuid } from 'uuid';
import { styled, Box, ButtonBase } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { pxToRem } from 'utils/formatFont';
import { fieldConfigs as options, icons } from './pollConstants';

const fieldsLookup = {
  SingleAnswer: 'Single Answer',
  MultipleAnswer: 'Multiple Answer',
  Rating: 'Rating',
  PartyPopularity: 'Party Popularity',
  CandidatePopularity: 'Candidates Popularity',
};

const QuestionsSidebar = ({ onAddField }) => {
  const handleClick = (option) => () => {
    const uniqueId = uuid();
    onAddField({
      options: [],
      ...option,
      id: uniqueId,
      key: uniqueId,
    });
  };
  return (
    <>
      <Box>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#F9FAFB',
            minHeight: 632,
            paddingTop: 10,
            borderTop: `1px solid #E5E5EA`,
          }}
        >
          {options.map((option) => {
            const Icon = icons[option.type];
            const inActive =
              option.type === 'PartyPopularity' ||
              option.type === 'CandidatePopularity';
            return (
              <AppTooltip title={fieldsLookup[option.type]}>
                <ButtonBase
                  disabled={inActive}
                  onClick={handleClick(option)}
                  key={option.id}
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#fff',
                    opacity: inActive ? 0.4 : 1,
                    border: '1px solid #f2f2f2',
                    boxShadow:
                      '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
                    m: 2,
                    p: 2,
                    cursor: 'pointer',
                  }}
                >
                  <Icon />
                </ButtonBase>
              </AppTooltip>
            );
          })}
        </div>
      </Box>
    </>
  );
};

export default QuestionsSidebar;

const Wrapper = styled('div')(({ theme }) => ({
  padding: 16,
  minHeight: '100%',
  background: '#F9FAFB',

  '& > .MuiTypography-root': {
    marginBottom: 10,
  },
}));

const Option = styled('div')(() => ({
  background: 'white',
  padding: 10,
  paddingBottom: 16,
  width: 216,
  boxShadow:
    '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
  marginTop: 10,
  display: 'flex',
  cursor: 'pointer',
  userSelect: 'none',

  '& > *': {
    display: 'block',
    fontSize: pxToRem(14),
    margin: 'auto 0',
  },

  '& >:first-child': {
    width: 'auto',
    height: 23,
    marginRight: 8,
  },
}));

const AppTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
