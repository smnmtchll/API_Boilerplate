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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var prisma_client_1 = require("../generated/prisma-client");
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_validator_1 = require("express-validator");
/* GET all users */
// router.get('/', async (req, res) => {
//     // const allUsers = await prisma.users();
//     const fragment = `
//         fragment UsersWithoutPassword on User {
//             id
//             name
//             email
//         }
//     `;
//     const UsersWithoutPassword = await prisma.users().$fragment(fragment);
//     res.json(UsersWithoutPassword);
// });
/* GET a user */
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userWithoutPasswordFragment, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                userWithoutPasswordFragment = "\n        fragment UserWithoutPassword on User {\n            id\n            name\n            email\n        }\n    ";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_client_1.prisma
                        .user({ id: userId })
                        .$fragment(userWithoutPasswordFragment)];
            case 2:
                user = _a.sent();
                if (!user) {
                    res.sendStatus(404);
                }
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.json(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/* POST a new user */
router.post('/', [
    express_validator_1.check('name')
        .isLength({ min: 4 })
        .withMessage("A minimum of 4 characters is required for the 'name' field.")
        .isAlpha()
        .withMessage('Your name must contain only letters.')
        .trim()
        .escape(),
    express_validator_1.check('email')
        .isEmail()
        .withMessage('You must enter a valid email.'),
    express_validator_1.check('password')
        .isLength({ min: 8 })
        .withMessage('Passwords must be at least 8 characters long.')
        .custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.confirmPassword) {
            // Throw error if passwords do not match
            throw new Error('Passwords do not match');
        }
        else {
            return value;
        }
    })
        .trim()
        .escape(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, hashedPassword, newUser, createdUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 1:
                hashedPassword = _a.sent();
                newUser = {
                    name: req.body.name.toLowerCase(),
                    email: req.body.email,
                    password: hashedPassword,
                };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma_client_1.prisma.createUser(newUser)];
            case 3:
                createdUser = _a.sent();
                res.json(createdUser);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.json(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
