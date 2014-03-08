
/**
 * The rewards manager module which contains functionality of accumulating and redeeming rewards points.
 * At present there are only two main features in this modules; to add reward points and to redeem reward points.
 *
 */
JSSample.RewardsManager = (function(dataSourceManager,constants,commonUtils){

    "use strict";

    var rewardsManagerInstance; // Variable to hold reference to rewards manager instance.
    var dataAccessManager; // Variable to hold reference to data access manager.
    var rewardsProcessorStatus = false

    function initRewardsProcessor(){

        console.log('Rewards processor initialization started');

        if(dataSourceManager){
            dataAccessManager = dataSourceManager.getDataAccessManager();
        }

        /**
         * Function which process the request to redeem reward point of a user.
         *
         * @param{object} user - The user who has requested to redeem reward points.
         * @param{number} pointsToRedeem - Number of points to redeem.
         * @param{number} redemptionModeCode - Code number to identify the mode of redemption.
         */
        function redeemRewards(user, pointsToRedeem, redemptionModeCode){

            var isRedemptionSuccess = false;

            if(user && pointsToRedeem && redemptionModeCode){

                try{
                    switch(redemptionModeCode){

                        case 1:
                            // convert reward points to in game currency.
                            //if redemption in success, then set success flag

                            isRedemptionSuccess = true;
                            break;
                        case 2:
                            //convert reward points as gift coupons
                            //if redemption in success, then set success flag

                            isRedemptionSuccess = true;
                            break;
                        case 3:
                            // redeem reward points at JSSample partners website
                            //if redemption in success, then set success flag

                            isRedemptionSuccess = true;
                            break;
                        default:
                            // the default
                            break;
                    }
                }catch(exception){

                    //Handle the exception occurred while redeeming rewards points.

                }finally{
                    //Close connections to redemption systems.
                }

                if(isRedemptionSuccess){

                    var existingRewardsDetails = user.rewardsDetail;

                    //Creates an new reward details object after subtracting the redeemed reward points from the existing points.
                    var rewardsDetailsAfterRedemption = commonUtils.copyOwnProperties(existingRewardsDetails, calculateRewardsSubtraction, pointsToRedeem);

                    //Updates the reward points in data source.
                    dataAccessManager.updateData(constants.REWARDS_TABLE_NAME, constants.REWARDS_TABLE_PRIM_KEY, user.userId, rewardsDetailsAfterRedemption);

                    // To refresh rewards details in user object from data source
                    user.loadRewardDetails();

                    console.log("Redemption finished successfully");

                }
            }
        }

        /**
         * TODO add method level comments
         */
        function isRewardProcessorReady(){

            return rewardsProcessorStatus;
        }

        /**
         * Function which adds the newly earned rewards points to user's account.
         *
         * @param{object} user - The user who has eared new reward points.
         * @param{number} pointsAdd - Number of points to add to account.
         */
        function addRewards(user, pointsAdd){

            if(user && pointsAdd){

                var existingRewardsDetails = user.rewardsDetail;

                //Created a new object which contain the reward details after addition of newly gained points.
                var rewardsDetailsAfterAddition = commonUtils.copyOwnProperties(existingRewardsDetails, calculateRewardsAddition, pointsAdd);

                ////Updates the reward points in data source.
                dataAccessManager.updateData(constants.REWARDS_TABLE_NAME, constants.REWARDS_TABLE_PRIM_KEY, user.userId, rewardsDetailsAfterAddition);

                // To refresh rewards details in user object from data source
                user.loadRewardDetails();

                console.log("Reward points addition finished");

            }
        }

        /**
         * Function which calculates new reward details during addition of reward points.
         * This function will be used while executing 'addRewards'.
         *
         * @param{object} existingRewardsDetails - Object which contains existing reward details of a user.
         * @param{string} objProperty - reward details property under consideration.
         * @param{number} pointsAdd - Number of points to add.
         */
        function calculateRewardsAddition(existingRewardsDetails, objProperty, pointsAdd){

            var propertyValueAfterAddition;

            if(existingRewardsDetails && objProperty && pointsAdd){

                if(objProperty === 'currentRewardPoints'){
                    propertyValueAfterAddition = existingRewardsDetails[objProperty] + pointsAdd;
                }else if(objProperty === 'totalPoints'){
                    propertyValueAfterAddition = existingRewardsDetails[objProperty] + pointsAdd;
                }else {
                    propertyValueAfterAddition = existingRewardsDetails[objProperty];
                }
            }

            return propertyValueAfterAddition;

        }

        /**
         * Function which calculates new reward details during addition of reward points.
         * This function will be used while executing 'redeemRewards'.
         *
         * @param{object} existingRewardsDetails - Object which contains existing reward details of a user.
         * @param{string} objProperty - reward details property under consideration.
         * @param{number} pointsToSubtraction - Number of points to subtract.
         */
        function calculateRewardsSubtraction(existingRewardsDetails, objProperty, pointsToSubtraction){

            var propertyValueAfterSubtraction;

            if(existingRewardsDetails && objProperty && pointsToSubtraction){

                if(objProperty === 'currentRewardPoints'){
                    propertyValueAfterSubtraction = existingRewardsDetails[objProperty] - pointsToSubtraction;
                }else if(objProperty === 'redeemedPoints'){
                    propertyValueAfterSubtraction = existingRewardsDetails[objProperty] + pointsToSubtraction;
                }else {
                    propertyValueAfterSubtraction = existingRewardsDetails[objProperty];
                }
            }

            return propertyValueAfterSubtraction;

        }

        //sets the status to true.
        rewardsProcessorStatus = true;

        console.log('Rewards processor initialization finished');

        //Exposes the functions to redeem and add reward points.
        return {
            redeemRewards:redeemRewards,
            addRewards : addRewards,
            isRewardProcessorReady : isRewardProcessorReady
        };

    }

    //Exposes the function to initialise rewards manager.
    return {

        /**
         * Public function which creates and returns a single rewards processor object.
         *
         * @return{object} rewardsManagerInstance - The rewards processor object which has functions
         * that can process rewards points.
         */
        getRewardsProcessor: function () {

            //Creates 'rewardsManagerInstance' only once.
            if ( !rewardsManagerInstance ) {
                rewardsManagerInstance = initRewardsProcessor();

            }

            return rewardsManagerInstance;
        }
    };


}(JSSample.DataSourceManager,JSSample.constants.core, JSSample.utils.commonUtils));
