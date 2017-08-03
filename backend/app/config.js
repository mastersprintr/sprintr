// Config file
// will contain the configurations throughout sprintr and other constants

module.exports.name = "sprintr";
module.exports.db = {
    user: {
        url: "mongodb://127.0.0.1:27017/users"
    },

    task: {
        url: "mongodb://127.0.0.1:27017/task"
    },

    sprint: {
        url: "mongodb://127.0.0.1:27017/sprint"
    }
};