const {
  client,
  createProduct,
  createUser
} = require('./');

async function buildTables() {
  try {
    client.connect();
    console.log("Dropping all tables...");
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    // build tables in correct order
    console.log("Starting to build all tables...");
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(255),
      price DECIMAL(8,2) NOT NULL,
      stock INTEGER
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      price DECIMAL(8,2),
      quantity INT
    );

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      "creatorId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      UNIQUE ("creatorId", "productId"),
      description TEXT NOT NULL
    );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("There was an error building tables...");
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Starting to create users...");
    
    const usersToCreate = [
      {
        username: "boringuser1",
        password: "imveryboring",
        email: "boringperson@gmail.com"
      },
      {
        username: "brianmay",
        password: "crazybrian22",
        email: "brianfromqueen@gmail.com"
      },
      {
        username: "eagleeye",
        password: "blackshark92",
        email: "eagleshark@gmail.com"
      },
      {
        username: "northstar",
        password: "northernlights86",
        email: "northpole@gmail.com"
      },
      {
        username: "santaclausfan900",
        password: "mrsclaus4eva",
        email: "stnick@northpole.com"
      }
    ]
    
    const users = await Promise.all(
      usersToCreate.map(createUser)
    );
    console.log("users ", users);

    console.log("Finished creating users!");

    console.log("Starting to create products...");

    const productsToCreate = [
      {
          name: "GYAMAHA 1/2 SIZE CLASSICAL NYLON STRING GUITAR",
          description: "A great instrument for students learning the basics of classical guitar technique. This guitar features a spruce top, meranti back and sides, a nato neck, and a rosewood bridge and fingerboard",
          price: 129.99,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/H75955000001003-00-720x720.jpg"
      },
      {
          name: "Gblueridge contemporary series GBR-343 Acoustic Guitar (Gospel Model)",
          description: "A member of the contemporary series. Mahogany back and sides topped with gorgeous, rich spruce, creating a beautiful, textured tone. Features a breathtaking abalone and pearl Chalice and Cross on the headstock",
          price: 825.00,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/H82505000000000-00-720x720.jpg"
      },
      {
          name: "Gmartin Special 35 Style Bearclaw Engelmann Spruce Top Dreadnought Acoustic Guitar Natural",
          description: "Beautiful top made with hand-selected premium Engelmann Bearclaw spruce, which gets its name from the cross-grain patterns reminiscent of bear scratches found primarily in old growth trees.",
          price: 4431.99,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/L73906000001000-00-720x720.jpg"
      },
      {
          name: "Glag Guitars Tramontane T70ACE Auditorium Cutaway Acoustic-Electric Guitar Satin Natural",
          description: "Solid spruce top both rich and deep in tone that creates an incredible sound quality. Comfortable for beginner.",
          price: 549.99,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/L75758000001000-00-720x720.jpg"
      },
      {
          name: "Galvarez MPA66 Masterworks Parlor Acoustic Guitar Shadow Burst",
          description: "This guitar has a big spirit in a small package. Easy on the eyes and easy to play, with its intricate details and compact body size.",
          price: 729.99,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/L84543000001000-00-720x720.jpg"
      },
      {
          name: "Gfender Player Telecaster Plus Top Maple Fingerboard Limited-Edition Electric Guitar Blue Burst",
          description: "Great for new players, but with a build quality and playability that makes it a great choice for pros. Gloss finished AA flame maple top.",
          price: 879.00,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/L73017000001000-00-720x720.jpg"
      },
      {
          name: "Gubson Gles Gpaul Traditional Pro V Satin Electric Guitar Desert Burst",
          description: "Mahogany body and neck with a carved maple top, weight-relieved body, asymmetrical neck shape that fits like a glove. Creates a warm, organic sound",
          price: 2499.00,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/L69588000003000-00-720x720.jpg"
      },
      {
          name: "Gjackson X Series Dinky DK2XR Limited-Edition Electric Guitar Hot Pink",
          description: "Sonic palette with a three-way pickup blade switch, poplar body with sculpted shredder's cut heel for quick access to the upper frets, bolt on maple neck with satin back finish for smooth playability",
          price: 449.00,
          stock: 100,
          image: "https://media.guitarcenter.com/is/image/MMGS7/L88867000001000-00-600x600.jpg",
      }
  ]

  const products = await Promise.all(
    productsToCreate.map(createProduct)
  );
  console.log("products: ", products);
  
  console.log("Finished Creating Products!");

  console.log("Starting to create orders...");

    const ordersToCreate = [
      {
        userId: 1,
        productId: 1,
        price: 500.00,
        quantity: 3
      },
      {
        userId: 2,
        productId: 8,
        price: 449.99,
        quantity: 2
      },
      {
        userId: 3,
        productId: 4,
        price: 549.99,
        quantity: 1
      },
      {
        userId: 4,
        productId: 3,
        price: 4431.99,
        quantity: 5
      },
      {
        userId: 5,
        productId: 6,
        price: 729.99,
        quantity: 5
      }
    ]

    const orders = await Promise.all(
      ordersToCreate.map(createOrder)
    );

    console.log("Finished creating orders!");

    console.log("Starting to create reviews...");

    const reviewsToCreate = [
      {
        creatorId: 1,
        productId: 1,
        description: "Great quality, plays just how I imagined it would!"
      },
      {
        creatorId: 2,
        productId: 2,
        description: "Bad quality, came in the wrong color, out of tune. Would not buy again!"
      },
      {
        creatorId: 3,
        productId: 3,
        description: "Exceptional!"
      }
    ]

    const reviews = await Promise.all(
      reviewsToCreate.map(createReview)
    );

    console.log("Finished creating reviews!");
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
