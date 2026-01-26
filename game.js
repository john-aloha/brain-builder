/**
 * Memory Strategy Simulator
 * An educational game where students experience different memory techniques
 */

// ============================================
// GAME DATA - Word Lists for Each Round
// ============================================

// Baseline word lists (randomly selected)
const BASELINE_LISTS = [
    ['Piano', 'Lamp', 'Kite', 'Pillow', 'Bucket', 'Violin', 'Ladder', 'Compass'],
    ['Anchor', 'Balloon', 'Crystal', 'Drum', 'Envelope', 'Fountain', 'Guitar', 'Helmet'],
    ['Igloo', 'Jacket', 'Kettle', 'Lantern', 'Microscope', 'Notebook', 'Orchid', 'Parachute'],
    ['Quilt', 'Rainbow', 'Scissors', 'Telescope', 'Umbrella', 'Volcano', 'Windmill', 'Xylophone'],
    ['Acorn', 'Binoculars', 'Carousel', 'Diamond', 'Escalator', 'Flamingo', 'Gazelle', 'Harmonica']
];

const WORD_LISTS = [
    // Groceries (easy to chunk by category)
    ['Apple', 'Milk', 'Bread', 'Chicken', 'Banana', 'Cheese', 'Rice', 'Eggs'],

    // Random objects (harder to organize)
    ['Clock', 'Feather', 'Hammer', 'Mirror', 'Candle', 'Rope', 'Globe', 'Whistle'],

    // Countries (can group by continent)
    ['Japan', 'Brazil', 'Egypt', 'Canada', 'France', 'India', 'Mexico', 'Sweden'],

    // Abstract concepts (challenging)
    ['Justice', 'Freedom', 'Courage', 'Wisdom', 'Patience', 'Honor', 'Grace', 'Truth'],

    // Animals (can group by type)
    ['Eagle', 'Dolphin', 'Tiger', 'Penguin', 'Elephant', 'Shark', 'Wolf', 'Turtle'],

    // Kitchen items
    ['Spatula', 'Blender', 'Colander', 'Whisk', 'Grater', 'Ladle', 'Tongs', 'Peeler'],

    // Sports equipment
    ['Racket', 'Helmet', 'Whistle', 'Goggles', 'Cleats', 'Paddle', 'Gloves', 'Shuttlecock'],

    // Musical terms
    ['Crescendo', 'Allegro', 'Harmony', 'Tempo', 'Rhythm', 'Melody', 'Cadence', 'Chorus'],

    // Weather phenomena
    ['Thunder', 'Blizzard', 'Cyclone', 'Drought', 'Monsoon', 'Tornado', 'Hailstorm', 'Rainbow'],

    // Emotions
    ['Anxiety', 'Euphoria', 'Nostalgia', 'Serenity', 'Jealousy', 'Gratitude', 'Contempt', 'Awe'],

    // Professions
    ['Architect', 'Botanist', 'Chemist', 'Detective', 'Engineer', 'Florist', 'Geologist', 'Historian'],

    // Celestial objects
    ['Asteroid', 'Nebula', 'Quasar', 'Comet', 'Pulsar', 'Galaxy', 'Meteor', 'Eclipse'],

    // Ocean life
    ['Octopus', 'Starfish', 'Seahorse', 'Jellyfish', 'Lobster', 'Stingray', 'Walrus', 'Coral'],

    // Mythology creatures
    ['Phoenix', 'Griffin', 'Centaur', 'Mermaid', 'Unicorn', 'Dragon', 'Sphinx', 'Pegasus'],

    // Fabrics and materials
    ['Velvet', 'Denim', 'Cashmere', 'Silk', 'Linen', 'Corduroy', 'Flannel', 'Tweed'],

    // Garden plants
    ['Lavender', 'Rosemary', 'Jasmine', 'Marigold', 'Dahlia', 'Petunia', 'Azalea', 'Hibiscus'],

    // Historical periods
    ['Medieval', 'Victorian', 'Byzantine', 'Colonial', 'Baroque', 'Romantic', 'Classical', 'Modern'],

    // Desserts
    ['Tiramisu', 'Baklava', 'Macaron', 'Churros', 'Cannoli', 'Pavlova', 'Gelato', 'Strudel'],

    // Architectural elements
    ['Balcony', 'Turret', 'Archway', 'Pillar', 'Dome', 'Spire', 'Veranda', 'Parapet'],

    // Dance styles
    ['Salsa', 'Waltz', 'Tango', 'Ballet', 'Flamenco', 'Polka', 'Rumba', 'Foxtrot'],

    // Gemstones
    ['Sapphire', 'Emerald', 'Topaz', 'Opal', 'Garnet', 'Amethyst', 'Jade', 'Onyx'],

    // Types of trees
    ['Sequoia', 'Cypress', 'Magnolia', 'Willow', 'Birch', 'Maple', 'Redwood', 'Cedar'],

    // Body systems
    ['Nervous', 'Digestive', 'Muscular', 'Skeletal', 'Lymphatic', 'Endocrine', 'Cardiac', 'Immune'],

    // Art movements
    ['Cubism', 'Surrealism', 'Impressionism', 'Dadaism', 'Minimalism', 'Expressionism', 'Realism', 'Futurism'],

    // Philosophers
    ['Socrates', 'Plato', 'Aristotle', 'Descartes', 'Nietzsche', 'Confucius', 'Kant', 'Spinoza'],

    // Landforms
    ['Peninsula', 'Archipelago', 'Plateau', 'Canyon', 'Delta', 'Fjord', 'Glacier', 'Mesa'],

    // Spices
    ['Cinnamon', 'Turmeric', 'Paprika', 'Cardamom', 'Saffron', 'Cumin', 'Nutmeg', 'Coriander'],

    // Ancient civilizations
    ['Aztec', 'Roman', 'Egyptian', 'Greek', 'Persian', 'Mayan', 'Viking', 'Sumerian'],

    // Psychology terms
    ['Cognition', 'Perception', 'Motivation', 'Emotion', 'Learning', 'Memory', 'Attention', 'Behavior'],

    // Types of clouds
    ['Cumulus', 'Stratus', 'Cirrus', 'Nimbus', 'Altocumulus', 'Cumulonimbus', 'Stratocumulus', 'Altostratus']
];

