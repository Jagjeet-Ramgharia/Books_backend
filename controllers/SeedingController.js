const Book = require("../Models/BooksModel");

const CreatedBooks = async (req, res) => {
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classics",
      description: "A classic novel about the American Dream.",
      isbn: "9780141182636",
      image:
        "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classics",
      description: "A powerful story of racial injustice in the Deep South.",
      isbn: "9780061120084",
      image:
        "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Classics",
      description: "A coming-of-age novel about teenage angst and alienation.",
      isbn: "9780316769488",
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classics",
      description:
        "A powerful novel that explores racial injustice and the loss of innocence in the South.",
      isbn: "9780446310789",
      image:
        "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      description:
        "A witty and charming novel about the complicated relationships of a wealthy family in Regency-era England.",
      isbn: "9780141439518",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      description:
        "A haunting novel about a totalitarian society where individual freedom is suppressed and government surveillance is omnipresent.",
      isbn: "9780451524935",
      image:
        "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Young Adult Fiction",
      description:
        "A coming-of-age novel about a disillusioned teenager struggling with identity, belonging, and the phoniness of the adult world.",
      isbn: "9780316769488",
      image:
        "https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      description:
        "A classic adventure story about a hobbit who embarks on a perilous quest to reclaim a treasure from a dragon.",
      isbn: "9780547928227",
      image:
        "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      description:
        "An epic trilogy that chronicles the quest of a young hobbit and his companions to destroy an evil ring that threatens the fate of Middle-earth.",
      isbn: "9780618640157",
      image:
        "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "The Hunger Games",
      author: "Suzanne Collins",
      genre: "Young Adult Fiction",
      description:
        "A thrilling dystopian novel about a young girl who volunteers to compete in a brutal televised competition where only one survivor can emerge.",
      isbn: "9780439023481",
      image:
        "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Thriller",
      description:
        "A fast-paced mystery thriller about a symbologist who uncovers a secret society and a religious conspiracy that could shake the foundations of Christianity.",
      isbn: "9780307474278",
      image:
        "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];

  try {
    // Delete existing books
    await Book.deleteMany({});

    // Insert new books
    const insertedBooks = await Book.insertMany(books);

    console.log(`Inserted ${insertedBooks.length} books`);
    return res.json({
      message: "Created",
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Something went wrong",
      err,
    });
  }
};

const CreateAuthors = async (req, res) => {
  const authors = [
    {
      name: "F. Scott Fitzgerald",
    },
    {
      name: "Harper Lee",
    },
    {
      name: "J.D. Salinger",
    },
    {
      name: "Jane Austen",
    },
    {
      name: "George Orwell",
    },
    {
      name: "J.R.R. Tolkien",
    },
    {
      name: "Suzanne Collins",
    },
    {
      name: "Dan Brown",
    },
  ];

  try {
    // Delete existing books
    await AuthorModel.deleteMany({});

    // Insert new books
    const insertedAuthor = await AuthorModel.insertMany(authors);

    console.log(`Inserted ${insertedAuthor.length} author`);
    return res.json({
      message: "Created",
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Something went wrong",
      err,
    });
  }
};

const CreateGenres = async (req, res) => {
  const genre = [
    {
      name: "Classics",
    },
    {
      name: "Romance",
    },
    {
      name: "Dystopian Fiction",
    },
    {
      name: "Young Adult Fiction",
    },
    {
      name: "Fantasy",
    },
    {
      name: "Thriller",
    },
  ];

  try {
    // Delete existing books
    await GenreSchema.deleteMany({});

    // Insert new books
    const insertedGenres = await GenreSchema.insertMany(genre);

    console.log(`Inserted ${insertedGenres.length} genres`);
    return res.json({
      message: "Created",
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Something went wrong",
      err,
    });
  }
};

module.exports = {
  CreatedBooks,
  CreateAuthors,
  CreateGenres,
};
