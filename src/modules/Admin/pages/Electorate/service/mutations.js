import Api from 'utils/Api';

export const canvasserBulk = async () => {
  const response = await Api.post(`canvassers/bulk/`);
  return response;
};
export const canvasserStatusToggle = async ({ id, status }) => {
  const response = await Api.post(`canvassers/${id}/status/`, {
    status,
  });
  return response;
};
