/**
 * Memory Strategy Simulator
 * An educational game where students experience different memory techniques
 */

// ============================================
// GAME DATA - Word Lists for Each Round
// ============================================

const WORD_LISTS = [
    // Round 1: Groceries (easy to chunk by category)
    ['Apple', 'Milk', 'Bread', 'Chicken', 'Banana', 'Cheese', 'Rice', 'Eggs'],

    // Round 2: Random objects (harder to organize)
    ['Clock', 'Feather', 'Hammer', 'Mirror', 'Candle', 'Rope', 'Globe', 'Whistle'],

    // Round 3: Countries (can group by continent)
    ['Japan', 'Brazil', 'Egypt', 'Canada', 'France', 'India', 'Mexico', 'Sweden'],

    // Round 4: Abstract concepts (challenging)
    ['Justice', 'Freedom', 'Courage', 'Wisdom', 'Patience', 'Honor', 'Grace', 'Truth'],

    // Round 5: Animals (can group by type)
    ['Eagle', 'Dolphin', 'Tiger', 'Penguin', 'Elephant', 'Shark', 'Wolf', 'Turtle']
];

const STRATEGY_INSIGHTS = {
    rote: {
        title: "💡 The Science of Rote Rehearsal",
        text: "Rote rehearsal keeps information in short-term memory through repetition. It's the most common study method, but also the least efficient for long-term retention. The information often fades within hours unless reinforced. This is why cramming the night before rarely works!"
    },
    chunking: {
        title: "💡 The Power of Chunking",
        text: "Your working memory can only hold about 7 items at once. Chunking groups items together, letting you remember more by treating each group as a single 'chunk.' This is why phone numbers are formatted as 555-123-4567 instead of 5551234567."
    },
    mnemonic: {
        title: "💡 Why Mnemonics Work",
        text: "Mnemonics create meaningful connections between unrelated items. 'Every Good Boy Does Fine' has helped millions learn musical notes (EGBDF). The sillier or more personal your mnemonic, the better it sticks!"
    },
    loci: {
        title: "💡 The Ancient Memory Palace",
        text: "The Method of Loci was invented by ancient Greeks and is still used by memory champions today. By placing items in familiar locations, you leverage spatial memory—one of the brain's strongest systems. Memory champions can memorize decks of cards in minutes using this technique!"
    }
};

// ============================================
// GAME STATE
// ============================================

const gameState = {
    currentRound: 0,
    currentItems: [],
    currentStrategy: null,

    // Results tracking
    roundResults: [],
    allItems: [], // All items from all rounds for final exam

    // Strategy-specific data
    roteProgress: 0,
    roteTotalNeeded: 0,
    userMnemonic: '',

    // Timers
    studyTimerId: null,
    recallTimerId: null,
    examTimerId: null
};

// ============================================
// DOM ELEMENTS
// ============================================

const screens = {
    welcome: document.getElementById('screen-welcome'),
    roundIntro: document.getElementById('screen-round-intro'),
    strategy: document.getElementById('screen-strategy'),
    rote: document.getElementById('screen-rote'),
    chunking: document.getElementById('screen-chunking'),
    mnemonic: document.getElementById('screen-mnemonic'),
    loci: document.getElementById('screen-loci'),
    recall: document.getElementById('screen-recall'),
    roundResults: document.getElementById('screen-round-results'),
    finalExam: document.getElementById('screen-final-exam'),
    finalResults: document.getElementById('screen-final-results')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    window.scrollTo(0, 0);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function normalizeWord(word) {
    return word.toLowerCase().trim();
}

// ============================================
// GAME FLOW
// ============================================

function startGame() {
    // Reset state
    gameState.currentRound = 0;
    gameState.roundResults = [];
    gameState.allItems = [];

    startRound();
}

function startRound() {
    gameState.currentRound++;
    gameState.currentItems = [...WORD_LISTS[gameState.currentRound - 1]];
    gameState.allItems.push(...gameState.currentItems);
    gameState.currentStrategy = null;

    showRoundIntro();
}

function showRoundIntro() {
    document.getElementById('round-number').textContent = gameState.currentRound;
    document.getElementById('item-count').textContent = gameState.currentItems.length;

    // Display items
    const itemsContainer = document.getElementById('items-to-memorize');
    itemsContainer.innerHTML = '';

    gameState.currentItems.forEach((item, index) => {
        const chip = document.createElement('span');
        chip.className = 'item-chip';
        chip.textContent = item;
        chip.style.animationDelay = `${index * 0.1}s`;
        itemsContainer.appendChild(chip);
    });

    showScreen('roundIntro');

    // Start timer
    let timeLeft = 15;
    const timerEl = document.getElementById('study-timer');
    timerEl.textContent = timeLeft;

    clearInterval(gameState.studyTimerId);
    gameState.studyTimerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameState.studyTimerId);
            showStrategySelection();
        }
    }, 1000);
}

