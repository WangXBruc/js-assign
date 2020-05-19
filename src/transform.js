const parser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const { proxyNode, proxy, checkDeclaration } = require('./proxy.js');

/**
 * Main function, transform the source
 * @param {string} source 
 * @return {string}
 */
function transform(source) {
    const ast = parser.parse(source, {
        sourceType: 'module',
        allowImportExportEverywhere: true,
    });
    traverse(ast, {
        enter(path) {
            if (path.type === "VariableDeclaration") {
                const node = path.node || {};
                const declarations = node.declarations || [];
                declarations.forEach(declaration => {
                    let oldInit = declaration.init;
                    const needTransform = checkDeclaration(declaration);
                    if(needTransform) {
                        /**
                         * replace the old init with `proxyNode`
                         *  */ 
                        proxyNode.arguments = [oldInit];
                        declaration.init = proxyNode;
                    }
                })
            }
        }
    });
    return generate(ast, {/* options */}, source).code;
}

module.exports = transform;