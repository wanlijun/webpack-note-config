
class DuplicateHtmlWebpackPlugin {
  static defaultOptions = {
    indexHtmlName: 'index',
    html: [
      {
        name: 'build',
        title: ''
      }
    ],
  };
  constructor(options = {}) {
    this.options = { ...DuplicateHtmlWebpackPlugin.defaultOptions, ...options }
  }
  apply(compiler) {
    const webpack = compiler.webpack;
    compiler.hooks.emit.tapAsync(
      'DuplicateHtmlWebpackPlugin',
      (
        compilation,
        callback
      ) => {
        const htmlAsset = compilation.getAsset(this.options.indexHtmlName + '.html');
        this.options.html.forEach(({name, title}) => {
          const content = htmlAsset.source['_valueAsString']
          const result = content.replace(/<title>[\s\S]*<\/title>/, `<title>${title}</title>`)
          compilation.emitAsset(name+ '.html', new webpack.sources.RawSource(result, false))
        })
        console.log('Hello word', htmlAsset.source)
        callback()
      }
    )
  }
}
module.exports = DuplicateHtmlWebpackPlugin;