// Peg words for the Peg System (number-rhyme)
const PEG_WORDS = [
    { number: 1, peg: 'Bun', icon: '🍔' },
    { number: 2, peg: 'Shoe', icon: '👟' },
    { number: 3, peg: 'Tree', icon: '🌳' },
    { number: 4, peg: 'Door', icon: '🚪' },
    { number: 5, peg: 'Hive', icon: '🐝' },
    { number: 6, peg: 'Sticks', icon: '🥢' },
    { number: 7, peg: 'Heaven', icon: '☁️' },
    { number: 8, peg: 'Gate', icon: '🚧' }
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
    },
    story: {
        title: "💡 The Story Method (Narrative Chaining)",
        text: "Creating a story that links items together leverages our brain's natural love of narratives. Humans have passed down knowledge through stories for millennia. The more vivid, absurd, or emotional your story, the better you'll remember the chain of items!"
    },
    visualization: {
        title: "💡 Mental Imagery & Visualization",
        text: "The 'picture superiority effect' shows we remember images far better than words. By creating vivid, exaggerated mental pictures, you engage both verbal and visual memory systems (dual coding theory). Make images bizarre, colorful, and interactive for best results!"
    },
    peg: {
        title: "💡 The Peg System",
        text: "The peg system uses pre-memorized 'hooks' (like number-rhymes: one-bun, two-shoe) to attach new information. It's been used since the 1600s! By visualizing each item interacting with its peg, you create strong, retrievable associations. Great for ordered lists!"
    }
};

// ============================================
// GAME STATE
// ============================================

