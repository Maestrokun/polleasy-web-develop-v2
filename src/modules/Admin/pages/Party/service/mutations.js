import Api from 'utils/Api';

export const canvasserBulk = async (file) => {
  const response = await Api.post(`canvassers/bulk/`, file);
  return response;
};
export const canvasserStatusToggle = async ({ id, status }) => {
  const response = await Api.post(`canvassers/${id}/status/`, {
    status,
  });
  return response;
};
