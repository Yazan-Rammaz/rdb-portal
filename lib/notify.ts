import toast from "react-hot-toast";

export const notify = ({
  type = "info",
  message,
  timeout = 2000,
}: {
  type?: string;
  message: string;
  timeout?: number;
}) => {
  switch (type) {
    case "info":
      toast(message, { duration: timeout });
      break;
    case "error":
      toast.error(message, { duration: timeout });
      break;
    case "success":
      toast.success(message, { duration: timeout });
      break;
    default:
      toast(message, { duration: timeout });
  }
};
