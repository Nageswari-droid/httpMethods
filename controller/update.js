const error = require('../error');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, "..", "data", "user.json");

exports.updateUser = (req, res, next) => {
    const userData = req.body;
    const memberArr = [];

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
                    let updatedArr = [];
                    parsedData.forEach(element => {
                        if (+req.params.id === element.id) {
                            const updatedUser = {
                                uuid: element.uuid_id,
                                id: userData.id || element.id,
                                name: userData.name || element.name,
                                email: userData.email || element.email,
                                age: userData.age || element.age,
                                hobby: userData.hobby || element.hobby
                            }

                            element = updatedUser;
                        }
                        updatedArr.push(element);
                    });
                    fs.writeFile(filePath, JSON.stringify(updatedArr), (err) => {
                        if (err) {
                            return res.json({ msg: 'Error occured.' });
                        }
                        res.json(updatedArr);
                    });
                } else {
                    error.errorHandler(res);
                }
            }
        });


    } else {
        error.errorHandler(res);
    }
};