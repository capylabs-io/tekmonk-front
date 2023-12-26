import classNames from 'classnames';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
} from 'lucide-react';
import React, { useEffect } from 'react';

import { SnackbarTypes, useSnackbarStore } from '@/store/SnackbarStore';

const BASE_CLASSES =
  'inset-x-0 mx-auto w-fit rounded-md p-4 hs-removing:translate-x-10 hs-removing:opacity-0 fixed z-50 transition-all duration-1000 ease-in-out';

export const Snackbar: React.FC = () => {
  const [isShowing, message, title, type, isLastMessage, close] =
    useSnackbarStore((state) => [
      state.isShowing,
      state.message,
      state.title,
      state.type,
      state.isLastMessage,
      state.close,
    ]);
  useEffect(() => {
    const interval = setInterval(close, isLastMessage ? 15000 : 10000);
    return () => clearInterval(interval);
  }, [isLastMessage, close]);

  const SNACKBAR_ICON = (type: SnackbarTypes) => {
    switch (type) {
      case SnackbarTypes.error:
        return <XCircle color="red" size={20} />;
      case SnackbarTypes.success:
        return <CheckCircle2 className="text-primary-500" size={20} />;
      case SnackbarTypes.info:
        return <AlertCircle color="blue" size={20} />;
      case SnackbarTypes.warning:
        return <AlertTriangle color="yellow" size={20} />;
      default:
        return <AlertCircle color="blue" size={20} />;
    }
  };
  const COLOR = (type: SnackbarTypes) => {
    switch (type) {
      case SnackbarTypes.error:
        return 'red';
      case SnackbarTypes.success:
        return 'lightgreen';
      case SnackbarTypes.info:
        return 'blue';
      case SnackbarTypes.warning:
        return 'yellow';
      default:
        return 'blue';
    }
  };

  const SNACKBAR_COLOR = (type: SnackbarTypes) => {
    switch (type) {
      case SnackbarTypes.error:
        return 'bg-red-50 border border-red-200 text-sm text-red-600';
      case SnackbarTypes.success:
        return 'bg-green-50 border border-mainGreen text-sm text-mainGreen';
      case SnackbarTypes.info:
        return 'bg-blue-50 border border-blue-200 text-sm text-blue-600';
      case SnackbarTypes.warning:
        return 'bg-yellow-50 border border-yellow-200 text-sm text-yellow-600';
      default:
        return 'bg-blue-50 border border-blue-200 text-sm text-blue-600';
    }
  };

  const ICON = SNACKBAR_ICON(type);
  const snackClass = SNACKBAR_COLOR(type);
  const buttonColor = COLOR(type);
  return (
    <div
      className={classNames(
        BASE_CLASSES,
        isShowing ? 'top-5' : '-top-[400px]',
        snackClass
      )}
    >
      <div className="flex w-full">
        <div className="shrink-0">{ICON}</div>
        <div className="-mt-1 ml-3">
          <div className="text-base font-semibold">{title}</div>

          <div>{message}</div>
        </div>
        <div className="ml-3">
          <div className="-mt-1">
            <button
              type="button"
              onClick={close}
              className="inline-flex cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              data-hs-remove-element="#dismiss-alert"
            >
              <X color={buttonColor} size={16} className="mt-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
