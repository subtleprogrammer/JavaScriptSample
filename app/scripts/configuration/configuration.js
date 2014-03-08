
/**
 * Place to configure environment for the application.
 * This file should be loaded first.
 */


//Sets the root namespace of application.
var JSSample =  JSSample || {};

//Gets a reference to the global of the host environment.
//The global may very from host to host.
var global = global || this;

//To avoid issues if console is not available in the global scope of host environment.
global.console = global.console || {};
global.console.log = global.console.log || function() {};
