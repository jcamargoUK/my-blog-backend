import express from 'express';
import { db, connectToDb } from './db.js';


const app = express();
app.use(express.json());


app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;

  const article = await db.collection('articles').findOne({ name });

  if (article) {
    res.status(200).json(article);

  } else {
    res.status(404).send('Article not found');
  }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;


  await db.collection('articles').updateOne({ name }, {
    '$inc': {
      upvotes: 1,
    },
  });
  const article = await db.collection('articles').findOne({ name });

  if (article) {
    res.send(`${name} now has ${article.upvotes} upvotes`);
  }
  else {
    res.status(404).send('Article not found');
  }
});



app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db.collection('articles').updateOne({ name }, {
    '$push': {
      comments: {
        postedBy,
        text,
      },
    },
  });
  const article = await db.collection('articles').findOne({ name });

  if (article) {
    res.status(200).send(article.comments);
  }
  else {
    res.status(404).send('Article not found');
  }
});

connectToDb(() => {
  console.log('Successfully connected to database')
  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
});
