
JSSample.constants = {};

/**
 * Module that contains the core constants.
 */

JSSample.constants.core = {

    // Data related constants

    /** @const {string} - Name the table that holds details of player profiles*/
    PLAYER_TABLE_NAME:'playerProfiles',

    /** @const {string} - Primary key of playerProfile table*/
    PLAYER_TABLE_PRIM_KEY:'userId',

    /** @const {string} - Name the table that holds details of reward points*/
    REWARDS_TABLE_NAME : 'rewards',

    /** @const {string} Primary key of rewards table*/
    REWARDS_TABLE_PRIM_KEY : 'userId',


    //Reward related constants

    /** @const {number} - Maximum reward points that a normal player can accumulate.*/
    MAX_PERMITTED_REWARDS_FOR_NORMAL : 10000,

    /** @const {number} - Maximum reward points that a premium player can accumulate.*/
    MAX_PERMITTED_REWARDS_FOR_PREMIUM : 50000,

    /** @const {number} - Minimum reward points that a player can redeem.*/
    MIN_REWARDS_REDEMPTION : 300,

    /** @const {number} Identifier code number for redeeming rewards as in-game currency mode.*/
    REDEMPTION_MODE_CODE_GAME_CURRENCY: 1,

    /** @const {number} Identifier code number for redeeming rewards as gift coupons.*/
    REDEMPTION_MODE_CODE_GIFT_COUPON: 2,

    /** @const {number} Identifier code number for redeeming rewards as services at JSSample partner websites.*/
    REDEMPTION_MODE_CODE_JSSample_PARTNER: 3

};

