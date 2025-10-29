// Formats a date string into readable format
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
