const esprima = require('esprima');
const estraverse = require("estraverse");
const escodegen = require("escodegen");
const { proxyNode, proxy, checkDeclaration } = require('./proxy.js');

/**
 * Main function, transform the source
 * @param {string} source 
 * @return {string}
 */
function transform(source) {
    const ast = esprima.parse(source);
    estraverse.traverse(ast, {
        enter(node) {
            if (node.type === "VariableDeclaration") {
                const declarations = node.declarations;
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
    return escodegen.generate(ast).toString();
}

module.exports = transform;