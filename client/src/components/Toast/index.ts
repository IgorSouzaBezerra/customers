import { toast } from 'react-toastify';

export function ErrorToast(message: string) {
    return toast.error(message, {
        position: "bottom-right"
    });
}

export function InfoToast(message: string) {
    return toast.info(message, {
        position: "bottom-right"
    });
}

export function SucessToast(message: string) {
    return toast.success(message, {
        position: "bottom-right"
    });
}