


/**
 * A function to demonstrate the application by logging control flow and results of operations in the console.
 */

(function(app, dataSourceManager, rewardsManager, constants){

    "use strict";

    var dataAccessManager;

    app.initApp(); // Initialise the application.


    if(app.isAppReady()){

        var rewardsProcessor = rewardsManager.getRewardsProcessor();

        //Creates a player
        var aPlayer = JSSample.User.createUser({
            userId : 'uid1',
            userRoleCode: 'P'

        });

        console.log('.....................................');

        console.log('Created first player');

        if(aPlayer){

            //Loads profile details of the player
            aPlayer.loadProfile();

            //loads reward points details of the player
            aPlayer.loadRewardDetails();

            console.log(aPlayer);

            console.log('Existing reward details of the player');
            printRewardDetails(aPlayer.rewardsDetail);

            console.log('Redeemeds 300 rewards point');

            //Performs a reward points redemption operation
            rewardsProcessor.redeemRewards(aPlayer, 300, constants.REDEMPTION_MODE_CODE_GAME_CURRENCY);


            console.log('Reward details after redemption');
            printRewardDetails(aPlayer.rewardsDetail);

            console.log('Adds 200 rewards points');

            //Adds some rewards points to player
            rewardsProcessor.addRewards(aPlayer, 200);

            console.log('Reward details after addition');
            printRewardDetails(aPlayer.rewardsDetail);

        }

        console.log('.....................................');

        //Creates a developer
        var aDeveloper = JSSample.User.createUser({
            userId : 'uid3',
            userRoleCode: 'D'

        });

        console.log('Created second player; a developer');

        if(aDeveloper){

            //Loads profile details of the player
            aDeveloper.loadProfile();

            //loads reward points details of the player
            aDeveloper.loadRewardDetails();

            console.log(aDeveloper);

            console.log('Existing reward details of the player');
            printRewardDetails(aDeveloper.rewardsDetail);

            console.log('Redeems 400 rewards point');

            //Performs a reward points redemption operation
            rewardsProcessor.redeemRewards(aDeveloper, 400, constants.REDEMPTION_MODE_CODE_JSSample_PARTNER);


            console.log('Reward details after addition');
            printRewardDetails(aDeveloper.rewardsDetail);

            console.log('Adds 300 rewards points');

            //Adds some rewards points to player
            rewardsProcessor.addRewards(aDeveloper, 300);

            console.log('Reward details after redemption');
            printRewardDetails(aDeveloper.rewardsDetail);

        }

    }

    //just to print show rewardDetails
    function printRewardDetails(rewardDetails){

        var rewardDetail;

        for(rewardDetail in rewardDetails){
            if(rewardDetail !== 'userId'){
                console.log(' -->'+rewardDetail +' '+rewardDetails[rewardDetail]);
            }
        }
    }

}(JSSample.App, JSSample.DataSourceManager, JSSample.RewardsManager, JSSample.constants.core));
