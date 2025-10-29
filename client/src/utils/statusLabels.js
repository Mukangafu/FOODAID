// Maps donation status to display text and color classes
export const statusLabel = (status) => {
  switch (status) {
    case "Pending":
      return { text: "Pending", color: "bg-yellow-200 text-yellow-800" };
    case "Picked-Up":
      return { text: "Picked-Up", color: "bg-blue-200 text-blue-800" };
    case "Delivered":
      return { text: "Delivered", color: "bg-green-200 text-green-800" };
    default:
      return { text: "Unknown", color: "bg-gray-200 text-gray-800" };
  }
};
