import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryProvider } from '@fms/web-services';
import { router } from './routers';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RecoilRoot>
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </RecoilRoot>
  </StrictMode>
);
