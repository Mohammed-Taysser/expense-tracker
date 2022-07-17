import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './__tests__/reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SpeechProvider } from '@speechly/react-client';
import './assets/scss/core.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<SpeechProvider
			language='en-US'
			appId='74d530fe-d28a-40e7-8768-012e3f2af4df'
		>
			<Provider store={store}>
				<App />
			</Provider>
		</SpeechProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
