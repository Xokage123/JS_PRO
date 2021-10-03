module.exports = {
	transform: {
		"\\.[jt]sx?$": "babel-jest"
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		"\\.(css|scss|less)$": "identity-obj-proxy"
	}
};
