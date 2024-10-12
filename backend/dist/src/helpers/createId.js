"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createId(length = 9) {
    return Math.random().toString(36).replace(/[^0-9a-z]+/g, '').substring(0, length);
}
exports.default = createId;
