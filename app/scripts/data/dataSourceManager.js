
/**
 * The data source manger module.
 * Creates and supply a single object which loads the data source and provides functions that
 * that can operate on the loaded data source.
 * This is the single entry point to the data source.
 * Entire application should get a reference to this object to get/update data.
 *
 */


JSSample.DataSourceManager = (function (dataSourceGroup, commonUtils) {

    "use strict";

    var dataAccessManagerInstance;  //Variable to hold reference to singleton data access object.
    var currentDataSourceId; // Id of the current data source loaded by the data access manager.
    var currentDataSource;   // A reference to the current data source
    var dataLoadStatus = false; // Holds a boolean value which indicates the data load status.

    /**
     * Function that initialises the data access manager and creates a singleton object which
     * provides functions to operate on the loaded data.
     *
     * @param{object} damConfig - The configuration parameter for initialising data access object.
     * @return{object} - An object which provides functions to operate on the loaded data.
     */
    function initDataAccessManager(damConfig) {

        console.log('Data access manager initialization started');

        damConfig = damConfig || {};

        //If there is no 'dataSourceId' in the config parameter, then sets the default one.
        currentDataSourceId = damConfig.dataSourceId || 'testData1';

        //Gets the index of data source from data source group.
        var dataSourceIndex = commonUtils.findIndexByObjectKey(dataSourceGroup,'dataSourceId', currentDataSourceId );

        //If the requested data source is present in the source group.
        if(dataSourceIndex > -1){

            currentDataSource = dataSourceGroup[dataSourceIndex];
            dataLoadStatus = true;
        }

        console.log( 'Data load status: '+dataLoadStatus);
        console.log('Data access manager initialization finished');

        //Returns the public methods.
        return {

            /**
             * Function to get data from the loaded data source.
             *
             * @param{string} tableName - The name of the table in which requested data resides.
             * @param{boolean} isAllNeeded - If true get all the records in the table.
             * @param{string} primaryKeyProperty - Name of the key based on which the get operation should be performed.
             * @param{string} propertyValue - The of the key field based on which the get operation should be performed.
             * @return{object} The requested data.
             */
            getData: function (tableName, isAllNeeded, primaryKeyProperty, propertyValue ) {

                var resultSet;

                if(tableName ){

                    var table = currentDataSource.tables[tableName];

                    if(isAllNeeded){

                        // If 'isAllNeeded' is true then all records in the table has to be returned as result.
                        resultSet = table;

                    }else if(primaryKeyProperty && propertyValue){

                        var recordIndex = commonUtils.findIndexByObjectKey(table,primaryKeyProperty, propertyValue );

                        if(recordIndex > -1){

                            //Sends only a copy of the object, not the actual object in data source.
                            resultSet = commonUtils.copyOwnProperties(table[recordIndex]);
                        }
                    }

                }

                return resultSet;
            },

            /**
             * Function to update data in the loaded data source.
             *
             * @param{string} tableName - The name of the table in which targeted data resides.
             * @param{string} primaryKeyProperty - Name of the key based on which the update operation should be performed.
             * @param{string} propertyValue - The of the key field based on which the update operation should be performed.
             * @param{string} modifiedData - The new data object to replace the existing one in data source.
             */
            updateData: function(tableName, primaryKeyProperty, propertyValue, modifiedData) {

                if(tableName  && primaryKeyProperty && propertyValue && modifiedData){

                    var table = currentDataSource.tables[tableName];
                    var recordIndex = commonUtils.findIndexByObjectKey(table,primaryKeyProperty, propertyValue );

                    if(recordIndex > -1){

                        //updates the data in table.
                        table[recordIndex] = modifiedData;
                    }
                }
            },

            /**
             * Function which return the id of the current data source loaded.
             *
             * @return{string} currentDataSourceId - Id of the current data source.
             */
            getCurrentDataSourceId: function() {
                return currentDataSourceId;
            },

            /**
             * Function which returns the the flag which indicates whether the data is loaded successfully or not. s
             *
             * @return{boolean} dataLoadStatus - The data load status flag.
             */
            isDataLoadSuccess: function() {
                return dataLoadStatus;
            }
        };

    }

    //Exposes data access manager through a public function.
    return {

        /**
         * Public function which creates and returns a single data access object.
         *
         * @return{object} dataAccessManagerInstance - The data access object which has functions
         * that can operate on the loaded data source.
         */
        getDataAccessManager: function (damConfig) {

            //Creates 'dataAccessManagerInstance' only once.
            if ( !dataAccessManagerInstance ) {
                dataAccessManagerInstance = initDataAccessManager(damConfig);

            }

            return dataAccessManagerInstance;
        }

    };

}(JSSample.testDataSourceGroup, JSSample.utils.commonUtils));