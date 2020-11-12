const handleRegister = (knex, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }

    const hash = bcrypt.hashSync(password); // when user registers, assign const hash to the hashed version of their password, later to be inserted (trasnascted) into the database.

    knex.transaction((trx) => { // create transaction when ahve to do more than 2 things at once. using trx object to do operations, not knex (database)
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
            return trx('users') // returning a second trx transaction
            .returning('*') // return all the colums in the database table
            .insert({ // insert new user from the body (req.body)
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then((user) => {
                res.json(user[0]); // only want to return one user as we are signing up only one user, so selecting the [0] index in the array. there is only one entry in array anyway.
            })
        })
        .then(trx.commit) // have to commit to the database
        .catch(trx.rollback) 
    })
         .catch((err) => res.status(400).json('unable to register'));
}

module.exports ={
    handleRegister: handleRegister

};