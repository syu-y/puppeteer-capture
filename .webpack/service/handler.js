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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"captureFunction\", function() { return captureFunction; });\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst getCapture = async url => {\n  // ブラウザの起動\n  let browser = null;\n\n  try {\n    browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"puppeteer\"].launch({\n      args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"args\"],\n      defaultViewport: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"defaultViewport\"],\n      executablePath: await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"executablePath\"],\n      headless: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__[\"headless\"]\n    }); // ページに移動\n\n    const page = await browser.newPage();\n    await page.goto(url); // キャプチャの取得（フルページ、jpegを指定）\n\n    return await page.screenshot({\n      fullPage: true,\n      type: 'jpeg'\n    });\n  } catch (error) {\n    console.log(error);\n    return null;\n  } finally {\n    if (browser !== null) {\n      await browser.close();\n    }\n  }\n};\n\nconst captureFunction = async event => {\n  const url = event.url || 'https://google.com/'; // キャプチャ取得\n\n  const jpgBuf = await getCapture(url);\n\n  if (!jpgBuf) {\n    return {\n      statusCode: 500,\n      body: 'キャプチャの取得に失敗しました.'\n    };\n  } // ファイルに書き出し\n\n\n  Object(fs__WEBPACK_IMPORTED_MODULE_1__[\"writeFileSync\"])('/tmp/hoge.jpg', jpgBuf);\n  return {\n    statusCode: 200,\n    body: 'キャプチャの取得に成功しました。'\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9oYW5kbGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaGFuZGxlci5qcz9jOGM4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFyZ3MsIGRlZmF1bHRWaWV3cG9ydCwgZXhlY3V0YWJsZVBhdGgsIGhlYWRsZXNzLCBwdXBwZXRlZXIgfSBmcm9tICdjaHJvbWUtYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuXG5jb25zdCBnZXRDYXB0dXJlID0gYXN5bmMgKHVybCkgPT4ge1xuICAvLyDjg5bjg6njgqbjgrbjga7otbfli5VcbiAgbGV0IGJyb3dzZXIgPSBudWxsO1xuICB0cnkge1xuICAgIGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHtcbiAgICAgIGFyZ3MsXG4gICAgICBkZWZhdWx0Vmlld3BvcnQsXG4gICAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgZXhlY3V0YWJsZVBhdGgsXG4gICAgICBoZWFkbGVzcyxcbiAgICB9KTtcblxuICAgIC8vIOODmuODvOOCuOOBq+enu+WLlVxuICAgIGNvbnN0IHBhZ2UgPSBhd2FpdCBicm93c2VyLm5ld1BhZ2UoKTtcbiAgICBhd2FpdCBwYWdlLmdvdG8odXJsKTtcblxuICAgIC8vIOOCreODo+ODl+ODgeODo+OBruWPluW+l++8iOODleODq+ODmuODvOOCuOOAgWpwZWfjgpLmjIflrprvvIlcbiAgICByZXR1cm4gYXdhaXQgcGFnZS5zY3JlZW5zaG90KHsgZnVsbFBhZ2U6IHRydWUsIHR5cGU6ICdqcGVnJyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGJyb3dzZXIgIT09IG51bGwpIHtcbiAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjYXB0dXJlRnVuY3Rpb24gPSBhc3luYyBldmVudCA9PiB7XG4gIGNvbnN0IHVybCA9IGV2ZW50LnVybCB8fCAnaHR0cHM6Ly9nb29nbGUuY29tLyc7XG5cbiAgLy8g44Kt44Oj44OX44OB44Oj5Y+W5b6XXG4gIGNvbnN0IGpwZ0J1ZiA9IGF3YWl0IGdldENhcHR1cmUodXJsKTtcbiAgaWYgKCFqcGdCdWYpIHtcbiAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6ICfjgq3jg6Pjg5fjg4Hjg6Pjga7lj5blvpfjgavlpLHmlZfjgZfjgb7jgZfjgZ8uJyB9O1xuICB9XG5cbiAgLy8g44OV44Kh44Kk44Or44Gr5pu444GN5Ye644GXXG4gIHdyaXRlRmlsZVN5bmMoJy90bXAvaG9nZS5qcGcnLCBqcGdCdWYpO1xuXG4gIHJldHVybiB7IHN0YXR1c0NvZGU6IDIwMCwgYm9keTogJ+OCreODo+ODl+ODgeODo+OBruWPluW+l+OBq+aIkOWKn+OBl+OBvuOBl+OBn+OAgid9O1xuXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./handler.js\n");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chrome-aws-lambda\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb21lLWF3cy1sYW1iZGEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaHJvbWUtYXdzLWxhbWJkYVwiP2M2OGEiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hyb21lLWF3cy1sYW1iZGFcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///chrome-aws-lambda\n");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiP2E0MGQiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///fs\n");

/***/ })

/******/ })));