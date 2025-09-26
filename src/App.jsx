import React, { useState } from "react";

function BookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onAdd({ id: Date.now().toString(), title, author });
    setTitle(""); setAuthor("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
}

function BookList({ books, onDelete }) {
  if (!books.length) return <p>No books available.</p>;
  return (
    <ul>
      {books.map(b => (
        <li key={b.id}>
          {b.title} by {b.author}
          <button onClick={() => onDelete(b.id)} style={{ marginLeft: 10 }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [books, setBooks] = useState([]);

  function addBook(book) {
    setBooks([...books, book]);
  }

  function deleteBook(id) {
    setBooks(books.filter(b => b.id !== id));
  }

  return (
    <main style={{ maxWidth: 600, margin: "20px auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <h1>Library Book Management</h1>
      <BookForm onAdd={addBook} />
      <BookList books={books} onDelete={deleteBook} />
    </main>
  );
}