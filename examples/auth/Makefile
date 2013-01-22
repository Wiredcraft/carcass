test:
	@NODE_ENV=test DEBUG=carcass:*,carcass-auth:* ./node_modules/.bin/mocha ./test/*.mocha.js

start:
	@NODE_ENV=development DEBUG=carcass:*,carcass-auth:* node .

install:
	@NODE_ENV=development DEBUG=carcass:*,carcass-auth:* node install

.PHONY: test start install
