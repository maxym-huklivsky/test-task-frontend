import { BiError } from 'react-icons/bi';
import { toast } from 'react-toastify';

const toastifyError = (error) => {
  toast(error.response.data.message, {
    className: 'toast-message',
    icon: <BiError />,
  });
  toast.clearWaitingQueue();
};

export default toastifyError;
