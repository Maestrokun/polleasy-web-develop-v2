import axios from 'axios';

const AnalyticAPI = axios.create({
  baseURL:
    process.env.REACT_APP_ANALYTIC_BASE_URL ||
    'https://api.mipadevent.prod.prunedge.org/api/v1/',
});

AnalyticAPI.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default AnalyticAPI;
