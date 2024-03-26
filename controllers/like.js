const handleLike = (req, res, db) => {
  const {cid,fid} = req.body;
  
    
      if (cid===''){
        res.status(400).json('please log in')
      }

      else {
        db.select('*')
        .from('likes')
        .where('cid','=',cid)
        .andWhere('fid','=',fid)
        .then(resp=>{
          if(resp.length){

            db.transaction(trx=>{
            trx('likes')
            .where('cid','=',cid)
            .andWhere('fid','=',fid)
            .del()
            .returning('fid')
            .then(f_id=>{
              return(
              trx('likes')
              .count('fid')
              .where('fid','=',Number(f_id[0]))
              )
              .then(countOfLikes=>{
                res.json(Number(countOfLikes[0].count));
                return(
                trx.select('*')
                .from('filmmakers')
                .where('id','=',Number(f_id[0]))
                .update({
                  likes:Number(countOfLikes[0].count)   
                })  
                )   
              })
            })            
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err => res.status(400).json('log in please'))
    })
          }
           else  {
        db.transaction(trx=>{
      trx.insert({
            cid:cid,
            fid:fid
           })     
            .into('likes')
            .returning('fid')
            .then(f_id=>{
              return(
              trx('likes')
              .count('fid')
              .where('fid','=',Number(f_id[0]))
              )
              .then(countOfLikes=>{
                res.json(Number(countOfLikes[0].count));
                return(
                trx.select('*')                
                .from('filmmakers')
                .where('id','=',Number(f_id[0]))
                .update({
                  likes:Number(countOfLikes[0].count)                 
                })                 
                )    
              })
            })            
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err => res.status(400).json('log in please'))
    })}
          
        })



    
    }




     
     
        





            
            
    }

    
        
   





       

module.exports = {
  handleLike: handleLike
};