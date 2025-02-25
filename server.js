const express = require('express');
const app = express();
const port = 3000;

let books = [
  { BookId: 7, title: 'fe qalbi onsa 3brya' },
  { BookId: 9, title: 'lelt el eid ' },
  { BookId: 10, title: 'nazra' },
  { BookId: 14, title: 'the sun also rises'}
];

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('/books --> list of books.');
});

app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.BookId === bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.post('/books', (req, res) => {
    const newBook = req.body;
  
    if (!newBook.title) {
      return res.status(400).json({ error: "Title is required" });
    }
  
    const maxId = books.length > 0 ? Math.max(...books.map(b => b.BookId)) : 0;
    newBook.BookId = maxId + 1;
  
    books.push(newBook);
    res.status(201).json(newBook);
  });
  
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.BookId === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.status(200).json(books[bookIndex]);
  } 
  else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.BookId !== bookId);
  res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  