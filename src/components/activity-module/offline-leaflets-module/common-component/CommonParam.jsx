export function basePxFunction() {
	let pxArr = [];
	let basePx = 50;
	for(basePx; basePx <= 600; basePx+=1) {
		pxArr.push(basePx + 'px');
	}
	return pxArr;
}

export function baseTextPxFunction() {
	let pxArr = [];
	let basePx = -10;
	for(basePx; basePx <= 10; basePx+=1) {
		pxArr.push(basePx + 'px');
	}
	return pxArr;
}

export function baseTextSadowBlurPxFunction() {
	let pxArr = [];
	let basePx = 0;
	for(basePx; basePx <= 10; basePx+=1) {
		pxArr.push(basePx + 'px');
	}
	return pxArr;
}

export function baseTextStrokePxArrFunction() {
	let pxArr = [];
	let basePx = 0.1;
	for(basePx; basePx <= 5; basePx+=0.1) {
		basePx = parseFloat(basePx, 2);
		pxArr.push(basePx + 'px');
	}
	return pxArr;
}

