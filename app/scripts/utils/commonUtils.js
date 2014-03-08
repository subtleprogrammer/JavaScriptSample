

JSSample.utils = {};

/**
 * Module that contains the common utility functions.
 */
JSSample.utils.commonUtils = (function(){

    "use strict";


    return {

        /**
         * Function that finds the index of any object in an array of objects.
         * Identification of index is is based on the key and values passed in to the function.
         *
         * TODO: Document example usage of this utility function.
         *
         * @param{object} objectSourceArray - An array of objects on which the find operation needs to be performed.
         * @param{string} primaryKeyProperty - Name of the primary key property of objects in the array.
         * @param{string} propertyValue -  Value of the primary key property based on which find operation needs to be performed.
         */
        findIndexByObjectKey: function(objectSourceArray, primaryKeyProperty, propertyValue){

            var objectCount;
            var objectIterator;
            var objectIndex = -1;

            if(Array.isArray(objectSourceArray) && primaryKeyProperty && propertyValue){

                objectCount = objectSourceArray.length;
                objectIterator = 0;

                while(objectIterator < objectCount){

                    if(objectSourceArray[objectIterator][primaryKeyProperty] === propertyValue){

                        objectIndex = objectIterator;
                        break;
                    }

                    objectIterator++

                }
            }

            return objectIndex;

        },

        /**
         * Function that creates a new object which contains the own properties of the a give source object.
         *
         * This function accepts a function as second parameter which can change property values of result object.
         * The purpose of this parameter function is to do any needed custom processing of property values.
         * The following three parameters will be passed in to the 'propertyProcessorFn'.
         *     - 1. The sourceObject
         *     - 2. property under consideration
         *     - 3. The propertyProcessorFnParam
         *
         * TODO: Document example usage of this utility function.
         *
         * @param{object} sourceObject - The source object from which own properties needs to be copied.
         * @param{function} propertyProcessorFn - Function to process/change property values.
         * @param{*} propertyProcessorFnParam -  Any additional parameter which is needed by the propertyProcessorFn.
         */
        copyOwnProperties: function(sourceObject, propertyProcessorFn, propertyProcessorFnParam){


            var resultObject = {}; //Object that will be returned by this function.
            var propertyProcessorFnParam = propertyProcessorFnParam || {};
            var objProperty;

            //If a valid 'propertyProcessorFn' is provided, then call it to process each property values.
            if(typeof propertyProcessorFn === 'function'){



                for (objProperty in sourceObject) {

                    if (sourceObject.hasOwnProperty(objProperty)){

                       //Calls the property processor
                       resultObject[objProperty] = propertyProcessorFn(sourceObject, objProperty, propertyProcessorFnParam);

                    }
                }

            }else{

                //No valid 'propertyProcessorFn'. Simply creates a copy.
                for ( objProperty in sourceObject) {

                    if (sourceObject.hasOwnProperty(objProperty)){

                       resultObject[objProperty] = sourceObject[objProperty];

                    }
                }
            }

            return resultObject;

        }
    };
}());