function showStrategySelection() {
    showScreen('strategy');
}

function selectStrategy(strategy) {
    gameState.currentStrategy = strategy;

    switch (strategy) {
        case 'rote':
            setupRoteExperience();
            break;
        case 'chunking':
            setupChunkingExperience();
            break;
        case 'mnemonic':
            setupMnemonicExperience();
            break;
        case 'loci':
            setupLociExperience();
            break;
    }
}

// ============================================
// ROTE REHEARSAL EXPERIENCE
// ============================================

function setupRoteExperience() {
    const items = shuffleArray(gameState.currentItems);
    gameState.roteProgress = 0;
    gameState.roteTotalNeeded = items.length * 3; // Each word 3 times

    let itemIndex = 0;
    let repeatCount = 0;

    const wordEl = document.getElementById('rote-word');
    const inputEl = document.getElementById('rote-input');
    const countEl = document.getElementById('rote-count');
    const totalEl = document.getElementById('rote-total');
    const progressFill = document.getElementById('rote-progress-fill');

    totalEl.textContent = gameState.roteTotalNeeded;
    countEl.textContent = 0;
    progressFill.style.width = '0%';
    wordEl.textContent = items[itemIndex].toUpperCase();
    inputEl.value = '';
    inputEl.focus();

    // Remove old listener
    const newInput = inputEl.cloneNode(true);
    inputEl.parentNode.replaceChild(newInput, inputEl);

    newInput.addEventListener('input', function () {
        const typed = this.value.toLowerCase().trim();
        const target = items[itemIndex].toLowerCase();

        if (typed === target) {
            gameState.roteProgress++;
            repeatCount++;

            this.classList.add('correct');
            setTimeout(() => this.classList.remove('correct'), 200);

            countEl.textContent = gameState.roteProgress;
            progressFill.style.width = `${(gameState.roteProgress / gameState.roteTotalNeeded) * 100}%`;

            this.value = '';

            if (repeatCount >= 3) {
                repeatCount = 0;
                itemIndex++;
            }

            if (itemIndex >= items.length) {
                // Done with rote
                setTimeout(() => startRecallTest(), 500);
            } else {
                wordEl.textContent = items[itemIndex].toUpperCase();
            }
        }
    });

    showScreen('rote');
    newInput.focus();
}

// ============================================
// CHUNKING EXPERIENCE
// ============================================

function setupChunkingExperience() {
    const sourceEl = document.getElementById('chunk-source');
    const zones = document.querySelectorAll('.chunk-zone');
    const doneBtn = document.getElementById('btn-chunking-done');

    // Create draggable items
    sourceEl.innerHTML = '';
    shuffleArray(gameState.currentItems).forEach(item => {
        const chip = document.createElement('div');
        chip.className = 'chunk-item';
        chip.textContent = item;
        chip.draggable = true;
        chip.dataset.item = item;

        chip.addEventListener('dragstart', handleDragStart);
        chip.addEventListener('dragend', handleDragEnd);

        sourceEl.appendChild(chip);
    });

    // Setup drop zones
    zones.forEach(zone => {
        zone.querySelector('.zone-items').innerHTML = '';
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });

    // Also allow dropping back to source
    sourceEl.addEventListener('dragover', handleDragOver);
    sourceEl.addEventListener('drop', handleDropToSource);

    doneBtn.disabled = true;

    // Check if all items are placed
    function checkComplete() {
        const itemsInSource = sourceEl.querySelectorAll('.chunk-item').length;
        doneBtn.disabled = itemsInSource > 0;
    }

    // Use MutationObserver to detect changes
    const observer = new MutationObserver(checkComplete);
    observer.observe(sourceEl, { childList: true });
    zones.forEach(zone => {
        observer.observe(zone.querySelector('.zone-items'), { childList: true });
    });

    showScreen('chunking');
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const zone = e.target.closest('.chunk-zone') || e.target.closest('#chunk-source');
    if (zone) zone.classList.add('drag-over');
}

