const handleTopFilmmakers = (req, res, db) => {
  const { id } = req.params;
  db('filmmakers')
  .orderBy('likes')
  .join('users','filmmakers.id','=','users.id')
  .select(
    'filmmakers.id',
    'filmmakers.location',
    'filmmakers.phone',
    'filmmakers.insta',
    'filmmakers.youtube',
    'filmmakers.description',
    'filmmakers.first_choice',
    'filmmakers.second_choice',
    'filmmakers.third_choice',
    'filmmakers.likes',
    'users.name'
    )
  
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
  handleTopFilmmakers
}

  

//   location
// phone
// insta
// youtube
// description
// first_choice
// second_choice
// third_choice
// likes

// db.select('*').from('filmmakers').orderBy('likes')