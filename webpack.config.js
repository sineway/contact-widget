import {URL} from 'node:url';
import CopyPlugin from 'copy-webpack-plugin';

/**
 * @typedef {import('webpack').Configuration} WebpackConfigInterface
 * @implements {WebpackConfigInterface}
 */
class WebpackConfig {
  constructor() {
    this.entry = this.getEntry();
    this.output = this.getOutput();
    this.devtool = this.getDevtool();
    this.plugins = this.getPlugins();
    this.module = this.getModule();
  }

  getEntry() {
    return './source/main.js';
  }

  getOutput() {
    const filename = 'bundle.js';
    const path = new URL('build', import.meta.url).pathname;
    const clean = true;

    return {filename, path, clean};
  }

  getDevtool() {
    return 'source-map';
  }

  getPlugins() {
    const copyPlugin = this.getCopyPlugin();

    return [copyPlugin];
  }

  getCopyPlugin() {
    const patterns = [{from: 'public'}];

    return new CopyPlugin({patterns});
  }

  getModule() {
    const rules = this.getModuleRules();

    return {rules};
  }

  getModuleRules() {
    const js = this.getJsModuleRule();
    const css = this.getCssModuleRule();

    return [js, css];
  }

  getJsModuleRule() {
    const test = /\.js$/;
    const use = ['babel-loader'];

    return {test, use};
  }

  getCssModuleRule() {
    const test = /\.css$/;
    const use = ['style-loader', 'css-loader'];

    return {test, use};
  }
}

export default new WebpackConfig();
