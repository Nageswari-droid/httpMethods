const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const filePath = path.join(__dirname, "..", "data", "user.json");

exports.addUser = (req, res, next) => {
    const userData = req.body;
    const memberArr = [];
    const newUser = {
        uuid_id: uuid.v4(),
        id: userData.id,
        name: userData.name,
        email: userData.email,
        age: userData.age,
        hobby: userData.hobby
    };

    if (fs.existsSync(filePath)) {


        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.json({ msg: 'Error occured' });
            } else if (data.length === 0 || JSON.parse(data) === " ") {
                writeHandler(memberArr, newUser, res);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.forEach(element => {
                    memberArr.push(element);
                });
                writeHandler(memberArr, newUser, res);
            }
        });


    } else {
        writeHandler(memberArr, newUser, res);
    }
}

const writeHandler = (memberArr, newUser, res) => {
    memberArr.push(newUser);
    fs.writeFile(filePath, JSON.stringify(memberArr), (err) => {
        if (err) {
            return res.json({ msg: 'Error occured.' });
        }

    });
    res.json(memberArr);
};