function handleDragLeave(e) {
    const zone = e.target.closest('.chunk-zone');
    if (zone) zone.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const zone = e.target.closest('.chunk-zone');
    if (zone && draggedElement) {
        zone.querySelector('.zone-items').appendChild(draggedElement);
        zone.classList.remove('drag-over');
    }
}

function handleDropToSource(e) {
    e.preventDefault();
    const source = document.getElementById('chunk-source');
    if (draggedElement) {
        source.appendChild(draggedElement);
        source.classList.remove('drag-over');
    }
}

function finishChunking() {
    startRecallTest();
}

// ============================================
// MNEMONIC EXPERIENCE
// ============================================

function setupMnemonicExperience() {
    const lettersEl = document.getElementById('mnemonic-letters');
    const itemsEl = document.getElementById('mnemonic-items');
    const phraseInput = document.getElementById('mnemonic-phrase');

    // Show first letters
    lettersEl.innerHTML = '';
    gameState.currentItems.forEach(item => {
        const box = document.createElement('span');
        box.className = 'letter-box';
        box.textContent = item[0].toUpperCase();
        lettersEl.appendChild(box);
    });

    // Show full items for reference
    itemsEl.innerHTML = '';
    gameState.currentItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'mnemonic-item';
        span.textContent = item;
        itemsEl.appendChild(span);
    });

    phraseInput.value = '';

    showScreen('mnemonic');
    phraseInput.focus();
}

function finishMnemonic() {
    gameState.userMnemonic = document.getElementById('mnemonic-phrase').value;
    startRecallTest();
}

// ============================================
// METHOD OF LOCI EXPERIENCE
// ============================================

function setupLociExperience() {
    const itemsEl = document.getElementById('loci-items');
    const rooms = document.querySelectorAll('.palace-room');
    const doneBtn = document.getElementById('btn-loci-done');

    // Create draggable items
    itemsEl.innerHTML = '';
    shuffleArray(gameState.currentItems).forEach(item => {
        const chip = document.createElement('div');
        chip.className = 'loci-item';
        chip.textContent = item;
        chip.draggable = true;
        chip.dataset.item = item;

        chip.addEventListener('dragstart', handleDragStart);
        chip.addEventListener('dragend', handleDragEnd);

        itemsEl.appendChild(chip);
    });

    // Setup rooms as drop zones
    rooms.forEach(room => {
        const roomItem = room.querySelector('.room-item');
        roomItem.innerHTML = '';
        room.classList.remove('has-item');

        room.addEventListener('dragover', handleLociDragOver);
        room.addEventListener('dragleave', handleLociDragLeave);
        room.addEventListener('drop', handleLociDrop);
    });

    // Allow dropping back to source
    itemsEl.addEventListener('dragover', handleDragOver);
    itemsEl.addEventListener('drop', handleLociDropToSource);

    doneBtn.disabled = true;

    // Check completion
    function checkComplete() {
        const itemsRemaining = itemsEl.querySelectorAll('.loci-item').length;
        doneBtn.disabled = itemsRemaining > 0;
    }

    const observer = new MutationObserver(checkComplete);
    observer.observe(itemsEl, { childList: true });
    rooms.forEach(room => {
        observer.observe(room.querySelector('.room-item'), { childList: true });
    });

    showScreen('loci');
}

function handleLociDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const room = e.target.closest('.palace-room');
    if (room) {
        room.classList.add('drag-over');
    }
}

function handleLociDragLeave(e) {
    const room = e.target.closest('.palace-room');
    if (room) room.classList.remove('drag-over');
}

function handleLociDrop(e) {
    e.preventDefault();
    const room = e.target.closest('.palace-room');
    if (room && draggedElement) {
        const roomItem = room.querySelector('.room-item');
        // If room already has an item, move it back to source
        const existingItem = roomItem.querySelector('.loci-item');
        if (existingItem) {
            document.getElementById('loci-items').appendChild(existingItem);
        }
        roomItem.appendChild(draggedElement);
        room.classList.add('has-item');
        room.classList.remove('drag-over');
    }
}

function handleLociDropToSource(e) {
    e.preventDefault();
    const source = document.getElementById('loci-items');
    if (draggedElement) {
        // Remove has-item class from previous room
        const prevRoom = draggedElement.closest('.palace-room');
        if (prevRoom) prevRoom.classList.remove('has-item');
        source.appendChild(draggedElement);
        source.classList.remove('drag-over');
    }
}

function finishLoci() {
    startRecallTest();
}

// ============================================
// RECALL TEST
// ============================================

