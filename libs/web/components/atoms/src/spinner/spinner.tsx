import { FC, ReactElement } from "react";

export const Spinner:FC = ():ReactElement => {
    return (
      <div className="flex items-center justify-center w-full h-screen fixed">
        <div className="w-12 h-12 border-t-4 border-b-4 border-primary-900 rounded-full animate-spin"></div>
      </div>
    );
  };