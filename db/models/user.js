// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt')

async function getAllUsers() {
  try {
    const {rows: allUsers} = await client.query(`
    SELECT
      id,
      username,
      email
    FROM 
      users
    `);

    return allUsers;
  } catch(error){
    console.error(error)
  }
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

async function getUser({username, password}){
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if(isValid){
      delete user.password;
      return user;
    } else {
      throw new Error("Username or password is incorrect");
    }
  } catch (error){
    console.error(error)
  }
}

async function getUserById(userId){
  try {
    const {rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1;
    `, [userId]);

    delete user.password
    return user;
  } catch (error){
    console.error(error)
  }
}



module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
  getUser,
  getUserById
};

