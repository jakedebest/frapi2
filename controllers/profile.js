const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;

    knex.select('*').from('users').where({
        id: id
    })
    .then((user => {
        if (user.length) { // a single array is returned of the user (from the users database) so if there is no user with this id, return error
            res.json(user[0])
        } else {
            res.status(400).json('erreor getting user');
        }
    }))
}

module.exports ={
    handleProfileGet: handleProfileGet

};