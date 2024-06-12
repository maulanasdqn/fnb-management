import { Icon } from '@iconify/react';
import { FC, ReactElement, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
export type TModal = {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
  header?: boolean;
};

export const Modal: FC<TModal> = (props): ReactElement => {
  useEffect(() => {
    if (props.isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'scroll';
    }

    return () => {
      document.documentElement.style.overflow = 'scroll';
    };
  }, [props?.isOpen]);
  return (
    <div>
      {props?.isOpen &&
        createPortal(
          <motion.section
            initial={{ scale: 0 }}
            animate={{scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="fixed h-screen top-0 left-0 right-0 bottom-0 bg-grey-200/80 bg-blur z-50 flex justify-center items-center"
          >
            <div className="bg-white transition-all duration-300 ease-in-out w-fit shadow h-auto rounded-lg min-w-[28rem]">
              {props.header && (
                <div className="flex justify-between w-full items-center bg-primary p-4 rounded-t-lg">
                  <h1 className="text-white font-semibold text-xl">
                    {props.title}
                  </h1>
                  {props.onClose && (
                    <Icon
                      icon={'ic:baseline-close'}
                      data-testid="close-button"
                      className="cursor-pointer text-white font-semibold"
                      onClick={props.onClose}
                      width={30}
                    />
                  )}
                </div>
              )}

              <div
                style={{
                  width: props.width,
                  height: props.height,
                }}
                className="p-4"
              >
                {!props.header && (
                  <div className="flex justify-end w-full mb-4">
                    <Icon
                      icon={'ic:baseline-close'}
                      data-testid="close-button"
                      className="cursor-pointer text-grey-400"
                      onClick={props.onClose}
                      width={20}
                    />
                  </div>
                )}
                <div>{props.children}</div>
              </div>
            </div>
          </motion.section>,
          document.body
        )}
    </div>
  );
};
