module.exports = {

	randomNumberToString: () => {
		return (Math.random() * 100).toString(36); // remove `0.`
	},
};
