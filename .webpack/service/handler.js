(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! exports provided: captureFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"captureFunction\", function() { return captureFunction; });\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_1__);\n\n // S3の設定\n\naws_sdk__WEBPACK_IMPORTED_MODULE_1__[\"config\"].update({\n  region: process.env.AWS_REGION\n}); // S3のオプション（LOCALで実行した際の設定）\n\nconst s3Options = process.env.LOCAL ? {\n  s3ForcePathStyle: true,\n  accessKeyId: 'S3RVER',\n  secretAccessKey: 'S3RVER',\n  endpoint: new aws_sdk__WEBPACK_IMPORTED_MODULE_1__[\"Endpoint\"]('http://localhost:8081')\n} : {}; // s3のクライアント\n\nconst s3 = new aws_sdk__WEBPACK_IMPORTED_MODULE_1__[\"S3\"](s3Options); // バケット名\n\nconst bucket = process.env.CAPTURE_BUCKET; // アップロード\n\nconst putObject = ({\n  key,\n  body,\n  contentType,\n  acl\n}) => {\n  const params = {\n    Bucket: bucket,\n    Key: key,\n    Body: body,\n    ContentType: contentType,\n    ACL: acl\n  };\n  console.log(params);\n  return s3.putObject(params).promise();\n};\n\nconst getCapture = async url => {\n  // ブラウザの起動\n  let browser = null;\n\n  try {\n    browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"puppeteer\"].launch({\n      args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"args\"],\n      defaultViewport: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"defaultViewport\"],\n      executablePath: await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"executablePath\"],\n      headless: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"headless\"]\n    }); // ページに移動\n\n    const page = await browser.newPage();\n    await page.goto(url); // キャプチャの取得（フルページ、jpegを指定）\n\n    return await page.screenshot({\n      fullPage: true,\n      type: 'jpeg'\n    });\n  } catch (error) {\n    console.log(error);\n    return null;\n  } finally {\n    if (browser !== null) {\n      await browser.close();\n    }\n  }\n};\n\nconst captureFunction = async event => {\n  const url = event.url || 'https://google.com/'; // キャプチャ取得\n\n  const jpgBuf = await getCapture(url);\n\n  if (!jpgBuf) {\n    return {\n      statusCode: 500,\n      body: 'キャプチャの取得に失敗しました.'\n    };\n  } // S3へアップロード\n\n\n  try {\n    await putObject({\n      key: 'hoge.jpg',\n      body: jpgBuf,\n      contentType: 'image/jpeg',\n      acl: 'public-read'\n    });\n  } catch (error) {\n    console.log(error);\n    return {\n      statusCode: 500,\n      body: error.message\n    };\n  }\n\n  return {\n    statusCode: 200,\n    body: 'キャプチャの取得に成功しました。'\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9oYW5kbGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaGFuZGxlci5qcz9jOGM4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFyZ3MsIGRlZmF1bHRWaWV3cG9ydCwgZXhlY3V0YWJsZVBhdGgsIGhlYWRsZXNzLCBwdXBwZXRlZXIgfSBmcm9tICdjaHJvbWUtYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBjb25maWcsIFMzLCBFbmRwb2ludCB9IGZyb20gJ2F3cy1zZGsnO1xuXG4vLyBTM+OBruioreWumlxuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KTtcbi8vIFMz44Gu44Kq44OX44K344On44Oz77yITE9DQUzjgaflrp/ooYzjgZfjgZ/pmpvjga7oqK3lrprvvIlcbmNvbnN0IHMzT3B0aW9ucyA9IHByb2Nlc3MuZW52LkxPQ0FMXG4gID8ge1xuICAgICAgczNGb3JjZVBhdGhTdHlsZTogdHJ1ZSxcbiAgICAgIGFjY2Vzc0tleUlkOiAnUzNSVkVSJyxcbiAgICAgIHNlY3JldEFjY2Vzc0tleTogJ1MzUlZFUicsXG4gICAgICBlbmRwb2ludDogbmV3IEVuZHBvaW50KCdodHRwOi8vbG9jYWxob3N0OjgwODEnKSxcbiAgICB9XG4gIDoge307XG4vLyBzM+OBruOCr+ODqeOCpOOCouODs+ODiFxuY29uc3QgczMgPSBuZXcgUzMoczNPcHRpb25zKTtcbi8vIOODkOOCseODg+ODiOWQjVxuY29uc3QgYnVja2V0ID0gcHJvY2Vzcy5lbnYuQ0FQVFVSRV9CVUNLRVQ7XG4vLyDjgqLjg4Pjg5fjg63jg7zjg4lcbmNvbnN0IHB1dE9iamVjdCA9ICh7IGtleSwgYm9keSwgY29udGVudFR5cGUsIGFjbCB9KSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBCdWNrZXQ6IGJ1Y2tldCxcbiAgICBLZXk6IGtleSxcbiAgICBCb2R5OiBib2R5LFxuICAgIENvbnRlbnRUeXBlOiBjb250ZW50VHlwZSxcbiAgICBBQ0w6IGFjbCxcbiAgfTtcbiAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgcmV0dXJuIHMzLnB1dE9iamVjdChwYXJhbXMpLnByb21pc2UoKTtcbn07XG5cbmNvbnN0IGdldENhcHR1cmUgPSBhc3luYyAodXJsKSA9PiB7XG4gIC8vIOODluODqeOCpuOCtuOBrui1t+WLlVxuICBsZXQgYnJvd3NlciA9IG51bGw7XG4gIHRyeSB7XG4gICAgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2goe1xuICAgICAgYXJncyxcbiAgICAgIGRlZmF1bHRWaWV3cG9ydCxcbiAgICAgIGV4ZWN1dGFibGVQYXRoOiBhd2FpdCBleGVjdXRhYmxlUGF0aCxcbiAgICAgIGhlYWRsZXNzLFxuICAgIH0pO1xuXG4gICAgLy8g44Oa44O844K444Gr56e75YuVXG4gICAgY29uc3QgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xuICAgIGF3YWl0IHBhZ2UuZ290byh1cmwpO1xuXG4gICAgLy8g44Kt44Oj44OX44OB44Oj44Gu5Y+W5b6X77yI44OV44Or44Oa44O844K444CBanBlZ+OCkuaMh+Wumu+8iVxuICAgIHJldHVybiBhd2FpdCBwYWdlLnNjcmVlbnNob3QoeyBmdWxsUGFnZTogdHJ1ZSwgdHlwZTogJ2pwZWcnIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoYnJvd3NlciAhPT0gbnVsbCkge1xuICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhcHR1cmVGdW5jdGlvbiA9IGFzeW5jIGV2ZW50ID0+IHtcbiAgY29uc3QgdXJsID0gZXZlbnQudXJsIHx8ICdodHRwczovL2dvb2dsZS5jb20vJztcblxuICAvLyDjgq3jg6Pjg5fjg4Hjg6Plj5blvpdcbiAgY29uc3QganBnQnVmID0gYXdhaXQgZ2V0Q2FwdHVyZSh1cmwpO1xuICBpZiAoIWpwZ0J1Zikge1xuICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IDUwMCwgYm9keTogJ+OCreODo+ODl+ODgeODo+OBruWPluW+l+OBq+WkseaVl+OBl+OBvuOBl+OBny4nIH07XG4gIH1cblxuICAvLyBTM+OBuOOCouODg+ODl+ODreODvOODiVxuICB0cnkge1xuICAgIGF3YWl0IHB1dE9iamVjdCh7XG4gICAgICBrZXk6ICdob2dlLmpwZycsXG4gICAgICBib2R5OiBqcGdCdWYsXG4gICAgICBjb250ZW50VHlwZTogJ2ltYWdlL2pwZWcnLFxuICAgICAgYWNsOiAncHVibGljLXJlYWQnLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IGVycm9yLm1lc3NhZ2UgfTtcbiAgfVxuXG4gIHJldHVybiB7IHN0YXR1c0NvZGU6IDIwMCwgYm9keTogJ+OCreODo+ODl+ODgeODo+OBruWPluW+l+OBq+aIkOWKn+OBl+OBvuOBl+OBn+OAgid9O1xuXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./handler.js\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXNkay5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImF3cy1zZGtcIj81MTQyIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF3cy1zZGtcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///aws-sdk\n");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chrome-aws-lambda\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb21lLWF3cy1sYW1iZGEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaHJvbWUtYXdzLWxhbWJkYVwiP2M2OGEiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hyb21lLWF3cy1sYW1iZGFcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///chrome-aws-lambda\n");

/***/ })

/******/ })));