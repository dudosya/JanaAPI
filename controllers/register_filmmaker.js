const handleRegisterFilmmaker = (req, res, db) => {
  const { 
        id,
        location,
        phone,
        insta,
        youtube,
        description,
        first_choice,
        second_choice,
        third_choice } = req.body;
   
        db.insert({
            id:id,
            location:location,
            phone:phone,
            insta:insta,
            youtube:youtube,
            description:description,
            first_choice:first_choice,
            second_choice:second_choice,
            third_choice:third_choice
           })
            .into('filmmakers')
            .then(user=>{
              res.json(user);
            })
            .catch(err => res.status(400).json('unable to register'))
        
   
   }



       

module.exports = {
  handleRegisterFilmmaker: handleRegisterFilmmaker
};