import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Card } from 'shared';

import Poll from 'modules/Admin/pages/Campaign/CampaignDetails/CampaignStats/Poll';
import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/CampaignStats/styled.campaignStats';

function StatsCard({
  title,
  subtitle1,
  subtitle2,
  icon,
  values,
  values2,
  backgroundImage,
  menuIcon,
  borderLine,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Card
            style={{
              height: 'min-content',
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: '5px',
              paddingTop: '5px',
            }}
          >
            <Box display="flex" gap="10px">
              <Box>
                <img src={borderLine} alt="" />
              </Box>
              <Grid container spacing={4}>
                <Grid item xs={9}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="7px"
                    style={{ paddingBottom: '5px', paddingTop: 0 }}
                  >
                    <img src={menuIcon} alt="" />
                    <Typography
                      variant="h4"
                      sx={{ mb: 4, pt: 4 }}
                      alignSelf="center"
                    >
                      {title}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    style={{ marginLeft: '5px' }}
                  >
                    <Grid container spacing={1} sx={{ pb: 1 }}>
                      <Grid container xs={3}>
                        <Grid item>
                          <Poll title={subtitle1} values={values} icon={icon} />
                        </Grid>
                      </Grid>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Grid container xs={3} sx={{ ml: 5 }}>
                        <Grid item>
                          <Poll title={subtitle2} values={values2} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  {' '}
                </Grid>
                <Grid
                  className="img"
                  item
                  xs={2}
                  sx={{
                    backgroundImage: `url(${backgroundImage})`,
                  }}
                />
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  icon: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.string),
  values2: PropTypes.arrayOf(PropTypes.string),
  backgroundImage: PropTypes.string,
  menuIcon: PropTypes.string,
  borderLine: PropTypes.string,
};

StatsCard.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  icon: false,
  values: [],
  values2: [],
  backgroundImage: '',
  menuIcon: '',
  borderLine: '',
};

export default StatsCard;
