const error = require('../error');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, "..", "data", "user.json");

exports.deleteAllUser = (req, res, next) => {
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.json({ msg: 'Error occured' });
            } else if (data.length === 0 || JSON.parse(data) === " ") {
                console.log(data);
                error.errorHandler(res);
            } else {
                fs.writeFile(filePath, JSON.stringify(" "), (err) => {
                    if (err) {
                        return res.json({ msg: 'Error occured.' });
                    }
                    res.json('Deleted successfully!');
                });
            }
        });
    } else {
        error.errorHandler(res);
    }
};

exports.deleteOneUser = (req, res, next) => {
    let userDetail = " ";
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
                    userDetail = parsedData.filter(userArr => {
                        return +(req.params.id) !== userArr.id;
                    });
                    fs.writeFile(filePath, JSON.stringify(userDetail), (err) => {
                        if (err) {
                            return res.json({ msg: 'Error occured.' });
                        }
                        res.json('Deleted successfully!');
                        // res.json(userDetail);
                    });
                } else {
                    return res.status(400).json(`No user with the id of ${req.params.id}`);
                }
            }
        });
    } else {
        error.errorHandler(res);
    }
};