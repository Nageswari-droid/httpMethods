const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, "..", "data", "user.json");
const error = require('../error');

exports.readAllUsers = (req, res, next) => {
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.json({ msg: 'Error occured' });
            } else if (data.length === 0 || JSON.parse(data) === " ") {
                error.errorHandler(res);
            } else {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            }
        });
    } else {
        error.errorHandler(res);
    }
}
exports.readUser = (req, res, next) => {
    const id = req.params;
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.json({ msg: 'Error occured' });
            } else if (data.length === 0 || JSON.parse(data) === " ") {
                error.errorHandler(res);
            } else {
                const parsedData = JSON.parse(data);

                const found = parsedData.some(userArr => {
                    return +(req.params.id) === userArr.id;
                });
                if (found) {
                    const userDetail = parsedData.filter(userArr => {
                        return +(req.params.id) === userArr.id;
                    });
                    res.json(userDetail);
                } else {
                    res.status(400).json(`No user with the id of ${req.params.id}`);
                }
            }
        });
    } else {
        error.errorHandler(res);
    }
}