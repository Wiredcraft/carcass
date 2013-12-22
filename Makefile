ENV = NODE_ENV=test DEBUG=carcass:*
MOCHA = ./node_modules/.bin/mocha
TESTS = ./test/*.mocha.js

test:
	$(ENV) $(MOCHA) $(TESTS)

bm:
	$(ENV) DEBUG=carcass:benchmark $(MOCHA) --timeout 120s --slow 60s ./benchmark/*.js

.PHONY: test bm
