import express from 'express';

  let articlesInfo = [
    {
      name: 'learn-react',
      upvotes: 0,
    },
    {
      name: 'learn-node',
      upvotes: 0,
    },
    {
      name: 'my-thoughts-on-resumes',
      upvotes: 0,
    },
  ]
    

const app = express();
app.use(express.json());


app.put('/api/articles/:name/upvote', (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find((article) => article.name === name);
  if (article) {
    article.upvotes += 1;
    res.send(`${name} now has ${article.upvotes} upvotes`);
  }
  else {
    res.status(404).send('Article not found');
  }
  

});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
