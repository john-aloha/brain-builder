# 🧠 Memory Strategy Simulator

An interactive educational game that teaches Psychology 101 memory concepts through hands-on experience. Instead of just reading about memory techniques, students actually *use* them and see which strategies work best for their own learning.

![Memory Strategy Simulator](https://img.shields.io/badge/Psychology-101-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📚 Educational Purpose

This game was designed for **Psychology 101 classrooms** to teach memory and learning concepts in an engaging, experiential way. Rather than lecturing about memory strategies, students discover which techniques work through direct experience.

### Learning Objectives

By the end of the activity, students will be able to:

1. **Define** the four major memory strategies (rote rehearsal, chunking, mnemonics, method of loci)
2. **Experience** each strategy firsthand through interactive challenges
3. **Compare** the effectiveness of different strategies for immediate vs. long-term recall
4. **Reflect** on which strategies work best for their personal learning style
5. **Apply** these techniques to their own study habits

---

## 🎮 How It Works

### Game Structure

The simulator consists of **5 rounds**, each presenting a different list of 8 items to memorize:

| Round | Theme | Items |
|-------|-------|-------|
| 1 | Groceries | Apple, Milk, Bread, Chicken, Banana, Cheese, Rice, Eggs |
| 2 | Random Objects | Clock, Feather, Hammer, Mirror, Candle, Rope, Globe, Whistle |
| 3 | Countries | Japan, Brazil, Egypt, Canada, France, India, Mexico, Sweden |
| 4 | Abstract Concepts | Justice, Freedom, Courage, Wisdom, Patience, Honor, Grace, Truth |
| 5 | Animals | Eagle, Dolphin, Tiger, Penguin, Elephant, Shark, Wolf, Turtle |

### Flow for Each Round

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Study Phase    │ ──▶ │ Choose Strategy │ ──▶ │   Experience    │
│  (15 seconds)   │     │                 │     │   the Strategy  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Psychology     │ ◀── │  View Results   │ ◀── │  Recall Test    │
│  Insight        │     │                 │     │  (30 seconds)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Final Exam

After all 5 rounds, students take a **60-second final exam** where they try to recall items from *all previous rounds*. This tests **long-term retention** and reveals which strategies truly helped information stick.

---

## 🔬 The Four Memory Strategies

### 1. 🔁 Rote Rehearsal

**What it is:** Repeating information over and over until it sticks.

**How it's experienced:** Students type each word 3 times (total of 24 repetitions).

**Psychology insight:** This is the most common study method, but research shows it's the least effective for long-term retention. Information often fades within hours unless reinforced. This is why "cramming" the night before rarely works!

---

### 2. 📦 Chunking

**What it is:** Grouping items into meaningful categories to reduce cognitive load.

**How it's experienced:** Students drag and drop items into 3 logical groups.

**Psychology insight:** Working memory can only hold about 7 items at once (Miller's Law). Chunking lets you remember more by treating each group as a single "chunk." This is why phone numbers are formatted as 555-123-4567 instead of 5551234567.

---

### 3. 🎵 Mnemonic Devices

**What it is:** Creating a memorable phrase, acronym, or story from the first letters of items.

**How it's experienced:** Students see the first letters displayed and create their own mnemonic phrase.

**Psychology insight:** Mnemonics create meaningful connections between unrelated items. "Every Good Boy Does Fine" has helped millions learn musical notes (EGBDF). The sillier or more personal the mnemonic, the better it sticks!

---

### 4. 🏛️ Method of Loci (Memory Palace)

**What it is:** Placing items in rooms of a familiar mental location.

**How it's experienced:** Students drag items into 8 rooms of a virtual house (Entrance, Living Room, Kitchen, Bedroom, Bathroom, Garden, Garage, Attic).

**Psychology insight:** This ancient Greek technique is still used by memory champions today. By leveraging spatial memory—one of the brain's strongest systems—people can memorize decks of cards in minutes.

---

## 📊 Assessment & Reflection

### Results Dashboard

After each round, students see:
- **Score:** How many items they recalled correctly
- **Breakdown:** Which specific items they remembered vs. forgot
- **Psychology Insight:** Scientific explanation of why the strategy works (or doesn't)

### Final Results

At the end, students see a comprehensive comparison:
- Immediate recall percentage for each strategy used
- Long-term recall percentage (from the final exam)
- Their personal "best strategy" based on results

### Reflection Questions

Built-in discussion prompts for classroom use:
1. Which strategy felt the most natural to you? Why?
2. Were you surprised by which strategy worked best?
3. How might you use these strategies when studying for real exams?
4. Why do you think some strategies work better for long-term memory?

---

## 🚀 Quick Start

### Option 1: Run Locally

```bash
# Clone the repository
git clone https://github.com/john-aloha/brain-builder.git

# Navigate to the directory
cd brain-builder

# Start a local server (Python 3)
python3 -m http.server 8080

# Or with Node.js
npx serve
```

Then open **http://localhost:8080** in your browser.

### Option 2: GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set source to `main` branch
3. Access at `https://john-aloha.github.io/brain-builder`

---

## 📁 Project Structure

```
brain-builder/
├── index.html      # Game structure and all screens
├── styles.css      # Modern dark theme with strategy-specific colors
├── game.js         # Game logic, state management, and interactions
└── README.md       # This file
```

### Key Files

| File | Purpose |
|------|---------|
| `index.html` | Contains all 12 game screens (welcome, rounds, strategies, results) |
| `styles.css` | Responsive design with CSS variables for easy theming |
| `game.js` | Complete game engine with drag-and-drop, timers, and scoring |

---

## 🎨 Customization

### Changing Word Lists

Edit the `WORD_LISTS` array in `game.js`:

```javascript
const WORD_LISTS = [
    ['Your', 'Custom', 'Words', 'Here', 'For', 'Round', 'One', 'List'],
    // ... more rounds
];
```

### Adjusting Timers

Modify timer durations in the game functions:
- **Study time:** Change `15` in `showRoundIntro()`
- **Recall time:** Change `30` in `startRecallTest()`
- **Final exam time:** Change `60` in `startFinalExam()`

### Adding More Rounds

1. Add new word lists to `WORD_LISTS` array
2. Update round count checks (currently `gameState.currentRound >= 5`)

---

## 🧪 Classroom Usage Tips

### Before the Activity
- Briefly explain that students will be "testing different memory strategies"
- Don't reveal which strategies work best—let them discover it!

### During the Activity
- Allow 15-20 minutes for full gameplay
- Students can work individually or in pairs
- Encourage them to try different strategies each round

### After the Activity
- Use the built-in reflection questions for discussion
- Compare results across the class (anonymous poll)
- Connect to course material on memory encoding and retrieval

### Assessment Ideas
- Short written reflection on personal results
- Quiz on the four strategies and their mechanisms
- Homework: Apply one strategy to study for another class

---

## 🔧 Technical Details

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Dependencies
- **None!** Pure HTML, CSS, and JavaScript
- No build process required
- No npm packages to install

### Features
- Drag-and-drop interactions (Chunking & Method of Loci)
- Real-time input validation (Rote Rehearsal)
- Countdown timers
- Progress tracking
- Responsive design (works on tablets)

---

## 📄 License

MIT License - Feel free to use, modify, and share for educational purposes.

---

## 🙏 Acknowledgments

This game was inspired by research on memory and learning, including:
- Miller, G. A. (1956). "The magical number seven, plus or minus two"
- Bower, G. H. (1970). "Analysis of a mnemonic device"
- Maguire, E. A. et al. (2003). "Routes to remembering: the brains behind superior memory"

---

## 📬 Contact

Created for **Aloha University** Psychology Department.

For questions or feedback, please open an issue on GitHub.

---

*"Tell me and I forget. Teach me and I remember. Involve me and I learn."* — Benjamin Franklin
