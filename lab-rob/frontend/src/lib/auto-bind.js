export default function(context, Component, otherMethods = {}) {
  let memberFunctions = Object.getOwnPropertyNames(Component.prototype);
  for(let functionName of memberFunctions) {
    if(functionName.startsWith('handle') || otherMethods[functionName]) {
      context[functionName] = context[functionName].bind(context);
    }
  }
}
