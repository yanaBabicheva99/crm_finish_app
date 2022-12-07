import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import RoutesPage from './routes';
import { createStore } from './store/store';

import './style/index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();
function App() {
    return (
        <div className="App">
                    <Provider store={store}>
                          <RoutesPage  />
                    </Provider>
            <ToastContainer position="top-center"/>
        </div>
    );
}

export default App;
