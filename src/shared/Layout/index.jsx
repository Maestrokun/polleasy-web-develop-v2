import React from 'react';
import PropTypes from 'prop-types';
// useNavigate
import { NavLink, Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Skeleton from '@mui/material/Skeleton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import useStyles from 'shared/Layout/styled.layout';

import Logo from 'assets/logo.svg';
import gearIcon from 'assets/gear.svg';

import {
  ADMIN_SIDE_NAVS,
  CALL_GROUP_AGENT_SIDE_INBOUND_NAVS,
  CALL_GROUP_AGENT_SIDE_OUTBOUND_NAVS,
  CALL_GROUP_LEAD_SIDE_NAVS,
  CAMPAIGN_MANAGER_SIDE_NAVS,
  CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS,
} from 'constant/sidenav';

import nameInitial from 'utils/nameInitial';

import useAuth from 'hooks/useAuth';
import { underSCoreCapitalizeWord } from 'utils/stringTranform';

const SIDENAVS = {
  ADMIN: ADMIN_SIDE_NAVS,
  CallGroupLead: CALL_GROUP_LEAD_SIDE_NAVS,
  INBOUND_AGENT: CALL_GROUP_AGENT_SIDE_INBOUND_NAVS,
  OUTBOUND_AGENT: CALL_GROUP_AGENT_SIDE_OUTBOUND_NAVS,
  CAMPAIGN_MANAGER: CAMPAIGN_MANAGER_SIDE_NAVS,
  CALL_GROUP_LEAD: CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS,
};

const LayoutContext = React.createContext();

function Layout({ children }) {
  const classes = useStyles();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bgProps, setBgProps] = React.useState({});
  const bgValues = React.useMemo(() => ({ bgProps, setBgProps }), [bgProps]);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            sx={{ mx: 4 }}
          >
            <Grid item md={4}>
              <img src={Logo} alt="polleasy logo" />
            </Grid>
            <Grid item md={8}>
              <Grid
                container
                spacing={6}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item className="gear">
                  <Link to="/admin/settings">
                    <SettingsIcon />
                  </Link>
                </Grid>
                <Grid item>
                  <Badge
                    variant="dot"
                    color="error"
                    overlap="circular"
                    badgeContent="  "
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </Grid>
                <Grid item>
                  <Avatar onClick={handleClick} sx={{ width: 30, height: 30 }}>
                    <Typography variant="body2">
                      {nameInitial(
                        `${auth?.userObj?.firstname} ${auth?.userObj?.lastname}`
                      )}
                    </Typography>
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        width: 300,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 30,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'blue',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                    <MenuItem>
                      <Stack direction="row" spacing={1}>
                        <Avatar
                          onClick={handleClick}
                          sx={{ width: 40, height: 40, bgcolor: 'blue' }}
                        >
                          <Typography variant="button">
                            {nameInitial(
                              `${auth?.userObj?.firstname} ${auth?.userObj?.lastname}`
                            )}
                          </Typography>
                        </Avatar>
                        <Box>
                          <Typography sx={{ mb: 0 }} variant="body2">
                            {`${auth?.userObj?.firstname} ${auth?.userObj?.lastname}`}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 10, mt: 0 }}
                            variant="caption"
                          >
                            {auth?.userObj?.email || '--'}
                          </Typography>
                        </Box>
                      </Stack>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <Typography variant="body2">Role</Typography>
                        <Typography variant="inherit">
                          {underSCoreCapitalizeWord(auth.user)}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <ModeEditOutlineOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit"> Edit Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        auth.signOut();
                        navigate('/');
                      }}
                    >
                      <ListItemIcon>
                        <PowerSettingsNewOutlinedIcon
                          color="warning"
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <Typography variant="inherit"> Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={0}
        sx={{ background: bgValues.bgProps.color || '#fff' }}
      >
        <Grid item sm={2} sx={{ position: 'fixed', width: '40%' }}>
          <Box component="aside" className="sidenav">
            <Box sx={{ flexGrow: 1, pt: 20 }}>
              {!auth.user ? (
                <Box sx={{ margin: '0px 1.25rem' }}>
                  {[0, 1, 2, 3, 4].map(() => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '.8em',
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={30}
                        height={30}
                        sx={{
                          background: '#e0e0e066',
                          mr: 2,
                        }}
                      />
                      <Skeleton
                        variant="text"
                        height={30}
                        width={140}
                        sx={{ background: '#e0e0e066' }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                // eslint-disable-next-line dot-notation
                <Box sx={{ mt: 4 }}>
                  {SIDENAVS[auth.user]?.map((sidenav) =>
                    sidenav.isHeader ? (
                      <Typography
                        sx={{
                          mt: 2.5,
                          ml: 5,
                          color: '#A7A9BC',
                        }}
                        variant="body1"
                      >
                        {sidenav.name}
                      </Typography>
                    ) : (
                      <NavLink to={sidenav.path} key={sidenav.name}>
                        <img src={sidenav.icon} alt="menu icon" />
                        <Typography variant="body1">{sidenav.name}</Typography>
                      </NavLink>
                    )
                  )}
                </Box>
              )}
            </Box>
            <Box className="setting" sx={{ pl: 6, pb: 6 }}>
              <Grid container alignItems="center" spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                  <img src={gearIcon} alt="gear icon" />
                </Grid>
                <Grid item className="settings">
                  <Link to="/admin/settings">
                    <Typography variant="body1">Settings</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={10} sx={{ ml: '17%', mt: 15 }}>
          <LayoutContext.Provider value={bgValues}>
            <Box component="main" className="main">
              {children}
            </Box>
          </LayoutContext.Provider>
        </Grid>
      </Grid>
    </Box>
  );
}

export const useLayoutContext = () => {
  return React.useContext(LayoutContext);
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
