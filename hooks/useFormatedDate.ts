export const getFormatedDate = () => {
  const now = new Date();
  const offsetMs = 8 * 60 * 60 * 1000; // UTC+8
  const localTime = new Date(now.getTime() + offsetMs);
  const formatted = localTime.toISOString().split(".")[0];
  return formatted;
};
