const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ Server running'));

// CREATE or UPDATE draft
app.post('/api/blogs/save-draft', async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;

    const data = {
      title,
      content,
      tags: Array.isArray(tags) ? tags.join(',') : tags,
      status: 'draft',
    };

    let blog;
    if (id) {
      blog = await prisma.blog.update({
        where: { id: parseInt(id) },
        data,
      });
    } else {
      blog = await prisma.blog.create({ data });
    }

    res.json(blog);
  } catch (err) {
    console.error('❌ Save Draft Error:', err);
    res.status(500).json({ error: 'Failed to save draft' });
  }
});

// PUBLISH blog
app.post('/api/blogs/publish', async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;

    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        tags: Array.isArray(tags) ? tags.join(',') : tags,
        status: 'published',
      },
    });

    res.json(blog);
  } catch (err) {
    console.error('❌ Publish Error:', err);
    res.status(500).json({ error: 'Failed to publish blog' });
  }
});

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json(blogs);
  } catch (err) {
    console.error('❌ Fetch Blogs Error:', err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// GET one blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(blog);
  } catch (err) {
    console.error('❌ Fetch Blog Error:', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ SQLite API running at http://localhost:${PORT}`);
});
// DELETE blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await prisma.blog.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});
