"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAll = exports.loadControllers = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("path");
const debug = require('debug')('app:load-controllers');
function loadControllers(app, controllersPath) {
    const controllersBase = path_2.resolve(controllersPath);
    const controllers = requireAll(controllersBase, ['.js']);
    Object.keys(controllers).forEach((file) => {
        var module = controllers[file];
        if (typeof module.controller === 'function') {
            module.controller(app);
            debug(`Loading controller from file: ${file}`);
        }
        else {
            debug(`Ignored ${file} as no controller function was exported`);
        }
    });
}
exports.loadControllers = loadControllers;
function requireAll(base, extensions) {
    return walk(base).reduce((map, file) => {
        if (!extensions.some((ext) => file.substr(file.length - ext.length) === ext) ||
            file.indexOf('/_') > -1 ||
            file.indexOf('/.git/') > -1 ||
            file.indexOf('/.svn/') > -1 ||
            file.indexOf('.spec.js') > -1) {
            return map;
        }
        const basename = file.substr(0, file.length - 3);
        const module = require(path_1.join(base, file));
        map[basename] = module;
        return map;
    }, {});
}
exports.requireAll = requireAll;
function walk(dir, base) {
    const currentBase = base ? base + '/' : '';
    let results = [];
    const list = fs_1.readdirSync(dir);
    list.forEach((file) => {
        const stat = fs_1.statSync(path_1.join(dir, '/', file));
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(path_1.join(dir, '/', file), path_1.join(currentBase, file)));
        }
        else {
            results.push(path_1.join(currentBase, file));
        }
    });
    return results;
}
//# sourceMappingURL=load-controllers.js.map