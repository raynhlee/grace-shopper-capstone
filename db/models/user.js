// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt')

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

async function createUser({username, password, email}){

    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try{
      const {rows: [user]} = await client.query(`
      INSERT INTO users(email, username, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      
      `, [email, username, hashedPassword]);

      delete user.password;
      
      return user;
    } catch (error){
      console.error(error)
    }




}

async function getUserByUsername(userName){
  try {
    const {rows: [user]} = await client.query(`
    SELECT * 
    FROM users
    WHERE username = $1;
    `, [userName]);

    return user;
  } catch (error){
    console.error(error)
  }



}



module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

