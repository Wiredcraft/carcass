test:
	@NODE_ENV=test DEBUG=carcass:* ./node_modules/.bin/mocha ./test/*.mocha.js

.PHONY: test
