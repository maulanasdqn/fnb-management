import { FC, ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ToastWrapper:FC = ():ReactElement => {
    return (
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    );
  };