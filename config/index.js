const dbUser = process.env.dbUser || 'admin'; // maybe make as enviroment variable
const dbPassword = process.env.dbPassword || 'YLBNEPfpexb3RdY'; // maybe make as enviroment variable

module.exports = {
    databaseURL: `mongodb://${dbUser}:${dbPassword}@ds239029.mlab.com:39029/wwstudents`,
    secret: 'memes', // maybe make as enviroment variable
    session: { session: false },
}