

/**
 * Module that defines different types of users and provides facilities to create and manage different
 * user instances.
 *
 */

JSSample.User = (function(constants, dataSourceManager){

    "use strict";


    var countOfCurrentUsers = 0; //variable to hold the total number of current uses in the system.
    var dataAccessManager; // To holds a reference to data access manager.

     // There are various opinions about the use of multi-level inheritance in JavaScript.
     // In my experience, sometimes multi-level inheritance is really needed for abstraction and code reuse.
     // Popular RIA libraries like ExtJS, Dojo etc uses and provides multi-level inheritance.

    /**
     * Creates an instance of User.
     *
     * @constructor
     * @this {User}
     * @param {object} userConfig - Configuration data to initialise a user object.
     */
    function User(userConfig){

        this.userId = userConfig.userId;
        this.userRoleCode = userConfig.userRoleCode;
        this.userActiveStatus = true;

    }

    //Adds common functions need for instances of User type
    User.prototype = {

        getUserRole :function getUserRole(){

            return this.userRoleCode;
        },
        getUserActiveStatus :  function getUserActiveStatus(){

            return this.userActiveStatus;
        },
        setUserActiveStatus : function setUserActiveStatus(newUserActiveStatus){

            this.userActiveStatus = newUserActiveStatus;
        }
    };

    /**
     * Creates an instance of Player.
     *
     * @constructor
     * @this {Player}
     * @param {object} playerConfig - Configuration data to initialise a user object.
     */
    function Player(playerConfig){

        User.call(this, playerConfig);

        this.profile = {};
        this.rewardsDetail = {};

    }

    Player.prototype = Object.create(User.prototype);
    Player.prototype.constructor = Player;

    //Function that loads profile details of a user from data source
    Player.prototype.loadProfile = function(){

        //Good practice is to have separate dao object per type of user. Now time to do that!!

      var  profileData = dataSourceManager.getDataAccessManager().getData(constants.PLAYER_TABLE_NAME, false, constants.PLAYER_TABLE_PRIM_KEY,this.userId);

      if(profileData){
        this.profile = profileData;
      }

    };

    //Function that loads profile details of a user from data source
    Player.prototype.loadRewardDetails = function(){

        var  rewardsDetail = dataSourceManager.getDataAccessManager().getData(constants.REWARDS_TABLE_NAME, false, constants.REWARDS_TABLE_PRIM_KEY,this.userId);

        if(rewardsDetail){
            this.rewardsDetail = rewardsDetail;
        }

    };

    /**
     * Creates an instance of Developer.
     *
     * @constructor
     * @this {Developer}
     * @param {object} developerConfig - Configuration data to initialise a user object.
     */
    function Developer(developerConfig){

        Player.call(this, developerConfig);

        this.ownGames = [];
        this.developerRank = '';
        this.totalReviewsCount = 0;


    }

    Developer.prototype = Object.create(Player.prototype);
    Developer.prototype.constructor = Developer;


    /**
     * Function that creates user objects based on the configuration parameter.
     *
     * @param{object} userConfig - configuration parameter needed to create users.
     * @return{object} User - A new user object.
     *
     */
    function createUserBasedOnRole(userConfig){

        var userRoleCode = userConfig.userRoleCode;

        if(userRoleCode === 'P') {

            countOfCurrentUsers += 1;
            return new Player(userConfig);

        }else if(userRoleCode === 'D'){

            countOfCurrentUsers += 1;
            return new Developer(userConfig);
        }

    }


    /**
     * Function to get the count of current users
     *
     * @return{number} countOfCurrentUsers - the count of current users
     */
    function getCurrentUserCount(){
        return countOfCurrentUsers;
    }

    return {
        createUser:createUserBasedOnRole,
        getCurrentUserCount : getCurrentUserCount
    };
}(JSSample.constants.core, JSSample.DataSourceManager));



