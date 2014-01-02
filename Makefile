ENV = NODE_ENV=test DEBUG=carcass:*
MOCHA = ./node_modules/.bin/mocha
TESTS = ./test/*.mocha.js

test:
	$(ENV) $(MOCHA) $(TESTS)

bm:
	$(ENV) DEBUG=carcass:benchmark $(MOCHA) --timeout 120s --slow 60s ./benchmark/*.js

coverage:
	$(ENV) $(MOCHA) --require blanket --reporter html-cov $(TESTS) > ./test/coverage.html

grunt:
	$(ENV) grunt --force

all: test coverage grunt

.PHONY: test bm coverage grunt all