const gameState = {
    currentRound: 0,
    currentItems: [],
    currentStrategy: null,
    isBaselineRound: false,

    // Word list selection for this game session
    selectedLists: [], // Indices of WORD_LISTS to use this game
    selectedBaselineIndex: 0,

    // Results tracking
    roundResults: [],
    baselineResult: null, // Baseline (no strategy) result
    allItems: [], // All items from all rounds for final exam

    // Strategy-specific data
    roteProgress: 0,
    roteTotalNeeded: 0,
    userMnemonic: '',
    userStory: '',
    userVisualizations: [],

    // Distractor task data
    currentMathProblem: null,
    mathProblemsSolved: 0,

    // Timers
    studyTimerId: null,
    recallTimerId: null,
    examTimerId: null,
    distractorTimerId: null
};

// Number of rounds per game (can try different strategies)
const ROUNDS_PER_GAME = 7;

// Function to randomly select word lists for a game session
function selectRandomLists() {
    // Shuffle all list indices and take ROUNDS_PER_GAME
    const indices = Array.from({ length: WORD_LISTS.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    gameState.selectedLists = indices.slice(0, ROUNDS_PER_GAME);
    gameState.selectedBaselineIndex = Math.floor(Math.random() * BASELINE_LISTS.length);
}

// ============================================
// DOM ELEMENTS
// ============================================

const screens = {
    welcome: document.getElementById('screen-welcome'),
    baselineIntro: document.getElementById('screen-baseline-intro'),
    baselineResults: document.getElementById('screen-baseline-results'),
    roundIntro: document.getElementById('screen-round-intro'),
    strategy: document.getElementById('screen-strategy'),
    rote: document.getElementById('screen-rote'),
    chunking: document.getElementById('screen-chunking'),
    mnemonic: document.getElementById('screen-mnemonic'),
    loci: document.getElementById('screen-loci'),
    story: document.getElementById('screen-story'),
    visualization: document.getElementById('screen-visualization'),
    peg: document.getElementById('screen-peg'),
    distractor: document.getElementById('screen-distractor'),
    recall: document.getElementById('screen-recall'),
    roundResults: document.getElementById('screen-round-results'),
    finalExam: document.getElementById('screen-final-exam'),
    finalResults: document.getElementById('screen-final-results')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    } else {
        console.error('Screen not found:', screenName);
    }
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
    gameState.baselineResult = null;
    gameState.allItems = [];
    gameState.isBaselineRound = true;
    gameState.userStory = '';
    gameState.userVisualizations = [];

    // Select random word lists for this game session
    selectRandomLists();

    // Start with baseline round (no strategy)
    startBaselineRound();
}

// ============================================
// BASELINE ROUND (Control Condition)
// ============================================

function startBaselineRound() {
    gameState.currentItems = [...BASELINE_LISTS[gameState.selectedBaselineIndex]];
    gameState.allItems.push(...gameState.currentItems);
    gameState.currentStrategy = null;
    gameState.isBaselineRound = true;

    showBaselineIntro();
}

function showBaselineIntro() {
    // Display items
    const itemsContainer = document.getElementById('baseline-items-to-memorize');
    itemsContainer.innerHTML = '';

    gameState.currentItems.forEach((item, index) => {
        const chip = document.createElement('span');
        chip.className = 'item-chip';
        chip.textContent = item;
        chip.style.animationDelay = `${index * 0.1}s`;
        itemsContainer.appendChild(chip);
    });

    showScreen('baselineIntro');

    // Start timer
    let timeLeft = 15;
    const timerEl = document.getElementById('baseline-study-timer');
    timerEl.textContent = timeLeft;

    clearInterval(gameState.studyTimerId);
    gameState.studyTimerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameState.studyTimerId);
            // Go directly to recall (no strategy for baseline)
            startRecallTest();
        }
    }, 1000);
}

