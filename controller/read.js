const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, "..", "data", "user.json");

exports.readAllUsers = (req, res, next) => {
    const errorHandler = (res) => {
        res.json({ msg: "No user found!! For adding new user switch to http://localhost:5000/user/adduser" });
    };

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.json({ msg: 'Error occured' });
            } else if (data.length === 0) {
                errorHandler(res);
            } else {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            }
        });
    } else {
        errorHandler(res);
    }
}
exports.readUser = (req, res, next) => {
    const id = req.body.params;
    res.json(id);
}