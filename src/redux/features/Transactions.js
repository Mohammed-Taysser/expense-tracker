import { createSlice } from '@reduxjs/toolkit';

export const TransactionSlice = createSlice({
	name: 'transactions',
	initialState: {
		expense: [],
		balance: 0,
	},
	reducers: {
		initTransaction: (state) => {
			let newState = [];
			const localStorageTransactions = localStorage.getItem('transactions');
			if (localStorageTransactions) {
				JSON.parse(localStorageTransactions);
			}
			state.expense = newState;
			state.balance = calculateBalance(newState);
		},
		addTransaction: (state, action) => {
			const newState = [...state.expense, action.payload];
			state.expense = newState;
			state.balance = calculateBalance(newState);
			localStorage.setItem('transactions', JSON.stringify(newState));
		},
		deleteTransaction: (state, action) => {
			const newState = state.expense.filter(
				(transaction) => transaction.id !== action.payload
			);
			state.expense = newState;
			state.balance = calculateBalance(newState);
			localStorage.setItem('transactions', JSON.stringify(newState));
		},
	},
});

/**
 * calculate transaction total balance
 * @param {Array} arr Transaction Array
 * @returns {Number} calculated Balance
 */
function calculateBalance(arr) {
	return arr.reduce(
		(prev, value) =>
			value.type === 'expense' ? prev - value.amount : prev + value.amount,
		0
	);
}

// Action creators are generated for each case reducer function
export const { initTransaction, addTransaction, deleteTransaction } =
	TransactionSlice.actions;

export default TransactionSlice.reducer;
