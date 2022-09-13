import React from 'react';
import PropTypes from 'prop-types';

export const QuestionContext = React.createContext(null);

function QuestionContextProvider({ children }) {
  const [question, setQuestion] = React.useState([]);
  const value = React.useMemo(
    () => ({
      question,
      setQuestion,
    }),
    [question]
  );

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContextProvider;

QuestionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
