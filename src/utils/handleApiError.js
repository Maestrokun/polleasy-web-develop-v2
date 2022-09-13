// This file contains configuration for handling error states from API after a request fails.

/* eslint-disable */
/* eslint-disable no-case-declarations */
const genericMessage =
  'Something went wrong while trying to connect with the server';

const handleApiError = (error) => {
  console.log({ handleApiError: error });
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.warn('[Axios Error]', error, error.response);
  }
  if (!error.response) return 'Something went wrong';
  const { response } = error;
  const { data, status } = response;

  switch (status) {
    case 400:
      console.log({ status });
      const keys = Object.keys(data);

      if (data?.errors?.message) {
        return data?.errors?.message;
      }
      
      const firstItem = data[0];
      if (typeof firstItem === 'object') {
          const arry = [];
          let toastMsg = {};
          for (const errorKey of Object.keys(firstItem)) {
            // if (typeof firstItem[errorKey][errorKey] !)
            //    arry.push(firstItem[errorKey][errorKey][0]);
            arry.push(firstItem[errorKey][errorKey]);
            toastMsg = {
              ...toastMsg,
             ...arry
            };
        }
        const reply = JSON.stringify(toastMsg);
        return reply.replace(/[{}]/g, '');
       
      }

      if (Array.isArray(firstItem)) {
        let toastMsg = {};
        firstItem?.forEach((v, i) => {
          toastMsg = {
            ...toastMsg,
            [`error-${i}`]: `${v}`,
          };
        });
        // return `${keys[0]}: ${firstItem[0]}`;
        return JSON.stringify(toastMsg);
      }
      if (typeof firstItem === 'string') return firstItem;

      const detailKeys = Object.keys(data?.detail || {});
      if (detailKeys.length) {
        const firstDetail = data?.detail[detailKeys[0]];
        if (Array.isArray(firstDetail))
          return `${detailKeys[0]}: ${firstDetail[0]}`;
        if (typeof firstDetail === 'string') return firstDetail;
      }

      const dataErrors = Object.keys(data?.errors || {});
      if (dataErrors.length > 0) {
        const firstError = data?.errors[dataErrors[0]];
        if (Array.isArray(firstError))
          return `${dataErrors[0]}: ${firstError[0]}`;
        if (typeof firstError === 'string') return firstError;
      }

      const dataErrorsError = Object.keys(data?.errors?.error || {});
      if (dataErrorsError.length > 0) {
        let toastMsg = {};
        const dataErrorsErrorValues = Object.values(data?.errors?.error || {});
        if (dataErrorsErrorValues.length > 0) {
          dataErrorsErrorValues?.forEach((v, i) => {
            toastMsg = {
              ...toastMsg,
              [dataErrorsError?.[i] || i]: `${v?.[0]}`,
            };
          });
        }

        // return `${keys[0]}: ${firstItem[0]}`;
        return JSON.stringify(toastMsg);
      }

      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        genericMessage
      );
    case 401:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        'You are not authorized to perform this action'
      );
    case 404:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        'The resource you are trying to load cannot be found'
      );
    case 409:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        'A duplicate already exists'
      );
    case 500:
      return genericMessage;
    default:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        genericMessage
      );
  }
};

export default handleApiError;
