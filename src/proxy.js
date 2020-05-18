
/**
 * A proxy of object, when we `get` key from the object, we will get `undefined` not `null`.
 * So, the `default value` of `ObjectPattern` will work.
 * @important You must have copy this function to your `Global Utils file`, and name it `GUtils.proxy`
 * @param {object} obj 
 */
const proxy = (obj) => {
    return new Proxy(obj, {
        get(target, key, value) {
            if(target[key] === null) {
                return void 0;
            } else  {
                return target[key];
            }
        }
    })
}

/** 
 * Node ready to replace the `declaration init`
 * */
const proxyNode = {
    "type": "CallExpression",
    "callee": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
            "type": "Identifier",
            "name": "GUtils",
        },
        "property": {
            "type": "Identifier",
            "name": "proxy",
        },
    },
    "arguments": [],
}
/**
 * Check if the `GUtils.proxy()` is already used in the declaration 
 * @param {Declaration.init} declarationInit 
 */
const usingProxy = (declarationInit) => {
    let useProxy = false;
    if(declarationInit.type === 'CallExpression') {
        const callee = declarationInit.callee || {};
        const object = callee.object || {};
        const property = callee.property || {};
        if(object.name === 'GUtils' && object.type === 'Identifier' && property.type === 'Identifier' && property.name === 'proxy') {
            useProxy = true;
        }
    }
    return useProxy;
}
/**
 * Check if the declaration is a ObjectPattern
 * @param Declaration declaration 
 */
const usingObjectPattern = (declaration) => {
    let isObjectPattern = false;
    if(declaration.type === "VariableDeclarator" && declaration.id.type === 'ObjectPattern') {
        isObjectPattern = true;
    }
    return isObjectPattern;
}
/**
 * Check if the declaration needed to be transformed
 * @param {Declaration} declaration 
 */
const checkDeclaration = (declaration) => {
    let oldInit = declaration.init;
    let isObjectPattern = usingObjectPattern(declaration);
    let useProxy = usingProxy(oldInit);
    return isObjectPattern && !useProxy;
}


module.exports = {
    proxy,
    proxyNode,
    checkDeclaration
};