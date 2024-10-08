const { Client } = require('./db');
const pool = require('./db');

const SQL = `
CREATE TABLE IF NOT EXISTS publishers (
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name VARCHAR (255) NOT NULL,
     country VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     title VARCHAR (30) NOT NULL,
     description TEXT,
     rating INTEGER,
     img_url VARCHAR (255),
     release_date DATE,
     publisher_id INTEGER REFERENCES publishers(id),
     category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES games(id),
    comment TEXT,
    "user" VARCHAR (100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO publishers (name, country)
    VALUES
    ("Nintendo", "Japan"),
    ("Sony", "Japan"),
    ("Capcon", "Japan"),
    ("Midway", "USA"),
    ("Sega", "Japan"),
    ("Rockstar", "USA");

INSERT INTO categories (name)
    VALUES
    ("RPG"),
    ("Fighting"),
    ("Action"),
    ("Platform");

INSERT INTO games (title, description, rating, image_url, release_date, publishers_id, category_id)
    VALUES
    ("Super Mario Bros. 3","A two-dimensional, side-scrolling platform game in which the player controls either Mario or Luigi.", "9", "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Super_Mario_Bros._3_coverart.png/220px-Super_Mario_Bros._3_coverart.png", "1988-10-23", "1","4"),
    ("Final Fantasy VII", "Turn-based RPG", "10", "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Final_Fantasy_VII_Box_Art.jpg/220px-Final_Fantasy_VII_Box_Art.jpg", "1997-01-31", "2", "1"),
    ("Sonic The Hedgehog 2", "Fast-paced platformer", "8", "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Sonic_2_US_Cover.jpg/220px-Sonic_2_US_Cover.jpg", "1992-11-21", "5", "4"),
    ("Street Fighter II", "Platform / Arcade fighter", "8", "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/SF2_JPN_flyer.jpg/220px-SF2_JPN_flyer.jpg", "1991-03-07", "3", "2"),
    ("Mortal Kombat II", "Platform / Arcade fighter", "8", "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Mortal_Kombat_II_boxart.png/220px-Mortal_Kombat_II_boxart.png", "4", "2"),
    ("Grand Theft Auto: San Andreas", "Action adventure", "9", "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/GTASABOX.jpg/220px-GTASABOX.jpg", "2004-10-26", "6", "3");
`;


async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();