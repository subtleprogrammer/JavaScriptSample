
/**
 * Dummy data to demonstrate logic done in the application.
 *
 * In real JS applications, JSON is the best way to handle data.
 *
 * The data source group is an array which holds data sources.
 * At present there is only one data source in the group array.
 *
 */


JSSample.testDataSourceGroup = [{

    dataSourceId: 'testData1', //
    tables:{

        //users table
        users : [{
            userId: 'uid1',
            userRoleCode: 'PLR'
        },{
            userId: 'uid2',
            userRoleCode: 'PLR'
        },{
            userId: 'uid3',
            userRoleCode: 'DLR'
        }],

        //player profiles table
        playerProfiles :[{
            userId: 'uid1',
            isPremium: true,
            fullName: 'Name1',
            email: '',
            playerRank: '1',
            favoriteGames: ['gid1', 'gid5']
        },{
            userId: 'uid2',
            isPremium: false,
            fullName: 'Name2',
            email: '',
            playerRank: '2',
            favoriteGames: ['gid2', 'gid1']
        },{
            userId: 'uid3',
            isPremium: false,
            fullName: 'Name3',
            email: '',
            playerRank: '3',
            favoriteGames: ['gid3', 'gid4']
        }],

        // developer table
        developer: [],


        // player profiles table
        rewards: [{
            userId: 'uid1',
            currentRewardPoints: 1300,
            redeemedPoints: 500,
            totalPoints: 1800
        },{
            userId: 'uid2',
            currentRewardPoints: 3300,
            redeemedPoints: 1000,
            totalPoints: 4300
        },{
            userId: 'uid3',
            currentRewardPoints: 1500,
            redeemedPoints: 1000,
            totalPoints: 2500
        }],

        // games table
        games: [{
            gameId: 'gid1',
            developer: 'uid1',
            gameRank: 1,
            totalReviews: 1234
        },{
            gameId: 'gid2',
            developer: 'uid1',
            gameRank: 2,
            totalReviews: 187
        },{
            gameId: 'gid3',
            developer: 'uid1',
            gameRank: 3,
            totalReviews: 164
        },{
            gameId: 'gid4',
            developer: 'uid1',
            gameRank: 4,
            totalReviews: 144
        },{
            gameId: 'gid5',
            developer: 'uid1',
            gameRank: 5,
            totalReviews: 190
        }]
    }

}];
