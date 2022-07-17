import { useSelector } from 'react-redux';
import categoryJson from '../assets/json/category.json';

function useTransaction(type = 'income') {
	const transactions = useSelector((state) => state.transactions.expense);
	const transactionsByType = transactions.filter((cty) => cty.type === type);
	const total = transactionsByType.reduce(
		(prev, value) => prev + value.amount,
		0
	);
	let category =
		type === 'income'
			? categoryJson.incomeCategories
			: categoryJson.expenseCategories;

	transactionsByType.forEach((cty) => {
		const currentCategory = category.find((c) => c.type === cty.category);
		if (currentCategory) {
			currentCategory.amount += cty.amount;
		}
	});

	category = category.filter((cty) => cty.amount > 0);

	const chartData = {
		labels: category.map((cty) => cty.type),
		datasets: [
			{
				data: category.map((cty) => cty.amount),
				backgroundColor: category.map((cty) => cty.color),
				hoverOffset: 4,
			},
		],
	};

	return {
		total,
		chartData,
	};
}

export default useTransaction;
