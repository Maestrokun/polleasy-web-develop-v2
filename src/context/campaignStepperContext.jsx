import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CampaignStepperContext = createContext(null);

function CampaignStepperContextProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleSelectedStep = (id) => {
    setCurrentStep(Number(id));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Number(prev) + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Number(prev) - 1);
  };

  const value = useMemo(
    () => ({
      currentStep,
      handleSelectedStep,
      handleNext,
      handlePrev,
    }),
    [currentStep]
  );
  return (
    <CampaignStepperContext.Provider value={value}>
      {children}
    </CampaignStepperContext.Provider>
  );
}

export default CampaignStepperContextProvider;

CampaignStepperContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
