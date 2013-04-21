
bm:
	@NODE_ENV=test DEBUG=carcass:* node ./benchmark/*.js

test:
	@NODE_ENV=test DEBUG=carcass:* ./node_modules/.bin/mocha ./test/*.mocha.js

.PHONY: test bm
