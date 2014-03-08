

/**
 * Application module which is the starting point of the application.
 *
 * There is no inbuilt dependency management mechanism in javascript.
 * For client side modules we can use RequireJS. Server side host environments like nodeJS also provide a commonJS based
 * require() function to import dependencies.
 * The scope here is just core JavaScript, therefor all modules assume that the depended modules are already loaded
 * in the host environment.
 */

JSSample.App = (function(dataSourceManager, rewardsManager){

    "use strict";

    var appReadyStatus = false; //Variable holds the application status.
    var dataAccessManager;
    var rewardsProcessor;

    /**
     * Function that initialises the application.
     */
    function initApp(){

        console.log( "init App started" );

        //Gets references to data access manager and rewards processor.
        dataAccessManager = dataSourceManager.getDataAccessManager();
        rewardsProcessor = rewardsManager.getRewardsProcessor();

        //Sets application status to true if everything looks good.
        if(dataAccessManager.isDataLoadSuccess() && rewardsProcessor.isRewardProcessorReady()){

            appReadyStatus = true;

        }

        console.log( "init App finished with ready status : "+appReadyStatus );

    }

    /**
     * Function to check application ready status.
     *
     * @return{boolean} appReadyStatus - Variable holds the application status.
     */
    function isAppReady(){
        return appReadyStatus;
    }

    return {
        initApp:initApp,
        isAppReady : isAppReady

    };
}(JSSample.DataSourceManager, JSSample.RewardsManager));

