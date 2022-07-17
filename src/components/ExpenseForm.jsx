import React, { useState, useEffect } from 'react';
import {
	CardContent,
	MenuItem,
	Select,
	Typography,
	FormControl,
	InputLabel,
	Grid,
	TextField,
	Button,
} from '@mui/material';
import { v4 as auuidv4 } from 'uuid';
import { addTransaction } from '../redux/features/Transactions';
import category from '../assets/json/category.json';
import { useDispatch, useSelector } from 'react-redux';
import { useSpeechContext } from '@speechly/react-client';

const initState = {
	type: 'income',
	category: '',
	amount: 1,
	date: new Date(),
};

function ExpenseForm() {
	const dispatch = useDispatch();
	const { segment } = useSpeechContext();
	const balance = useSelector((state) => state.transactions.balance);
	const [expenseData, setExpenseData] = useState(initState);
	const [categoryToRender, setCategoryToRender] = useState(
		category.incomeCategories
	);

	useEffect(() => {
		if (segment) {
			// Handle speech segment and make tentative changes to app state
			if (segment.intent.intent === 'add_income') {
				setExpenseData({ ...expenseData, type: 'income' });
			} else if (segment.intent.intent === 'add_expense') {
				setExpenseData({ ...expenseData, type: 'expense' });
			} else if (
				segment.isFinal &&
				segment.intent.intent === 'create_transaction'
			) {
				createTransaction();
			} else if (
				segment.isFinal &&
				segment.intent.intent === 'cancel_transaction'
			) {
				setExpenseData(initState);
			}

			segment.entities.forEach((entity) => {
				switch (entity.type) {
					case 'amount':
						setExpenseData({ ...expenseData, amount: entity.value });
						break;
					case 'category':
						setExpenseData({
							...expenseData,
							category: `${entity.value.charAt(0)}${entity.value
								.slice(1)
								.toLowerCase()}`,
						});
						break;
					case 'date':
						setExpenseData({ ...expenseData, date: entity.value });
						break;
					case 'type':
						setExpenseData({ ...expenseData, type: entity.value });
						break;
					default:
						break;
				}
			});

			if (
				segment.isFinal &&
				expenseData.amount &&
				expenseData.category &&
				expenseData.date &&
				expenseData.type &&
				Number.isNaN(Number(expenseData.amount))
			) {
				console.log(expenseData);
				// Displaying the confirmation checkmark
				window.postMessage({ type: 'speechhandled', success: true }, '*');
				createTransaction();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [segment]);

	useEffect(() => {
		if (expenseData.type === 'expense') {
			setCategoryToRender(category.expenseCategories);
		} else {
			setCategoryToRender(category.incomeCategories);
		}
	}, [expenseData.type]);

	const onInputChange = (evt) => {
		setExpenseData({ ...expenseData, [evt.target.name]: evt.target.value });
	};

	const createTransaction = () => {
		const refactoredExpenseData = {
			...expenseData,
			amount: parseFloat(expenseData.amount),
			id: auuidv4(),
		};
		dispatch(addTransaction(refactoredExpenseData));
		setExpenseData(initState);
	};

	const onFormSubmit = (evt) => {
		evt.preventDefault();
		createTransaction();
	};

	return (
		<>
			<CardContent>
				<Typography variant='h3' component='h3' mt={4}>
					Expense tracker
				</Typography>
				<Typography variant='h6' component='h4' color='gray'>
					powered by speechly
				</Typography>{' '}
				<br />
				<Typography variant='h5' component='h3' align='center'>
					total balance {balance}$
				</Typography>{' '}
				<br />
				<Typography variant='h6' component='h6' mb={3}>
					try say add income for 100$ category salary for word
				</Typography>
				<Typography variant='h6' component='h6' my={3}></Typography>
				<form onSubmit={onFormSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} my={2}>
							<FormControl fullWidth size='small'>
								<InputLabel id='expense-type-label-id'>Type</InputLabel>
								<Select
									labelId='expense-type-label-id'
									required
									value={expenseData.type}
									label='type'
									name='type'
									onChange={onInputChange}
								>
									<MenuItem value='expense'>expense</MenuItem>
									<MenuItem value='income'>income</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6} my={2}>
							<FormControl fullWidth size='small'>
								<InputLabel id='category-select-id'>Category</InputLabel>
								<Select
									labelId='category-select-id'
									value={expenseData.category}
									label='Category'
									required
									name='category'
									onChange={onInputChange}
								>
									{categoryToRender.map((cty, index) => (
										<MenuItem value={cty.type} key={index}>
											{cty.type}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6} my={2}>
							<TextField
								fullWidth
								size='small'
								type='number'
								required
								label='Amount'
								name='amount'
								value={expenseData.amount}
								onChange={onInputChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} my={2}>
							<TextField
								fullWidth
								size='small'
								type='date'
								required
								label='Date'
								name='date'
								value={expenseData.date}
								onChange={onInputChange}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} mb={4}>
						<Button variant='contained' type='submit' fullWidth>
							Save Expense
						</Button>
					</Grid>
				</form>
			</CardContent>
		</>
	);
}

export default ExpenseForm;
