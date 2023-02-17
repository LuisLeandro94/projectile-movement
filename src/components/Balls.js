import React from 'react';
import Ball from './Ball';

function Balls({ balls }) {
	return (
		<>
			{balls.map((ball) => (
				<Ball key={ball.id} ball={ball} />
			))}
		</>
	);
}

export default Balls;
