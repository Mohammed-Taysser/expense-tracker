import React, { useEffect } from 'react';
import { Box, Card, Grid } from '@mui/material';
import Item from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import {
	PushToTalkButton,
	BigTranscript,
	IntroPopup,
} from '@speechly/react-ui';
import ExpenseForm from './components/ExpenseForm';
import { initTransaction } from './redux/features/Transactions';
import TransactionList from './components/TransactionList';
import { useDispatch } from 'react-redux';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initTransaction());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<CssBaseline />
			<div className='app-wrapper'>
				<div className='wrapper'>
					<Container>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={12} md={3} className='income-tracker'>
								<Item>
									<ExpenseTracker type='income' />
								</Item>
							</Grid>
							<Grid item xs={12} md={6} className='main-tracker'>
								<Item>
									<Card>
										<ExpenseForm />
										<Box
											sx={{
												width: '100%',
												height: 300,
												overflowY: 'auto',
											}}
										>
											<TransactionList />
										</Box>
									</Card>
								</Item>
							</Grid>
							<Grid item xs={12} md={3} className='expense-tracker'>
								<Item>
									<ExpenseTracker type='expense' />
								</Item>
							</Grid>
						</Grid>
					</Container>
				</div>
			</div>
			<BigTranscript placement='top' />
			<PushToTalkButton placement='bottom' captureKey=' ' />
			<IntroPopup />
		</>
	);
}

export default App;
