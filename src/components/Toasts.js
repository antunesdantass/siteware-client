import { toast } from 'react-toastify';

const Success = message => toast.success(message);

const Warning = message => toast.warn(message);

const Error = message => toast.error(message);

export { Success, Warning, Error }