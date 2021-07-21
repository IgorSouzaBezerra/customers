import { toast } from 'react-toastify';

export function ErrorToast(message: string) {
    return toast.error(message, {
        position: "top-right"
    });
}

export function InfoToast(message: string) {
    return toast.info(message, {
        position: "top-right"
    });
}

export function SucessToast(message: string) {
    return toast.success(message, {
        position: "top-right"
    });
}