function startRound() {
    gameState.currentRound++;
    // Use the randomly selected list for this round
    const listIndex = gameState.selectedLists[gameState.currentRound - 1];
    gameState.currentItems = [...WORD_LISTS[listIndex]];
    gameState.allItems.push(...gameState.currentItems);
    gameState.currentStrategy = null;

    showRoundIntro();
}

function showRoundIntro() {
    document.getElementById('round-number').textContent = gameState.currentRound;
    document.getElementById('total-rounds').textContent = ROUNDS_PER_GAME;
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
        case 'story':
            setupStoryExperience();
            break;
        case 'visualization':
            setupVisualizationExperience();
            break;
        case 'peg':
            setupPegExperience();
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
                setTimeout(() => startDistractor(), 500);
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
    startDistractor();
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
    startDistractor();
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
    startDistractor();
}

// ============================================
// STORY METHOD EXPERIENCE
// ============================================

function setupStoryExperience() {
    const itemsEl = document.getElementById('story-items');
    const storyInput = document.getElementById('story-input');

    // Display items in order
    itemsEl.innerHTML = '';
    gameState.currentItems.forEach((item, index) => {
        const chip = document.createElement('span');
        chip.className = 'story-item';
        chip.innerHTML = `<span class="story-number">${index + 1}</span>${item}`;
        itemsEl.appendChild(chip);
    });

    storyInput.value = '';
    storyInput.placeholder = `Create a story linking: ${gameState.currentItems.slice(0, 3).join(', ')}...`;

    showScreen('story');
    storyInput.focus();
}

function finishStory() {
    gameState.userStory = document.getElementById('story-input').value;
    startDistractor();
}

// ============================================
// VISUALIZATION EXPERIENCE
// ============================================

function setupVisualizationExperience() {
    const container = document.getElementById('visualization-items');
    container.innerHTML = '';

    gameState.userVisualizations = [];

    gameState.currentItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'viz-card';
        card.innerHTML = `
            <div class="viz-item-name">${item}</div>
            <input type="text" class="viz-input" data-index="${index}"
                   placeholder="Describe your mental image..." autocomplete="off">
            <p class="viz-hint">Make it vivid, colorful, or absurd!</p>
        `;
        container.appendChild(card);
    });

    showScreen('visualization');
    container.querySelector('.viz-input').focus();
}

function finishVisualization() {
    const inputs = document.querySelectorAll('.viz-input');
    gameState.userVisualizations = Array.from(inputs).map(input => input.value);
    startDistractor();
}

// ============================================
// PEG SYSTEM EXPERIENCE
// ============================================

function setupPegExperience() {
    const container = document.getElementById('peg-pairs');
    container.innerHTML = '';

    gameState.currentItems.forEach((item, index) => {
        const peg = PEG_WORDS[index];
        const card = document.createElement('div');
        card.className = 'peg-card';
        card.innerHTML = `
            <div class="peg-number">${peg.number}</div>
            <div class="peg-word">
                <span class="peg-icon">${peg.icon}</span>
                <span>${peg.peg}</span>
            </div>
            <div class="peg-arrow">+</div>
            <div class="peg-item">${item}</div>
            <input type="text" class="peg-input" data-index="${index}"
                   placeholder="How do they interact?" autocomplete="off">
        `;
        container.appendChild(card);
    });

    showScreen('peg');
    container.querySelector('.peg-input').focus();
}

function finishPeg() {
    startDistractor();
}

// ============================================
// DISTRACTOR TASK
// ============================================