function startRecallTest() {
    const inputEl = document.getElementById('recall-input');
    const recalledEl = document.getElementById('recalled-items');
    const countEl = document.getElementById('recall-count');
    const timerEl = document.getElementById('recall-timer');

    recalledEl.innerHTML = '';
    inputEl.value = '';
    countEl.textContent = '0';

    const recalled = new Set();
    let timeLeft = 30;

    timerEl.textContent = timeLeft;

    clearInterval(gameState.recallTimerId);
    gameState.recallTimerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameState.recallTimerId);
            finishRecallTest(recalled);
        }
    }, 1000);

    // Clone input to remove old listeners
    const newInput = inputEl.cloneNode(true);
    inputEl.parentNode.replaceChild(newInput, inputEl);

    newInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const guess = this.value.trim();
            const normalizedGuess = normalizeWord(guess);

            // Check if correct
            const isCorrect = gameState.currentItems.some(item =>
                normalizeWord(item) === normalizedGuess
            );

            // Check if already guessed
            const alreadyGuessed = recalled.has(normalizedGuess);

            if (!alreadyGuessed) {
                const chip = document.createElement('span');
                chip.className = `recalled-item ${isCorrect ? 'correct' : 'wrong'}`;
                chip.textContent = guess;
                recalledEl.appendChild(chip);

                if (isCorrect) {
                    recalled.add(normalizedGuess);
                    countEl.textContent = recalled.size;
                }
            }

            this.value = '';
        }
    });

    showScreen('recall');
    newInput.focus();

    // Store reference for done button
    document.getElementById('btn-recall-done').onclick = () => {
        clearInterval(gameState.recallTimerId);
        finishRecallTest(recalled);
    };
}

function finishRecallTest(recalled) {
    const correct = [];
    const missed = [];

    gameState.currentItems.forEach(item => {
        if (recalled.has(normalizeWord(item))) {
            correct.push(item);
        } else {
            missed.push(item);
        }
    });

    const result = {
        round: gameState.currentRound,
        strategy: gameState.currentStrategy,
        items: [...gameState.currentItems],
        correct: correct,
        missed: missed,
        score: correct.length,
        total: gameState.currentItems.length,
        percentage: Math.round((correct.length / gameState.currentItems.length) * 100)
    };

    gameState.roundResults.push(result);
    showRoundResults(result);
}

// ============================================
// ROUND RESULTS
// ============================================

function showRoundResults(result) {
    document.getElementById('result-round').textContent = result.round;

    // Strategy badge
    const badges = {
        rote: '🔁 Rote Rehearsal',
        chunking: '📦 Chunking',
        mnemonic: '🎵 Mnemonics',
        loci: '🏛️ Method of Loci'
    };
    document.getElementById('result-strategy-badge').textContent = badges[result.strategy];

    // Score
    document.getElementById('result-correct').textContent = result.score;
    document.getElementById('result-total').textContent = result.total;
    document.getElementById('result-percentage').textContent = result.percentage + '%';

    // Percentage bar animation
    setTimeout(() => {
        document.getElementById('result-percentage-fill').style.width = result.percentage + '%';
    }, 100);

    // Items lists
    const rememberedEl = document.getElementById('result-remembered');
    const forgotEl = document.getElementById('result-forgot');

    rememberedEl.innerHTML = result.correct.map(item =>
        `<span class="result-item">${item}</span>`
    ).join('');

    forgotEl.innerHTML = result.missed.map(item =>
        `<span class="result-item">${item}</span>`
    ).join('');

    // Psychology insight
    const insight = STRATEGY_INSIGHTS[result.strategy];
    document.getElementById('psychology-insight').innerHTML = `
        <h4>${insight.title}</h4>
        <p>${insight.text}</p>
    `;

    // Update button text
    const nextBtn = document.getElementById('btn-next-round');
    if (gameState.currentRound >= 5) {
        nextBtn.innerHTML = 'Final Exam <span class="btn-arrow">→</span>';
        nextBtn.onclick = startFinalExam;
    } else {
        nextBtn.innerHTML = 'Next Round <span class="btn-arrow">→</span>';
        nextBtn.onclick = startRound;
    }

    // Reset percentage bar for animation
    document.getElementById('result-percentage-fill').style.width = '0%';

    showScreen('roundResults');
}

// ============================================
// FINAL EXAM
// ============================================

