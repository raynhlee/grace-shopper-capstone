const {
  client,
  createProduct,
  createUser,
  createReview,
  createOrder,
} = require("./");

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
      stock INTEGER,
      type VARCHAR(255)
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
        email: "boringperson@gmail.com",
      },
      {
        username: "brianmay",
        password: "crazybrian22",
        email: "brianfromqueen@gmail.com",
      },
      {
        username: "eagleeye",
        password: "blackshark92",
        email: "eagleshark@gmail.com",
      },
      {
        username: "northstar",
        password: "northernlights86",
        email: "northpole@gmail.com",
      },
      {
        username: "santaclausfan900",
        password: "mrsclaus4eva",
        email: "stnick@northpole.com",
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("users ", users);

    console.log("Finished creating users!");

    console.log("Starting to create products...");

    const productsToCreate = [
      {
        name: "GYAMAHA 1/2 SIZE CLASSICAL NYLON STRING GUITAR",
        description:
          "A great instrument for students learning the basics of classical guitar technique. This guitar features a spruce top, meranti back and sides, a nato neck, and a rosewood bridge and fingerboard",
        price: 129.99,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/H75955000001003-00-720x720.jpg",
        type: "acoustic",
      },
      {
        name: "Gblueridge contemporary series GBR-343 Acoustic Guitar (Gospel Model)",
        description:
          "A member of the contemporary series. Mahogany back and sides topped with gorgeous, rich spruce, creating a beautiful, textured tone. Features a breathtaking abalone and pearl Chalice and Cross on the headstock",
        price: 825.0,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/H82505000000000-00-720x720.jpg",
        type: "acoustic",
      },
      {
        name: "Gmartin Special 35 Style Bearclaw Engelmann Spruce Top Dreadnought Acoustic Guitar Natural",
        description:
          "Beautiful top made with hand-selected premium Engelmann Bearclaw spruce, which gets its name from the cross-grain patterns reminiscent of bear scratches found primarily in old growth trees.",
        price: 4431.99,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/L73906000001000-00-720x720.jpg",
        type: "acoustic",
      },
      {
        name: "Glag Guitars Tramontane T70ACE Auditorium Cutaway Acoustic-Electric Guitar Satin Natural",
        description:
          "Solid spruce top both rich and deep in tone that creates an incredible sound quality. Comfortable for beginner.",
        price: 549.99,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/L75758000001000-00-720x720.jpg",
        type: "acoustic",
      },
      {
        name: "Galvarez MPA66 Masterworks Parlor Acoustic Guitar Shadow Burst",
        description:
          "This guitar has a big spirit in a small package. Easy on the eyes and easy to play, with its intricate details and compact body size.",
        price: 729.99,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/L84543000001000-00-720x720.jpg",
        type: "acoustic",
      },
      {
        name: "Gfender Player Telecaster Plus Top Maple Fingerboard Limited-Edition Electric Guitar Blue Burst",
        description:
          "Great for new players, but with a build quality and playability that makes it a great choice for pros. Gloss finished AA flame maple top.",
        price: 879.0,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/L73017000001000-00-720x720.jpg",
        type: "electric",
      },
      {
        name: "Gubson Gles Gpaul Traditional Pro V Satin Electric Guitar Desert Burst",
        description:
          "Mahogany body and neck with a carved maple top, weight-relieved body, asymmetrical neck shape that fits like a glove. Creates a warm, organic sound",
        price: 2499.0,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/L69588000003000-00-720x720.jpg",
        type: "electric",
      },
      {
        name: "Gjackson X Series Dinky DK2XR Limited-Edition Electric Guitar Hot Pink",
        description:
          "Sonic palette with a three-way pickup blade switch, poplar body with sculpted shredder's cut heel for quick access to the upper frets, bolt on maple neck with satin back finish for smooth playability",
        price: 449.0,
        stock: 100,
        image:
          "https://media.guitarcenter.com/is/image/MMGS7/L88867000001000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "Squier Bullet Telecaster Limited-Edition Electric Guitar Surf Green",
        description: "This limited-edition Squier Bullet Telecaster pays tribute to the guitar that launched the electric revolution: the Fender Telecaster. Guitar Center recommends this Bullet model for new players who want the layout of the '50s classic, designed by Fender at an entry-level price. The body shape is iconic. The 21-fret fingerboard and dual pickups are faithful to the original configuration. The limited-edition finish is retro all the way. This guitar has hardly changed since the '50s, and thanks to Squier, it's now accessible to all.",
        price: 199.99,
        stock: 100,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L20490000001000-04-600x600.jpg",
        type: "electric",
      },
      {
        name: "Epiphone Les Paul Traditional Pro IV Limited-Edition Electric Guitar Worn Wine Red",
        description: "The Epiphone Les Paul Trad Pro IV offers fans the most popular Epiphone electric guitar ever made in four vintage worn finishes. Equipped with powerful Alnico Classic Pro humbuckers, the Les Paul Trad Pro delivers the warm tone of traditional rock, along with the nostalgic look, for a fully immersive playing experience. For additional sonic sculpting, this Les Paul also features a treble bleed circuit to keep the treble present even when volume is lowered and push/pull volume controls for coil splitting. Inspired by the original legendary guitar, this limited-edition Les Paul Trad Pro IV electric guitar is a stylish addition to any player's collection.",
        price: 549.99,
        stock: 50,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L79036000003000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "Schecter Guitar Research C-1 Platinum Electric Guitar Emerald Burst",
        description: "The Schecter C-1 Platinum electric guitar takes everything guitar players love about the popular C-1 and adds platinum fingerboard inlays, fretboard and body binding and satin chrome hardware. This C-1 also boasts a double-cutaway mahogany body with a gorgeous figured maple top, 25.5\" scale set maple neck and a 24-fret rosewood fingerboard. A Schecter Ultra Access neck joint lets you reach the entire fretboard with ease and comfort. It's loaded with a pair of EMG Active 81/85 pickups for an incredible range of tones.",
        price: 749.00,
        stock: 10,
        image: "https://media.guitarcenter.com/is/image/MMGS7/H96103000004000-04-600x600.jpg",
        type: "electric",
      },
      {
        name: "Gibson Les Paul Studio Electric Guitar Ebony",
        description: "The Les Paul Studio embodies the essential Les Paul features with enhancements for playability and tonal versatility. The rosewood fingerboard and Slim Taper mahogany neck provide effortless playability and comfort. The 490R and 498T pickups provide tight, high-output humbucking performance and the two push-pull pots offer additional coil-tapping options.",
        price: 1699.00,
        stock: 25,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L54490000004000-00-720x720.jpg",
        type: "electric",
      },
      {
        name: "B.C. Rich Stranger Things \"Eddie's\" Inspired Limited-Edition NJ Warlock Electric Guitar Black",
        description: "The B.C. Rich Stranger Things Eddie's Inspired Limited-Edition NJ Warlock is a striking replica of the guitar featured in season four of the Netflix hit series, Stranger Things. As the award-winning sci-fi-horror-ensemble drama takes place in the 1980s, this angular, shred-approved NJ Warlock is the perfect “guest star” to represent the aggressive rock and metal riffs favored by the teens in the fictional town of Hawkins, Indiana. But the Stranger Things NJ Warlock is far more than set dressing for a television series. Armed with two B.C. Rich BDSM Distortion humbuckers, this mean machine is designed to bust through a band mix, recording date or jam session with tones that go from belligerently beautiful to full-on raging. The Floyd Rose Special locking tremolo is perfect for launching screaming dive bombs, bewitching warbles and trance-like trills. When you need to unleash a relentless barrage of ferocious licks powerful enough to seal up an inter-dimensional gateway, the NJ Warlock\'s Shredzilla Ultra Slim Contour neck provides a smooth and unencumbered runway for your swift fingers. The Stranger Things Eddie's 80s attitude, but it also possesses the ergonomics and tonal firepower to create supernatural textures for any style of hard-hitting music.",
        price: 899.99,
        stock: 400,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L93296000001000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "B.C. Rich Stranger Things \"Eddie's\" Limited-Edition Replica and Inspired USA Custom Shop Warlock Electric Guitar Red Crackle",
        description: "The B.C. Rich Stranger Things Eddie's Inspired Limited-Edition NJ Warlock is a striking replica of the guitar featured in season four of the Netflix hit series, Stranger Things. As the award-winning sci-fi-horror-ensemble drama takes place in the 1980s, this angular, shred-approved NJ Warlock is the perfect “guest star” to represent the aggressive rock and metal riffs favored by the teens in the fictional town of Hawkins, Indiana. But the Stranger Things NJ Warlock is far more than set dressing for a television series. Armed with two B.C. Rich BDSM Distortion humbuckers, this mean machine is designed to bust through a band mix, recording date or jam session with tones that go from belligerently beautiful to full-on raging. The Floyd Rose Special locking tremolo is perfect for launching screaming dive bombs, bewitching warbles and trance-like trills. When you need to unleash a relentless barrage of ferocious licks powerful enough to seal up an inter-dimensional gateway, the NJ Warlock\'s Shredzilla Ultra Slim Contour neck provides a smooth and unencumbered runway for your swift fingers. The Stranger Things Eddie's 80s attitude, but it also possesses the ergonomics and tonal firepower to create supernatural textures for any style of hard-hitting music.",
        price: 4699.99,
        stock: 200,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L93298000002000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "Jackson USA RR1 Randy Rhoads Select Series Electric Guitar Black",
        description: "Jackson's compound-radius fingerboard curves more dramatically at the nut for easy chording and flattens out as it approaches the neck joint for low-action bends without fretting out. With a more relaxed hand, you'll play better.",
        price: 4499.99,
        stock: 100,
        image: "https://media.guitarcenter.com/is/image/MMGS7/511450000001000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "strandberg Boden Prog NX 7 Electric Guitar Twilight Purple",
        description: "Very similar to the groundbreaking Boden Original, the .strandberg* Prog NX 7 electric guitar is essentially a tremolo version with a Richlite fretboard for a slicker feel and a slightly more cutting tone. Exceptionally light in weight and scientifically engineered for comfort and to reduce arm tension, the Prog NX features a chambered swamp ash body with a solid maple top, maple neck and Richlite fretboard for great acoustic resonance with more bite in the highs.",
        price: 1996.00,
        stock: 100,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L89223000001000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "Alvarez MPA66 Masterworks Parlor Acoustic Guitar Shadow Burst",
        description: "Easy on the eyes with intricate details and easy to play with its comfortable action and compact body size, your Masterworks Parlor Guitar will quickly become the centerpiece to making music together at home or on the road.",
        price: 729.99,
        stock: 100,
        image: "https://media.guitarcenter.com/is/image/MMGS7/J09281000001000-00-600x600.jpg",
        type: "acoustic",
      },
      {
        name: "Gibson Les Paul Standard '50s Electric Guitar Gold Top",
        description: "The Gibson Les Paul Standard '50s Electric Guitar features a stunning Gold Top finish and delivers the timeless sound and feel of a classic Les Paul. With its rich tones and iconic design, this guitar is a true masterpiece.",
        price: 2299.99,
        stock: 20,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L20582000001000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "Yamaha FG800 Acoustic Guitar Natural",
        description: "The Yamaha FG800 Acoustic Guitar offers exceptional sound quality and playability at an affordable price. With its natural finish and solid spruce top, this guitar delivers rich tones and excellent resonance.",
        price: 199.99,
        stock: 40,
        image: "https://media.guitarcenter.com/is/image/MMGS7/J03548000001000-00-600x600.jpg",
        type: "acoustic",
      },
      {
        name: "Epiphone Les Paul Standard PlusTop Pro Electric Guitar Translucent Blue",
        description: "The Epiphone Les Paul Standard PlusTop Pro Electric Guitar offers the classic Les Paul design with a stunning Translucent Blue finish. With its versatile sound and comfortable playability, this guitar is suitable for various musical genres.",
        price: 599.99,
        stock: 25,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L18278000002000-00-600x600.jpg",
        type: "electric",
      },
      {
        name: "Dunlop Max Grip Jazz III Carbon Fiber Guitar Picks - 6 Pack",
        description: "This 6-piece set of Max Grip Jazz III guitar picks combines Dunlop's Classic Jazz III shape with their cutting-edge Max Grip technology. The Dunlop pick's non-slip grip is molded into the entire gripping surface for incredible control while the tip features a same sharp and beveled shape for quick string release. Players looking to increase their speed and articulation plus Jazz III fanatics alike will benefit from this amazing combination.",
        price: 4.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/712933000000000-00-86x86.jpg",
        type: "picks",
      },
      {
        name: "D'Addario Classic Celluloid Guitar Picks - 12-Pack Medium Camouflage",
        description: "The D'Addario 1CF4-12G is a 12-pack of medium gauge camouflage-colored celluloid picks.",
        price: 5.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/J27327000001001-00-600x600.jpg",
        type: "picks",
      },
      {
        name: "D'Addario Classic Celluloid Guitar Picks - 12-Pack Medium Rainbow",
        description: "The D'Addario 1CF4-12G is a 12-pack of medium gauge rainbow-colored celluloid picks.",
        price: 5.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/J27327000001002-00-600x600.jpg",
        type: "picks",
      },
      {
        name: "Fender 351 Premium Celluloid Guitar Picks 12-Pack Blue Moto X-Heavy",
        description: "Often called the Fender pick, the 351 shape is the pick most associated with Fender. A wider body and a rounded tip have made this pick a favorite with players of every style.",
        price: 4.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/110556000004001-01-600x600.jpg",
        type: "picks",
      },
      {
        name: "Dunlop EVH Tortex Pick - 1.14mm",
        description: "Get the world's most iconic guitar finish on the world's most popular pick material with the Dunlop EVH Tortex pick. These authentic Tortex Picks feature artwork sourced from Eddie Van Halen’s “Frankenstein,” the most widely recognized guitar in the world. Tortex Picks are highly durable with great memory and just the right amount of flexibility.",
        price: 9.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/L88894000000000-00-600x600.jpg",
        type: "picks",
      },
      {
        name: "Dunlop Tortex Standard Guitar Picks .88 mm 6 Dozen",
        description: "Tortex picks are carefully designed and manufactured to give the characteristic maximum memory and minimum wear that made the original tortoiseshell famous. Dunlop's Tortex guitar picks are available in a variety of shapes and gauges. This is a pack of six dozen.",
        price: 24.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/110040000436160-00-600x600.jpg",
        type: "picks",
      },
      {
        name: "Dunlop Primetone Triangle Sculpted Plectra 3-Pack 1.4 mm",
        description: "Primetone Triangle Sculpted Plectra will glide off your strings and bring out the true voice and clarity of your instrument. With hand-burnished sculpted edges, these picks allow for fast, articulate runs and effortless strumming. Made from Ultex for maximum durability and superior tonal definition. Available in three different shapes with a low-profile grip or a smooth traditional surface. 3 pack of 1.5mm picks.",
        price: 12.99,
        stock: 1000,
        image: "https://media.guitarcenter.com/is/image/MMGS7/J12058000001000-00-600x600.jpg",
        type: "picks",
      },
    ];

    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("products: ", products);

    console.log("Finished Creating Products!");

    console.log("Starting to create orders...");

    const ordersToCreate = [
      {
        userId: 1,
        productId: 1,
        price: 500.0,
        quantity: 3,
      },
      {
        userId: 2,
        productId: 8,
        price: 449.99,
        quantity: 2,
      },
      {
        userId: 3,
        productId: 4,
        price: 549.99,
        quantity: 1,
      },
      {
        userId: 4,
        productId: 3,
        price: 4431.99,
        quantity: 5,
      },
      {
        userId: 5,
        productId: 6,
        price: 729.99,
        quantity: 5,
      },
    ];

    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log("orders: ", orders);

    console.log("Finished creating orders!");

    console.log("Starting to create reviews...");

    const reviewsToCreate = [
      {
        creatorId: 1,
        productId: 1,
        description: "Great quality, plays just how I imagined it would!",
      },
      {
        creatorId: 2,
        productId: 2,
        description:
          "Bad quality, came in the wrong color, out of tune. Would not buy again!",
      },
      {
        creatorId: 3,
        productId: 3,
        description: "Exceptional!",
      },
    ];

    const reviews = await Promise.all(reviewsToCreate.map(createReview));
    console.log("reviews: ", reviews);
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
