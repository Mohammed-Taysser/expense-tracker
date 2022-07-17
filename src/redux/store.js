import { configureStore } from '@reduxjs/toolkit';
import TransactionReducer from './features/Transactions';

export default configureStore({
	reducer: {
		transactions: TransactionReducer,
	},
});
