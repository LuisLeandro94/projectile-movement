import React, { useEffect, useState } from 'react';
import Balls from './components/Balls';

function App() {
	const [balls, setBalls] = useState([]);
	const [counter, setCounter] = useState(0);
	const [innerWidth, setInnerWidth] = useState(0);
	const [innerHeight, setInnerHeight] = useState(0);
	const gravity = 9.81; // The acceleration due to gravity on Earth or the value of g on Earth is 9.81 m/s2.
	const minBallSize = 50; // Minimum size of the generated ball
	const maxBallSize = 100; // Maximum size of the generated ball
	const time = 80; // Time in ms between each rerender of the ball

	// Once the app is loaded, it automatically checks the size of the viewport and sets it in our state
	useEffect(() => {
		setInnerHeight(window.innerHeight);
		setInnerWidth(window.innerWidth);
	}, []);

	// Function used to create a new ball
	const createBall = (event) => {
		// Retrieves the coordinates of the mouse click
		let mouseClickX = event.pageX;
		let mouseClickY = event.pageY;

		// Object used to create new balls
		let newBall = {
			id: counter,
			posX: mouseClickX,
			posY: mouseClickY,
			size: Math.floor(
				Math.random() * (maxBallSize - minBallSize + 1) + minBallSize
			),
			velocity: {
				x: -100 + Math.floor(Math.random() * 200),
				y: -100 + Math.floor(Math.random() * 50),
			},
			maxX: innerWidth,
			maxY: innerHeight,
			time: time,
			gravity: gravity,
			color: Math.floor(Math.random() * 16777215).toString(16),
		};

		// Adding our new ball to our array
		setBalls((oldArray) => [...oldArray, newBall]);

		// Counter used to give ids to our balls
		setCounter((oldCounter) => oldCounter + 1);
	};

	return (
		<div className='App' onClick={createBall}>
			<Balls balls={balls} />
		</div>
	);
}

export default App;
