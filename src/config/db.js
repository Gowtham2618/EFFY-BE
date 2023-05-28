const mongoose = require('mongoose');

const dbString = `${process.env.protocol}${process.env.user}:${process.env.password}@${process.env.host}/${process.env.dbName}`;
mongoose.set("debug", true);
mongoose.connect(dbString,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((res) => {
        console.log(`Database Connected Successfully !`);
    }).catch((error) => {
        console.log(`Database Connected Failed !`);
    }); 