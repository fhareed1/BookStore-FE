import toast, {ToastBar, Toaster} from 'react-hot-toast';
// import {CloseIcon, InfoIcon} from '@/components/ui/icons';
import { IoIosClose, IoIosInformationCircle } from "react-icons/io";

export default function Toast() {
  return (
    <Toaster
      containerStyle={{
        inset: 20,
        isolation: 'isolate',
      }}
      containerClassName="toaster"
      position="top-right"
      toastOptions={{
        className:
          'text-sm text-neutral-600 font-medium md:min-w-[391px] flex items-center justify-start px-3 py-2.5 rounded-xl h-fit border border-neutral-50 min-h-11 shadow-[0_10px_16px_-3px_rgba(35,31,32,0.05)_0_3px_10px_-2px_rgba(35,31,32,0.02)]',
        success: {
          icon: <IoIosInformationCircle className="fill-aqua-600 max-w-5 w-full h-6" />,
        },
        error: {
          icon: <IoIosInformationCircle className="fill-red-400 max-w-5 w-full h-6" />,
        },
      }}
    >
      {/* doing this to add the close icon on the far right of every toast */}
      {t => (
        <ToastBar toast={t}>
          {({icon, message}) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                  }}
                >
                  <IoIosClose />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
