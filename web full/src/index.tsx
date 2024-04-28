import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'routes';
import Navbar from 'components/navbar';

import { Toaster } from 'react-hot-toast';
import * as Auth from 'modules/auth';

import 'assets/styles/main.scss';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);

root.render(
  <BrowserRouter>
    <Auth.Container>
      <Navbar />
      <Routes />
      <Toaster />
    </Auth.Container>
  </BrowserRouter>
);
