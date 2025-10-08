const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Test route
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// ATS route
app.post('/api/ats-check', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let text = '';

    if (req.file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    } else if (
      req.file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;
    } else {
      return res.status(400).json({ message: 'Only PDF or DOCX files supported' });
    }

    const keywords = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS'];
    let score = 0;

    keywords.forEach((kw) => {
      if (text.toLowerCase().includes(kw.toLowerCase())) {
        score += 10;
      }
    });

    res.json({
      message: 'Resume analyzed successfully',
      score,
      total: 100,
      matchPercentage: `${score}%`,
      foundKeywords: keywords.filter((kw) =>
        text.toLowerCase().includes(kw.toLowerCase())
      ),
    });
  } catch (err) {
    console.error('ATS Check Error:', err);
    res.status(500).json({ message: 'Error analyzing resume' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
