const QUESTIONS = [
    {
      category: "Geography",
      question: "Which country has the most natural lakes in the world?",
      options: ["Canada", "Russia", "Finland", "United States"],
      answer: 0
    },
    {
      category: "Science",
      question: "What is the hardest naturally occurring substance on Earth?",
      options: ["Titanium", "Quartz", "Diamond", "Obsidian"],
      answer: 2
    },
    {
      category: "History",
      question: "The Great Fire of London took place in which year?",
      options: ["1566", "1666", "1766", "1866"],
      answer: 1
    },
    {
      category: "Movies",
      question: "Which studio produced the first feature-length animated film, Snow White and the Seven Dwarfs?",
      options: ["Warner Bros", "Disney", "MGM", "Universal"],
      answer: 1
    },
    {
      category: "Sports",
      question: "In tennis, what is the term for a score of zero?",
      options: ["Love", "Nil", "Duck", "Blank"],
      answer: 0
    },
    {
      category: "Music",
      question: "How many strings does a standard violin have?",
      options: ["Three", "Four", "Five", "Six"],
      answer: 1
    },
    {
      category: "Food & Drink",
      question: "Which spice is derived from the Crocus flower?",
      options: ["Turmeric", "Paprika", "Saffron", "Cumin"],
      answer: 2
    },
    {
      category: "Literature",
      question: "Who wrote the novel '1984'?",
      options: ["Aldous Huxley", "Ray Bradbury", "George Orwell", "H.G. Wells"],
      answer: 2
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  const tallyWrap = document.getElementById('tallyWrap');
  const scoreOut = document.getElementById('scoreOut');
  const totalOut = document.getElementById('totalOut');
  const categoryEl = document.getElementById('category');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const feedbackEl = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextBtn');
  const board = document.getElementById('board');
  const quizView = document.getElementById('quizView');
  const results = document.getElementById('results');
  const resultsScore = document.getElementById('resultsScore');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsNote = document.getElementById('resultsNote');
  const restartBtn = document.getElementById('restartBtn');

  totalOut.textContent = QUESTIONS.length;

  function renderTally() {
    tallyWrap.innerHTML = '';
    for (let g = 0; g < Math.ceil(QUESTIONS.length / 5); g++) {
      const group = document.createElement('div');
      group.className = 'tally-group';
      const groupStart = g * 5;
      const groupEnd = Math.min(groupStart + 5, QUESTIONS.length);
      const count = groupEnd - groupStart;
      for (let i = 0; i < count; i++) {
        const mark = document.createElement('div');
        const idx = groupStart + i;
        mark.className = 'tally-mark' + (idx === 4 ? ' slash' : '') + (idx < current ? ' filled' : '');
        group.appendChild(mark);
      }
      tallyWrap.appendChild(group);
    }
  }

  function loadQuestion() {
    answered = false;
    feedbackEl.textContent = '';
    nextBtn.classList.remove('show');
    renderTally();

    const q = QUESTIONS[current];
    categoryEl.textContent = q.category;
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(i, btn) {
    if (answered) return;
    answered = true;

    const q = QUESTIONS[current];
    const allBtns = optionsEl.querySelectorAll('.option');
    allBtns.forEach(b => b.disabled = true);

    if (i === q.answer) {
      score++;
      btn.classList.add('correct');
      feedbackEl.textContent = "Chalk it up, that's correct.";
    } else {
      btn.classList.add('wrong');
      allBtns[q.answer].classList.add('correct');
      feedbackEl.textContent = "Not quite — the right answer's highlighted.";
    }

    scoreOut.textContent = score;
    nextBtn.classList.add('show');
  }

  nextBtn.addEventListener('click', () => {
    current++;
    if (current < QUESTIONS.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    board.classList.add('results-active');
    results.classList.add('show');

    resultsScore.textContent = `${score}/${QUESTIONS.length}`;
    const pct = score / QUESTIONS.length;

    let title, note;
    if (pct === 1) {
      title = "Perfect round";
      note = "Every chalk mark landed. Reigning champion of the board.";
    } else if (pct >= 0.75) {
      title = "Strong showing";
      note = "You know your way around a pub quiz.";
    } else if (pct >= 0.5) {
      title = "Solid effort";
      note = "More right than wrong — worth a rematch.";
    } else {
      title = "Back to the books";
      note = "Every quiz night has one of these rounds.";
    }
    resultsTitle.textContent = title;
    resultsNote.textContent = note;
  }

  restartBtn.addEventListener('click', () => {
    current = 0;
    score = 0;
    scoreOut.textContent = 0;
    board.classList.remove('results-active');
    results.classList.remove('show');
    loadQuestion();
  });

  loadQuestion();