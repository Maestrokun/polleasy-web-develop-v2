import { useContext } from 'react';

import { CampaignStepperContext } from 'context/campaignStepperContext';

const useCampaignStepper = () => {
  const { currentStep, handleSelectedStep, handleNext, handlePrev } =
    useContext(CampaignStepperContext);

  return { currentStep, handleSelectedStep, handleNext, handlePrev };
};

export default useCampaignStepper;
