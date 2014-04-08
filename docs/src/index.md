---
title: Carcass
template: index.jade
---

## Introduction

Carcass and the Carcass Family are tools built for middle to large Node.js projects. Carcass is not a framework. It doesn't assume you have a certain database or handle a certain type of connection.

Carcass only provides two main features by itself (see the API list for details):

* "Mixable" and "Mixin" help you do code reuse in a more natural JS way.
* "Register" helps you organise your files.

Carcass is all about structuring code. And this is how we structured Carcass itself:

* `Carcass` is a class. However in most cases we only use a single instance which is exported with the module, i.e.`var carcass = require('carcass');`
* Features are organized into files and folders, and mapped to attributes of `carcass` with the help of "register".
    - Classes are at `lib/classes/*` and mapped to `carcass.classes.*`.
    - Helpers are at `lib/helpers/*` and mapped to `carcass.helpers.*`.
    - Protos are at `lib/proto/*` and mapped to `carcass.proto.*`.

### What is "proto" and why we use it

_TODO_
