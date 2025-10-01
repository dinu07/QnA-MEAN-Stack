const mongoose = require('mongoose');
const server = require('../app');
const config = require('../config');
const storePopulator = require('../mocks/store-populator');

const connectWithRetry = () => {
    return mongoose.connect(`${config.MONGODB}`, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }

        console.log('Successfully connected to db!!!!!');

        storePopulator();
    });
};

server.listen(config.PORT, () => {
    console.log(`server listening on port ${config.PORT}`);
    connectWithRetry();
});
