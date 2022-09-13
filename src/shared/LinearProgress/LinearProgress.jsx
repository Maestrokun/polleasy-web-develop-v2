import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import { numberWithCommas } from 'utils/numberformat';
import { ReactComponent as ContainerIcon } from 'assets/svg/Container.svg';
import { pxToRem } from 'utils/formatFont';

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'customColor',
})(({ customColor }) => ({
  height: 40,
  borderRadius: 16,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 16,
    // backgroundColor: '#fff',
  },
  [`& .${linearProgressClasses.barColorPrimary}`]: {
    backgroundColor: customColor,
  },
}));

export function DashboardLinearProgress({
  value,
  amount,
  customColor,
  state,
  ...rest
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Box
        sx={{
          minWidth: `calc(${state.percentage}% - 80px)`,
          mr: 1,
          position: 'relative',
        }}
      >
        <BorderLinearProgress
          color="primary"
          variant="determinate"
          value={100}
          customColor={customColor}
          {...rest}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="absolute"
          top={0}
          bottom={0}
          width="100%"
          padding="20px"
          sx={{ color: '#fff' }}
        >
          <Typography
            fontWeight={600}
            fontSize={pxToRem(16)}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            title={state.name}
          >
            {state.name}
          </Typography>
          <Box>
            <ContainerIcon />
          </Box>
        </Box>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${numberWithCommas(
          Math.round(state.count)
        )}`}</Typography>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          state.percentage
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

DashboardLinearProgress.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  state: PropTypes.objectOf({
    percentage: PropTypes.number.isRequired,
    name: PropTypes.string.isisRequired,
  }).isRequired,
  value: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  customColor: PropTypes.string.isRequired,
};

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <DashboardLinearProgress value={progress} />
    </Box>
  );
}
