### Abstract classes, private methods and variables, inheritance in JavaScript?

This is a very very very old library i wrote to provide exactly that. Have fun exploring and let me know what you think about it.

```
_class("A", {
        
    prop_1:null,

    _constructor:function (value) {
        // public variables
        this.prop_1 = value;
    },
    private_privateMember:"this is the secret",
    private_privateMethod:function () {
        alert('A.constructor.privateMethod() = i am a private method...');
    },
    getSomething:function () {
        privateMethod();
        return this.prop_1;
    },
    getPrivate:function () {
        alert("I´m inside of the getPrivate() method...");
        privateMethod();
    },
    static_setSomethingStatic:function () {
        alert('static');
    }
});

_class("B extends A", {
    _constructor:function (value, dummy_val) {
        // you can call the constructor of the super class
        this._super(value);
        this.prop_2 = dummy_val;
    },
    setSomething:function (value) {
        this.prop_1 = value;
    }
});

_interface("I", {
    val:null,
    getSomething:function () {
    },
    setSomething:function () {
    }
});

_abstract_class("C implements I", {
    abstract_myproperty:"cool",
    val:"hallo",
    getSomething:function () {
    },
    abstract_getSomethingOther:function () {
    },
    setSomething:function () {
    }
});

_class("D extends C", {
    getPropertyFromAbstract:function () {
        return this.myproperty;
    }
});

_class("X implements I", {
    val:"hallo",
    getSomething:function () {
        alert("getSomething()");
    },
    setSomething:function () {
        alert("setSomething()");
    },
    setSomethingOther:function () {
        alert("setSomethingOther()");
    }
});

// X implements I
var x = new X();

// call required method getSomething() defined in interface I and fully implemented in class X
x.getSomething();

var a = new A("class A");
a.getSomething();
A.setSomethingStatic();

var b = new B("class B", "set dummy value of B"); // B extends A
b.getSomething();

// throws an exception because C is an abstract class which implements the interface I
var c = new C();

// but you can extend the abstract class C
var d = new D();
```
