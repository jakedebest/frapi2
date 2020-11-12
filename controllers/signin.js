const handleSignIn = (req, res, knex, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    knex.select('email', 'hash').from('login')
    .where('email', '=', email)
        .then ((data) => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // comparing what user entered in the req.body with the hashed password in the login database.
            if (isValid) {
                return knex.select('*').from('users') // selecting all users in db
                .where('email', '=', email) // then only selecting the one where the email equals the one entered
                .then((user) => { 
                    res.json(user[0]) // the returned thing from .where is an array of one index, so to remove the array just specify the index in the array we want.
                })
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch((err) => res.status(400).json('wrong credentials'))


    // if (req.body.email === database.users[0].email && 
    //     req.body.password === database.users[0].password){
    //         res.json(database.users[0])
    //         console.log("success");
    //     } else {
    //         res.status(400).json('error logging in');
    //     }
}

module.exports ={
    handleSignIn: handleSignIn

};