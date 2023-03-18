module.exports = {

	randomNumberToString: (max) => {
		return Math.floor(Math.random() * max).toString(36); // remove `0.`
	},
};
