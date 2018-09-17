import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import routes from './routes';
import configureStore from './configureStore';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <div style={{ height: '100%' }}>
      { routes }
      <ReduxToastr timeout={3000} preventDuplicates={true} />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