function generateMathProblem() {
    const operations = ['+', '-'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a, b, answer;

    if (op === '+') {
        a = Math.floor(Math.random() * 50) + 10; // 10-59
        b = Math.floor(Math.random() * 40) + 10; // 10-49
        answer = a + b;
    } else {
        a = Math.floor(Math.random() * 50) + 30; // 30-79
        b = Math.floor(Math.random() * 25) + 5;  // 5-29
        answer = a - b;
    }

    return { a, b, op, answer };
}

function startDistractor() {
    gameState.mathProblemsSolved = 0;
    gameState.currentMathProblem = generateMathProblem();

    const problemEl = document.getElementById('math-problem');
    const inputEl = document.getElementById('distractor-input');
    const countEl = document.getElementById('problems-solved');
    const timerEl = document.getElementById('distractor-timer');

    // Display first problem
    const p = gameState.currentMathProblem;
    problemEl.textContent = `${p.a} ${p.op} ${p.b} = ?`;
    inputEl.value = '';
    countEl.textContent = '0';

    let timeLeft = 30;
    timerEl.textContent = timeLeft;

    clearInterval(gameState.distractorTimerId);
    gameState.distractorTimerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameState.distractorTimerId);
            startRecallTest();
        }
    }, 1000);

    // Clone input to remove old listeners
    const newInput = inputEl.cloneNode(true);
    inputEl.parentNode.replaceChild(newInput, inputEl);

    newInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const userAnswer = parseInt(this.value.trim(), 10);

            if (userAnswer === gameState.currentMathProblem.answer) {
                gameState.mathProblemsSolved++;
                countEl.textContent = gameState.mathProblemsSolved;
                this.classList.add('correct');
                setTimeout(() => this.classList.remove('correct'), 200);
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 200);
            }

            // Generate next problem regardless of correctness
            gameState.currentMathProblem = generateMathProblem();
            const p = gameState.currentMathProblem;
            problemEl.textContent = `${p.a} ${p.op} ${p.b} = ?`;
            this.value = '';
        }
    });

    showScreen('distractor');
    newInput.focus();
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
        round: gameState.isBaselineRound ? 0 : gameState.currentRound,
        strategy: gameState.currentStrategy, // null for baseline
        items: [...gameState.currentItems],
        correct: correct,
        missed: missed,
        score: correct.length,
        total: gameState.currentItems.length,
        percentage: Math.round((correct.length / gameState.currentItems.length) * 100)
    };

    if (gameState.isBaselineRound) {
        gameState.baselineResult = result;
        gameState.isBaselineRound = false;
        showBaselineResults(result);
    } else {
        gameState.roundResults.push(result);
        showRoundResults(result);
    }
}

function showBaselineResults(result) {
    document.getElementById('baseline-result-correct').textContent = result.score;
    document.getElementById('baseline-result-total').textContent = result.total;
    document.getElementById('baseline-result-percentage').textContent = result.percentage + '%';

    // Percentage bar animation
    setTimeout(() => {
        document.getElementById('baseline-percentage-fill').style.width = result.percentage + '%';
    }, 100);

    // Items lists
    const rememberedEl = document.getElementById('baseline-result-remembered');
    const forgotEl = document.getElementById('baseline-result-forgot');

    rememberedEl.innerHTML = result.correct.map(item =>
        `<span class="result-item">${item}</span>`
    ).join('');

    forgotEl.innerHTML = result.missed.map(item =>
        `<span class="result-item">${item}</span>`
    ).join('');

    // Reset percentage bar for animation
    document.getElementById('baseline-percentage-fill').style.width = '0%';

    showScreen('baselineResults');
}

