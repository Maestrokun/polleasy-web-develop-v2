import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { getAgentWorkstation } from 'services/workstation';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { capitalize } from 'lodash';
import TimeLine from 'modules/Admin/components/CallGroup/TimeLine';
import { getTimeline } from 'utils/transformDate';
import { underscoreRemove } from 'utils/stringTranform';
import { ReactComponent as EmptyCallCenter } from 'assets/emptyCallCenter.svg';
import { Card } from 'shared';
import EmptyState from 'shared/NewTable/EmptyState';

import { WORKBENCH_PROGRESS_STATUS_BG } from 'constant/workbenchData';
import useStyles from 'modules/CallGroupAgent/pages/WorkStation/styled.workstation';
import Score from './Score';

function Workstation({ search = '', filterValue, date = '' }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const { data: dataPoll, isLoading } = useQuery(
    [
      'getAgentPolls',
      {
        search,
        type: filterValue?.find((f) => f.filter === 'Poll type')?.value,
        status: filterValue?.find((f) => f.filter === 'Status')?.value,
        startDate: date[0]?.created_at_after,
        endDate: date[0]?.created_at_before,
      },
    ],
    getAgentWorkstation,
    {
      enabled: true,
    }
  );

  if (dataPoll?.data?.data?.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <EmptyCallCenter />
        <Typography>
          We currently do not have any workstation created
        </Typography>
      </Box>
    );
  }

  const handleNavigate = (id) => {
    navigate(`/outbound-call-agent/workstation/view-poll/${id}`);
  };
  return (
    <>
      <Grid container spacing={5} className={classes.workbench}>
        {dataPoll?.data?.data?.map((data) => (
          <>
            <Box>{data === undefined && <EmptyState />}</Box>
            <Grid item md={4} key={data.id}>
              <Card>
                <Box
                  onClick={() => {
                    handleNavigate(data?.id);
                  }}
                  className={classes.wrapper}
                >
                  <Stack
                    direction="row"
                    display="flex"
                    justifyContent="space-between"
                    className="container"
                  >
                    <Typography variant="subtitle1">
                      {capitalize(
                        underscoreRemove(data.type?.toLowerCase()) || '--'
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color:
                          data.status === 'Complete' ? '#107C10' : '#592474',
                        background:
                          WORKBENCH_PROGRESS_STATUS_BG[
                            capitalize(data.status?.toLowerCase())
                          ],
                        borderRadius: '4px',
                        padding: '4px 4px',
                      }}
                    >
                      {capitalize(
                        underscoreRemove(data?.status?.toLowerCase())
                      )}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 500 }}>{data?.name}</Typography>
                  <Typography variant="body2">{data.rating}</Typography>
                  <Box height="3.5rem" display="flex">
                    {' '}
                    <Score counts={data?.progress} />
                  </Box>
                  <Box>
                    <TimeLine
                      progress={
                        getTimeline(data.start_date, data.end_date) < 0
                          ? 0
                          : getTimeline(data.start_date, data.end_date)
                      }
                      startDate={data.start_date}
                      endDate={data.end_date}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>

      {isLoading && (
        <Box
          sx={{
            width: '100%',
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress sx={{ size: '1.5rem' }} />
        </Box>
      )}
    </>
  );
}

export default Workstation;

Workstation.propTypes = {
  search: PropTypes.string.isRequired,
  filterValue: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  // type: PropTypes.arrayOf.isRequired,
  // status: PropTypes.arrayOf.isRequired,
};
