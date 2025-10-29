export const redirectByRole = (role) => {
  switch (role) {
    case "donor":
      return "/donor";
    case "foodbank":
      return "/foodbank";
    case "volunteer":
      return "/volunteer";
    case "admin":
      return "/admin";
    default:
      return "/login";
  }
};