function startStrategyRounds() {
    gameState.isBaselineRound = false;
    startRound();
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
        loci: '🏛️ Method of Loci',
        story: '📖 Story Method',
        visualization: '🎨 Visualization',
        peg: '🔢 Peg System'
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
    if (gameState.currentRound >= ROUNDS_PER_GAME) {
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
    const strategyLongTerm = {
        _allRecalled: recalled // Pass all recalled items for baseline calculation
    };

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
    const strategies = ['rote', 'chunking', 'mnemonic', 'loci', 'story', 'visualization', 'peg'];
    let bestStrategy = null;
    let bestScore = -1;

    const strategyNames = {
        rote: '🔁 Rote Rehearsal',
        chunking: '📦 Chunking',
        mnemonic: '🎵 Mnemonics',
        loci: '🏛️ Method of Loci',
        story: '📖 Story Method',
        visualization: '🎨 Visualization',
        peg: '🔢 Peg System'
    };

    // Get baseline percentages for comparison
    const baselineImmediate = gameState.baselineResult ? gameState.baselineResult.percentage : 0;

    // Calculate baseline long-term (items from baseline recalled in final exam)
    let baselineLongTerm = 0;
    if (gameState.baselineResult) {
        const baselineRecalled = gameState.baselineResult.items.filter(item =>
            longTermResults._allRecalled && longTermResults._allRecalled.has(normalizeWord(item))
        ).length;
        baselineLongTerm = Math.round((baselineRecalled / gameState.baselineResult.items.length) * 100);
    }

    // Update baseline display
    document.getElementById('final-baseline-immediate').textContent = `${baselineImmediate}%`;
    document.getElementById('final-baseline-longterm').textContent = `${baselineLongTerm}%`;

    // Build dynamic results grid
    const resultsGrid = document.getElementById('final-results-grid');
    resultsGrid.innerHTML = '';

    // Get strategies that were actually used this game
    const usedStrategies = [...new Set(gameState.roundResults.map(r => r.strategy))];

    usedStrategies.forEach(strategy => {
        const roundResult = gameState.roundResults.find(r => r.strategy === strategy);
        const lt = longTermResults[strategy];

        const immediatePercent = roundResult ? roundResult.percentage : 0;
        const longTermPercent = lt && lt.total > 0 ? Math.round((lt.recalled / lt.total) * 100) : 0;

        const immediateDiff = immediatePercent - baselineImmediate;
        const longTermDiff = longTermPercent - baselineLongTerm;

        // Track best
        if (longTermPercent > bestScore) {
            bestScore = longTermPercent;
            bestStrategy = strategy;
        }

        const card = document.createElement('div');
        card.className = 'strategy-result';
        card.dataset.strategy = strategy;
        card.innerHTML = `
            <div class="strategy-result-header">
                <span class="strategy-icon">${strategyNames[strategy].split(' ')[0]}</span>
                <span>${strategyNames[strategy].substring(2)}</span>
            </div>
            <div class="strategy-scores">
                <div class="score-item">
                    <span class="score-label">Immediate:</span>
                    <span class="score-value">${immediatePercent}%</span>
                    <span class="comparison ${immediateDiff > 0 ? 'positive' : immediateDiff < 0 ? 'negative' : 'neutral'}">${immediateDiff > 0 ? '+' : ''}${immediateDiff}%</span>
                </div>
                <div class="score-item">
                    <span class="score-label">Long-term:</span>
                    <span class="score-value">${longTermPercent}%</span>
                    <span class="comparison ${longTermDiff > 0 ? 'positive' : longTermDiff < 0 ? 'negative' : 'neutral'}">${longTermDiff > 0 ? '+' : ''}${longTermDiff}%</span>
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    });

    // Show best strategy
    const bestEl = document.getElementById('best-strategy');
    if (bestStrategy) {
        const improvement = bestScore - baselineLongTerm;
        bestEl.innerHTML = `
            <h3>🏆 Your Best Strategy</h3>
            <p><strong>${strategyNames[bestStrategy]}</strong> gave you the best long-term retention (${bestScore}%)${improvement > 0 ? `, a ${improvement}% improvement over your baseline!` : '.'} Consider using this technique when studying for real exams!</p>
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
document.getElementById('btn-story-done').addEventListener('click', finishStory);
document.getElementById('btn-visualization-done').addEventListener('click', finishVisualization);
document.getElementById('btn-peg-done').addEventListener('click', finishPeg);

// Restart
document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('welcome');
});

// Continue from baseline to strategy rounds
document.getElementById('btn-continue-strategies').addEventListener('click', startStrategyRounds);

// ============================================
// INITIALIZATION
// ============================================

showScreen('welcome');
console.log('🧠 Memory Strategy Simulator loaded!');
