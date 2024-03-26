const handleUpdateFilmmaker = (req, res, db) => {
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
   
        db.select('*').from('filmmakers')
        .where('id', '=', id)
        .update({
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
            .then(data=>{
              res.status(200).json("SUCCESS");
            })
            .catch(err => res.status(400).json('unable to register'))   
   }



       

module.exports = {
  handleUpdateFilmmaker: handleUpdateFilmmaker
};