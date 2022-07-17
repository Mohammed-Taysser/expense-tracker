import React from 'react';
import useTransaction from '../hooks/useTransactions';
import { Card, CardContent, Typography } from '@mui/material';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function ExpenseTracker(props) {
	const { type = 'income' } = props;
	const { total, chartData } = useTransaction(type);

	return (
		<Card className={`with-border-${type === 'income' ? 'green' : 'red'}`}>
			<CardContent>
				<Typography variant='h4' component='h1'>
					{type}
				</Typography>
				<Typography variant='h5' align='center' component='h2'>
					{total}{' '}
					<Typography
						variant='h5'
						component='span'
						color={type === 'income' ? 'green' : 'red'}
					>
						$
					</Typography>
				</Typography>
				<Doughnut data={chartData} />
			</CardContent>
		</Card>
	);
}

export default ExpenseTracker;
