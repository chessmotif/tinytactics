var p_00 = {
	x: 0,
	y: 0
}

var Point2D = {
	ZERO: p_00,
	plus: addVectors,
	minus: subtractVectors,
	flatAdd: addScalar,
	scale: scalarProduct,
	rotate: pointRotate,
	norm: normalize,
	dist: distance,
	toXY: convertFromPolar
};

// vector a + b
function addVectors(a, b) {
	var p = {
		x: a.x + b.x,
		y: a.y + b.y
	};

	return p;
} 

// vector a - b
function subtractVectors(a, b) {
	var p = {
		x: a.x - b.x,
		y: a.y - b.y
	};

	return p;
} 

function addScalar(a, b) {
	var p = {
		x: a.x + b,
		y: a.y + b
	};
	
	return p;
}

// b(scalar) * a(vector)
function scalarProduct(a, b) {
	var p = {
		x: a.x * b,
		y: a.y * b
	};

	return p;
}

// rotates a according to the given origin point by theta radians
function pointRotate(origin, a, theta) {
	var p = {
		x: (a.x-origin.x) * Math.cos(theta) - (a.y-origin.y) * Math.sin(theta),
		y: (a.x-origin.x) * Math.sin(theta) + (a.y-origin.y) * Math.cos(theta)
	};

	return addVectors(p, origin);
}

// normalize vector a to length b
function normalize(a, b) {
	var d = Math.sqrt(a.x*a.x + a.y*a.y);
	var p = {
		x: a.x/d * b,
		y: a.y/d * b
	};

	return p;
}

function distance(a, b) {
	var p = {
		x: a.x - b.x,
		y: a.y - b.y
	};

	return Math.sqrt(p.x*p.x + p.y*p.y);
}

// converts polar coords (distance and theta) to x, y
function convertFromPolar(d, t) {
	var p = {
		x: Math.cos(t) * d,
		y: Math.sin(t) * d
	};

	return p;
}