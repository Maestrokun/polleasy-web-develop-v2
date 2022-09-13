import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

import Polls from 'modules/Admin/pages/CallGroup/Polls';
import Agents from 'modules/Admin/pages/CallGroup/Agents';

import { TabNav, Button } from 'shared';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';
import { ReactComponent as LeftArrow } from 'assets/svg/arrowRight.svg';

import ViewAgent from 'modules/Admin/components/CallGroup/Drawer/ViewAgent';
import DeactivateModal from 'modules/Admin/components/CallGroup/Modal/DeactivateModal';
import ActivateModal from 'modules/Admin/components/CallGroup/Modal/ActivateModal';
import SuccessModal from 'modules/Admin/components/CallGroup/Modal/SuccessModal';
import EditCallCenter from 'modules/Admin/components/CallGroup/Drawer/EditCallCenter';

import {
  CALL_GROUP_STATUS_BGCOLOR,
  CALL_GROUP_STATUS_COLOR,
  CALL_GROUP_TYPE_BG_COLOR,
  CALL_GROUP_TYPE_BORDER,
  CALL_GROUP_TYPE_COLOR,
} from 'constant/callCenterStatus';

import useStyles from 'modules/Admin/pages/CallGroup/ViewCallGroup/styled.viewCallGroup';
import { useFetchSIngleCallGroup } from 'hooks/queries/useCallGroup';
import { capitalizeWord } from 'utils/stringTranform';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4, px: 0 }}>{children}</Box>}
    </div>
  );
}

function ViewCallGroup() {
  const classes = useStyles();
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [state, setState] = useModal();

  const { singleCallGroup, fetchingCallGroupById } = useFetchSIngleCallGroup({
    callGroupId: id,
  });
  const [edit, setEdit] = useDrawer();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeactivate = useCallback(() => {
    setState({ ...state, modalName: 'deactivateModal', id });
  }, [state]);

  const handleActivate = useCallback(() => {
    setState({ ...state, modalName: 'activateModal', id });
  }, [state]);

  const handleEditCallCenter = useCallback(() => {
    setEdit({
      ...edit,
      drawerName: 'editCallCenter',
      data: singleCallGroup && singleCallGroup,
      center: singleCallGroup?.name,
    });
  }, [edit, singleCallGroup]);

  return (
    <Box className={classes.root}>
      <Grid
        container
        md={9.3}
        spacing={2}
        justifyContent="space-between"
        className={classes.wrapper}
      >
        <Grid item md={9.8}>
          <Breadcrumbs sx={{ p: 0, mb: 5 }}>
            <Link
              to="/admin/call-group"
              style={{
                display: 'flex',
                justifySelf: 'center',
                alignItems: 'center',
              }}
            >
              <LeftArrow /> <Typography sx={{ p: 0 }}>Call Group</Typography>
            </Link>
            <Typography sx={{ p: 0, textTransform: 'capitalize' }}>
              {singleCallGroup?.name || '---'}
            </Typography>
          </Breadcrumbs>
          {!fetchingCallGroupById && singleCallGroup ? (
            <Grid
              container
              alignItems="flex-start"
              className={classes.managerWrapper}
            >
              <Grid item md={12}>
                <Grid container>
                  <Grid item md={12}>
                    <Grid container justifyContent="space-between">
                      <Grid item md={12}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Grid item>
                            <Box>
                              <Typography
                                variant="subtitle1"
                                component="span"
                                sx={{
                                  backgroundColor:
                                    CALL_GROUP_TYPE_BG_COLOR?.[
                                      singleCallGroup?.type?.toLowerCase() ||
                                        'inbound'
                                    ],
                                  color:
                                    CALL_GROUP_TYPE_COLOR?.[
                                      singleCallGroup?.type?.toLowerCase() ||
                                        'inbound'
                                    ],
                                  border: `1px solid ${
                                    CALL_GROUP_TYPE_BORDER?.[
                                      singleCallGroup?.type?.toLowerCase() ||
                                        'inbound'
                                    ]
                                  }`,
                                  borderRadius: '4px',
                                  p: 1,
                                }}
                              >
                                {capitalizeWord(singleCallGroup?.type || '--')}
                              </Typography>
                              <Typography
                                variant="h5"
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {singleCallGroup && singleCallGroup.name}
                                <span
                                  className="status"
                                  style={{
                                    background:
                                      CALL_GROUP_STATUS_BGCOLOR[
                                        singleCallGroup?.is_active
                                          ? 'Active'
                                          : 'Inactive'
                                      ],
                                    color:
                                      CALL_GROUP_STATUS_COLOR[
                                        singleCallGroup?.is_active
                                          ? 'Active'
                                          : 'Inactive'
                                      ],
                                  }}
                                >
                                  {singleCallGroup &&
                                  !singleCallGroup?.is_active
                                    ? 'Deactivated'
                                    : 'Active'}
                                </span>
                              </Typography>
                            </Box>
                            <Box className={classes.manager}>
                              <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                                Group Lead
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  textTransform: 'capitalize',
                                }}
                              >
                                <Avatar
                                  src={singleCallGroup.lead.image ?? null}
                                  alt="profile image"
                                  sx={{ width: 24, height: 24, mr: 2 }}
                                />
                                {singleCallGroup &&
                                  `${singleCallGroup.lead.firstname} ${singleCallGroup.lead.lastname}`}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item className={classes.editDetail}>
                                <Button onClick={handleEditCallCenter}>
                                  Edit Details
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  onClick={
                                    singleCallGroup &&
                                    !singleCallGroup?.is_active
                                      ? handleActivate
                                      : handleDeactivate
                                  }
                                >
                                  {singleCallGroup &&
                                    singleCallGroup?.is_active &&
                                    'Deactivate'}
                                  {singleCallGroup &&
                                    !singleCallGroup?.is_active &&
                                    'Activate'}
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Box className={classes.loader}>
              <Skeleton />
            </Box>
          )}
          <Grid container sx={{ mt: 5 }}>
            <Grid item md={12}>
              <TabNav
                navs={
                  singleCallGroup?.type === 'OUTBOUND'
                    ? ['Poll', 'Agent']
                    : ['Agent']
                }
                value={value}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box className={classes.tabWrapper}>
        {singleCallGroup?.type === 'OUTBOUND' ? (
          <>
            <TabPanel value={value} index={0}>
              <Polls />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Agents />
            </TabPanel>
          </>
        ) : (
          <TabPanel value={value} index={0}>
            <Agents />
          </TabPanel>
        )}
      </Box>
      <DeactivateModal />
      <ActivateModal />
      <SuccessModal />
      <ViewAgent />
      <EditCallCenter />
    </Box>
  );
}

export default ViewCallGroup;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
