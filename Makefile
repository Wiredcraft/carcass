
bm:
	@NODE_ENV=test DEBUG=carcass:* ./node_modules/.bin/mocha --timeout 120s --slow 60s ./benchmark/*.js

test:
	@NODE_ENV=test DEBUG=carcass:* ./node_modules/.bin/mocha ./test/*.mocha.js

.PHONY: test bm
