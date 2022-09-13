import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import { Card, Button } from 'shared';

import APC from 'assets/apc.svg';
import PDP from 'assets/pdp.svg';
import LP from 'assets/lp.svg';
import APGA from 'assets/apga.svg';

import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/components/Campaign/CampaignCard/styled.campaignCard';

import EditModal from 'modules/Admin/components/Campaign/Modal/EditModal';

function ElectionCampaignCard({ campaign }) {
  const classes = useStyles();
  const [isReadMore, setIsReadMore] = useState(false);

  const [edit, setEdit] = useModal();

  const handleEdit = useCallback(() => {
    setEdit({ ...edit, modalName: 'editModal' });
  }, [edit]);

  const handleToggle = useCallback(() => setIsReadMore(!isReadMore));

  const extraContent = (
    <div>
      <Typography variant="subtitle1">
        layouts, and discover ... Generate Lorem Ipsum placeholder text for use
        in your graphic, print and web layouts, and discover. Generate Lorem
        Ipsum placeholder text for use in your graphic, print and web layouts,
        and discover ...
      </Typography>
    </div>
  );

  return (
    <>
      <Card style={{ padding: '0px' }}>
        <Box className={classes.root} sx={{ p: '1rem' }}>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Grid className={classes.title}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="span"
                >
                  {campaign.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    backgroundColor: campaign.status_bg,
                  }}
                  className={classes.status}
                  component="span"
                >
                  {campaign.status}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" marginTop="10px" marginBottom="10px">
              {campaign.stat}
            </Typography>
            <Typography variant="subtitle1" marginBottom="10px">
              {campaign.subtitle}
              {isReadMore && extraContent}
            </Typography>
            <Button variant="text" onClick={handleToggle} fullWidth={false}>
              {isReadMore ? 'See less' : 'Read more'}
            </Button>
          </Grid>
          <Grid container sx={{ my: 2 }}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} marginBottom="10px" marginTop="8px">
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1" color="#393A4A">
                    Party Name
                  </Typography>
                  <Typography variant="body2" className={classes.party}>
                    {campaign.party}
                  </Typography>
                </Box>
                <Box>
                  <img
                    src={APC}
                    alt="apc flag"
                    width={32}
                    height={40}
                    style={{ marginLeft: '10px' }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid marginBottom="10px">
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="#6B6C7E">
                  Candidate Name
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.candidate}
                  component="span"
                >
                  {campaign.candidate}
                </Typography>
              </Grid>
            </Grid>
            <Grid container marginBottom="10px">
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="#6B6C7E">
                  Party Alias
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.alias}
                  component="span"
                >
                  {campaign.alias}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container sx={{ my: 2 }}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} alignItems="center" />
              <Stack direction="column">
                <Typography
                  variant="subtitle1"
                  color="#6B6C7E"
                  component="span"
                >
                  Campaign Manager
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  component="span"
                  className={classes.manager}
                >
                  {campaign.manager}
                </Typography>
              </Stack>
            </Grid>
            <Grid container sx={{ my: 2 }}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
            <Typography
              variant="subtitle1"
              color="#6B6C7E"
              component="span"
              marginTop="10px"
              marginBottom="15px"
            >
              OPPOSITION DETAILS
            </Typography>
            <Grid item xs={12} marginBottom="15px">
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1" color="#393A4A">
                    Peoples Democratic Party
                  </Typography>
                  <Typography variant="body2" className={classes.party}>
                    {campaign.candidate}
                  </Typography>
                </Box>
                <Box>
                  <img
                    src={PDP}
                    alt="apc flag"
                    width={32}
                    height={40}
                    style={{ marginLeft: '10px' }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} marginBottom="15px">
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1" color="#393A4A">
                    All Progressives Grand Alliance
                  </Typography>
                  <Typography variant="body2" className={classes.party}>
                    {campaign.candidate}
                  </Typography>
                </Box>
                <Box>
                  <img
                    src={APGA}
                    alt="apc flag"
                    width={32}
                    height={40}
                    style={{ marginLeft: '10px' }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} marginBottom="15px">
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1" color="#393A4A">
                    Labour Party
                  </Typography>
                  <Typography variant="body2" className={classes.party}>
                    {campaign.candidate}
                  </Typography>
                </Box>
                <Box>
                  <img
                    src={LP}
                    alt="apc flag"
                    width={32}
                    height={40}
                    style={{ marginLeft: '10px' }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.bottom}>
          <Typography
            variant="body1"
            color="#0050C8 !important"
            onClick={handleEdit}
          >
            Edit
            <ModeEditOutlinedIcon />
          </Typography>
        </Box>
      </Card>
      <EditModal />
    </>
  );
}

export default ElectionCampaignCard;

ElectionCampaignCard.propTypes = {
  campaign: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    stat: PropTypes.string,
    status_bg: PropTypes.string,
    status: PropTypes.string,
    party: PropTypes.string,
    alias: PropTypes.string,
    candidate: PropTypes.string,
    manager: PropTypes.string,
  }).isRequired,
};
