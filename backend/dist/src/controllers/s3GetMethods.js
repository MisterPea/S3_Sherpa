"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuckets = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Clients_1 = require("./s3Clients");
function getBuckets() {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = (0, s3Clients_1.newClient)('us-east-1');
        const bucketList = yield s3.send(new client_s3_1.ListBucketsCommand({}));
        console.log(bucketList);
    });
}
exports.getBuckets = getBuckets;
