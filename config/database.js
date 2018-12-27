module.exports = (mongoose, confid) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(confid.databaseURL, {
        useNewUrlParser: true 
    });

    database.on('error' , error => console.log('Error happened'));
    database.on('connected' , () => console.log('Connected to db'));
    database.on('disconnected', () => console.log('Disconencted'));
    
    process.on('SIGINT', () => {
        database.close(() => {
          process.exit(0);
        })
      });
};