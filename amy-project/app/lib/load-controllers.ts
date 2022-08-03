import { Application } from 'express';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { resolve } from 'path';

const debug = require('debug')('app:load-controllers');

export function loadControllers(app: Application, controllersPath: string) {
  const controllersBase = resolve(controllersPath);
  const controllers = requireAll(controllersBase, ['.js']);

  Object.keys(controllers).forEach((file: string) => {
    var module = controllers[file];
    if (typeof module.controller === 'function') {
      module.controller(app);
      debug(`Loading controller from file: ${file}`);
    } else {
      debug(`Ignored ${file} as no controller function was exported`);
    }
  });
}

export function requireAll(base: string, extensions: string[]) {
  return walk(base).reduce((map, file) => {
    if (
      !extensions.some(
        (ext) => file.substr(file.length - ext.length) === ext,
      ) ||
      file.indexOf('/_') > -1 ||
      file.indexOf('/.git/') > -1 ||
      file.indexOf('/.svn/') > -1 ||
      file.indexOf('.spec.js') > -1
    ) {
      return map;
    }

    const basename = file.substr(0, file.length - 3);
    const module = require(join(base, file));
    map[basename] = module;

    return map;
  }, {} as { [path: string]: any });
}

function walk(dir: string, base?: string): string[] {
  const currentBase = base ? base + '/' : '';
  let results: string[] = [];
  const list = readdirSync(dir);

  list.forEach((file: string) => {
    const stat = statSync(join(dir, '/', file));
    if (stat && stat.isDirectory()) {
      results = results.concat(
        walk(join(dir, '/', file), join(currentBase, file)),
      );
    } else {
      results.push(join(currentBase, file));
    }
  });
  return results;
}
