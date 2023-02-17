import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

it('Creates a ball', async () => {
	render(<App />);

	screen.queryByRole('span');
	expect(screen.queryByRole('span')).not.toBeInTheDocument();

	await userEvent.click(screen.getByLabelText('container'));
	screen.getByLabelText('span');

	expect(screen.getByLabelText('span')).toBeInTheDocument();
});
