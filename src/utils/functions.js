module.exports = {

	randomNumberToString: () => {
		return (Math.random() * 100).toString(36); // remove `0.`
	},
	getCurrentTimeFromStamp : function() {
		let timestamp = Date.now()
		var d = new Date(timestamp);
	
		timeStampCon = d.getFullYear() +'/' +(d.getMonth() +1) + '/'+ d.getDate() + " " + d.getHours() + ':' + d.getMinutes();
		return timeStampCon;
	},
	
};
