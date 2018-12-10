'use strict';

const InstanceComposer = function(configStrategy) {
  this.configStrategy = configStrategy || {};
  this.instanceMap = {};
  this.shadowedClassMap = {};
};

//Some static properties & methods.
const composerMap = {};
const instanceComposerMethodName = 'ic';
const shadowMap = {};

InstanceComposer.register = function(
  ClassConstructor,
  getterMethodName,
  mustRetainInstance
) {
  if ( InstanceComposer.prototype[getterMethodName] ) {
    console.trace('Duplicate Getter Method name', getterMethodName);
    throw 'Duplicate Getter Method Name ';
  }

  composerMap[getterMethodName] = ClassConstructor;
  InstanceComposer.prototype[getterMethodName] = function() {
    const oThis = this; //this refers to instance of InstanceComposer.
    let _instance;
    if (mustRetainInstance) {
      _instance = oThis.instanceMap[getterMethodName];
      if (!_instance) {
        _instance = new ClassConstructor(oThis.configStrategy, oThis);
        oThis.instanceMap[getterMethodName] = _instance;
      }
      _instance[instanceComposerMethodName] = function() {
        return oThis;
      };
    } else {
      _instance = new ClassConstructor(oThis.configStrategy, oThis);
      _instance[instanceComposerMethodName] = function() {
        return oThis;
      };
    }

    return _instance;
  };
};

InstanceComposer.registerShadowableClass = function(ClassConstructor, classGetterName) {
  if (composerMap.hasOwnProperty(classGetterName) || shadowMap.hasOwnProperty(classGetterName)) {
    console.trace('Duplicate Getter Method name', classGetterName);
    throw 'Duplicate Getter Method Name.';
  }

  shadowMap[classGetterName] = ClassConstructor;
  InstanceComposer.prototype[classGetterName] = function() {
    const oThis = this; //this refers to instance of InstanceComposer.
    let _shadowedClass;
    _shadowedClass = oThis.shadowedClassMap[classGetterName];
    if (!_shadowedClass) {
      oThis.shadowedClassMap[classGetterName] = _shadowedClass = oThis.createShadowClass(ClassConstructor);
    }
    return _shadowedClass;
  };
};

InstanceComposer.prototype = {
  configStrategy: null,
  instanceMap: null,
  shadowedClassMap: null,
  createShadowClass: function(ClassConstructor) {
    const oThis = this; //this refers to instance of InstanceComposer.

    class DerivedClass extends ClassConstructor {
      constructor(...args) {
        super(...args);
      }

      [instanceComposerMethodName]() {
        return oThis;
      }
    }

    //Aesthetics. 
    DerivedClass.name = ClassConstructor.name;

    return DerivedClass;
  }
};

module.exports = InstanceComposer;
