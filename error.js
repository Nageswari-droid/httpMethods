exports.errorHandler = (res) => {
    res.json({ msg: "No user found!! For adding new user switch to http://localhost:5000/user/adduser" });
};