function startFinalExam() {
    const inputEl = document.getElementById('exam-input');
    const recalledEl = document.getElementById('exam-recalled');
    const countEl = document.getElementById('exam-count');
    const totalEl = document.getElementById('exam-total');
    const timerEl = document.getElementById('exam-timer');

    recalledEl.innerHTML = '';
    inputEl.value = '';
    totalEl.textContent = gameState.allItems.length;
    countEl.textContent = '0';

    const recalled = new Set();
    let timeLeft = 60;

    timerEl.textContent = timeLeft;

    clearInterval(gameState.examTimerId);
    gameState.examTimerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameState.examTimerId);
            finishFinalExam(recalled);
        }
    }, 1000);

    // Clone input
    const newInput = inputEl.cloneNode(true);
    inputEl.parentNode.replaceChild(newInput, inputEl);

    newInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const guess = this.value.trim();
            const normalizedGuess = normalizeWord(guess);

            const isCorrect = gameState.allItems.some(item =>
                normalizeWord(item) === normalizedGuess
            );

            const alreadyGuessed = recalled.has(normalizedGuess);

            if (!alreadyGuessed) {
                const chip = document.createElement('span');
                chip.className = `recalled-item ${isCorrect ? 'correct' : 'wrong'}`;
                chip.textContent = guess;
                recalledEl.appendChild(chip);

                if (isCorrect) {
                    recalled.add(normalizedGuess);
                    countEl.textContent = recalled.size;
                }
            }

            this.value = '';
        }
    });

    showScreen('finalExam');
    newInput.focus();

    document.getElementById('btn-exam-done').onclick = () => {
        clearInterval(gameState.examTimerId);
        finishFinalExam(recalled);
    };
}

function finishFinalExam(recalled) {
    // Calculate which items from each strategy were remembered
    const strategyLongTerm = {};

    gameState.roundResults.forEach(result => {
        const strategy = result.strategy;
        if (!strategyLongTerm[strategy]) {
            strategyLongTerm[strategy] = { recalled: 0, total: 0 };
        }

        result.items.forEach(item => {
            strategyLongTerm[strategy].total++;
            if (recalled.has(normalizeWord(item))) {
                strategyLongTerm[strategy].recalled++;
            }
        });
    });

    showFinalResults(strategyLongTerm);
}

// ============================================
// FINAL RESULTS
// ============================================

function showFinalResults(longTermResults) {
    const strategies = ['rote', 'chunking', 'mnemonic', 'loci'];
    let bestStrategy = null;
    let bestScore = -1;

    strategies.forEach(strategy => {
        // Immediate recall
        const roundResult = gameState.roundResults.find(r => r.strategy === strategy);
        const immediateEl = document.getElementById(`final-${strategy}-immediate`);

        if (roundResult) {
            immediateEl.textContent = `${roundResult.percentage}%`;
        } else {
            immediateEl.textContent = 'Not used';
        }

        // Long-term recall
        const longTermEl = document.getElementById(`final-${strategy}-longterm`);
        const lt = longTermResults[strategy];

        if (lt && lt.total > 0) {
            const ltPercent = Math.round((lt.recalled / lt.total) * 100);
            longTermEl.textContent = `${ltPercent}%`;

            // Track best
            if (ltPercent > bestScore) {
                bestScore = ltPercent;
                bestStrategy = strategy;
            }
        } else {
            longTermEl.textContent = 'Not used';
        }
    });

    // Show best strategy
    const bestEl = document.getElementById('best-strategy');
    if (bestStrategy) {
        const strategyNames = {
            rote: '🔁 Rote Rehearsal',
            chunking: '📦 Chunking',
            mnemonic: '🎵 Mnemonics',
            loci: '🏛️ Method of Loci'
        };

        bestEl.innerHTML = `
            <h3>🏆 Your Best Strategy</h3>
            <p><strong>${strategyNames[bestStrategy]}</strong> gave you the best long-term retention (${bestScore}%). Consider using this technique when studying for real exams!</p>
        `;
    }

    showScreen('finalResults');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Start button
document.getElementById('btn-start').addEventListener('click', startGame);

// Strategy selection
document.querySelectorAll('.strategy-card').forEach(card => {
    card.addEventListener('click', () => {
        selectStrategy(card.dataset.strategy);
    });
});

// Strategy completion buttons
document.getElementById('btn-chunking-done').addEventListener('click', finishChunking);
document.getElementById('btn-mnemonic-done').addEventListener('click', finishMnemonic);
document.getElementById('btn-loci-done').addEventListener('click', finishLoci);

// Restart
document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('welcome');
});

// ============================================
// INITIALIZATION
// ============================================

showScreen('welcome');
console.log('🧠 Memory Strategy Simulator loaded!');
