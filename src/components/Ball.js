import React, { useEffect, useState } from 'react';

const Ball = ({ ball }) => {
	// Params used to style our ball
	const [ballStyles, setBallStyles] = useState({
		width: `${ball.size}px`,
		height: `${ball.size}px`,
		backgroundColor: `#${ball.color}`,
		borderRadius: `${ball.size / 2}px`,
		position: 'absolute',
		transition: `${ball.time}ms`,
		top: `${ball.posY}px`,
		left: `${ball.posX}px`,
	});

	// Change Y velocity by affecting it with gravity
	const changeVelocity = () => {
		ball.velocity.y += ball.gravity;
	};

	// Check for a limit
	const checkLimits = (limit) => {
		switch (limit) {
			case 'right':
				return ball.posX >= ball.maxX - (ball.size + 10);
			case 'left':
				return ball.posX <= 0;
			case 'top':
				return ball.posY <= 0;
			case 'bottom':
				return ball.posY >= ball.maxY - ball.size;
			default:
				return;
		}
	};

	// Moves the ball in one axis
	const moveInAxis = (axis) => {
		axis === 'x'
			? (ball.posX += ball.velocity.x)
			: (ball.posY += ball.velocity.y);
	};

	// Checks if the ball has hit a limit
	const checkIfWall = (axis) => {
		if (axis === 'x') {
			return checkLimits('left') || checkLimits('right');
		} else {
			return checkLimits('top') || checkLimits('bottom');
		}
	};

	// Inverts direction and reduces ball speed by 10%
	const invertDirection = (axis) => {
		if (axis === 'x') ball.velocity.x = -(ball.velocity.x * 0.9);
		if (axis === 'y') ball.velocity.y = -(ball.velocity.y * 0.9);
	};

	// Updates ball position depending on the axis
	const updateBallInfo = (axis) => {
		axis === 'x'
			? setBallStyles((prevInfo) => ({ ...prevInfo, left: `${ball.posX}px` }))
			: setBallStyles((prevInfo) => ({ ...prevInfo, top: `${ball.posY}px` }));
	};

	// Projectile movement of the ball
	const moveBall = () => {
		// Checks if the ball has hit a wall and, if so, will invert its direction
		if (checkIfWall('x')) invertDirection('x');
		if (checkIfWall('y')) invertDirection('y');

		// Moves the ball in the X axis
		moveInAxis('x');

		// Adjust position of ball inside window width
		if (checkLimits('right')) ball.posX = ball.maxX - ball.size;
		if (checkLimits('left')) ball.posX = -5;

		// Updates position of the ball in the X axis
		updateBallInfo('x');

		// Changes velocity in the Y axis, accounting with gravity
		changeVelocity();

		// Moves the ball in the Y axis
		moveInAxis('y');

		// Adjust position of ball inside window height
		if (checkLimits('bottom')) ball.posY = ball.maxY - ball.size;
		if (checkLimits('top')) ball.posY = 0;

		// Updates position of the ball in the X axis
		updateBallInfo('y');
	};

	// When a ball is created, it will trigger a setInterval which will run the moveBall function each 80ms
	useEffect(() => {
		setInterval(moveBall, ball.time);
	}, []);

	return <span aria-label='span' style={ballStyles}></span>;
};

export default Ball;
