/**
 * babel-plugin 插件,处理所有导入的${library}宏定义
 * @param {*} babel
 * @returns
 */
module.exports = function (babel) {
  return {
    visitor: {
      ImportDeclaration(path, params) {
        const {
          opts: { rely = "business" },
        } = params;
        const specifiers = path.node.specifiers;
        const { types } = babel;
        const source = path.node.source;
        const libraryName = source.value || "";
        if (libraryName.indexOf("${library}") > -1) {
          const newLibrary = libraryName.replace("${library}", rely);
          const newImport = types.importDeclaration(
            [...specifiers],
            types.stringLiteral(newLibrary)
          );
          path.replaceWith(newImport);
        }
      },
    },
  };
};
