class TrippinOnCatsApp {
    constructor() {
        this.banList = new Set();
        this.history = [];
        this.currentCat = null;
        this.isLoading = false;
        this.retryCount = 0;
        this.attributeOrder = [
            { key: 'breed', label: 'Breed' },
            { key: 'weight', label: 'Weight' },
            { key: 'origin', label: 'Origin' },
            { key: 'lifeSpan', label: 'Life Span' }
        ];
        this.initializeElements();
        this.bindEvents();
        this.loadInitialCat();
    }

    initializeElements() {
        this.discoverBtn = document.getElementById('discoverBtn');
        this.catName = document.getElementById('catName');
        this.catAttributes = document.getElementById('catAttributes');
        this.catImage = document.getElementById('catImage');
        this.historyList = document.getElementById('historyList');
        this.banListElement = document.getElementById('banList');
        this.loadingOverlay = document.getElementById('loading');
    }

    bindEvents() {
        this.discoverBtn.addEventListener('click', () => this.discoverNewCat());
    }

    async loadInitialCat() {
        await this.discoverNewCat();
    }

    async discoverNewCat() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.showLoading();
        this.discoverBtn.disabled = true;
        try {
            const cat = await this.fetchRandomCat();
            if (this.isCatBanned(cat)) {
                if (this.retryCount < 8) {
                    this.retryCount++;
                    await this.discoverNewCat();
                    return;
                }
            }
            this.displayCat(cat);
            this.addToHistory(cat);
            this.retryCount = 0;
        } catch (error) {
            this.showError('Failed to load cat. Please try again.');
        } finally {
            this.isLoading = false;
            this.hideLoading();
            this.discoverBtn.disabled = false;
        }
    }

    async fetchRandomCat() {
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        if (!response.ok) throw new Error('API error');
        const breeds = await response.json();
        const availableBreeds = breeds.filter(breed => !this.isBreedBanned(breed));
        if (availableBreeds.length === 0) throw new Error('No available breeds after filtering');
        const randomBreed = availableBreeds[Math.floor(Math.random() * availableBreeds.length)];
        const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&limit=1`);
        const imageData = await imageResponse.json();
        return {
            name: randomBreed.name,
            breed: randomBreed.name,
            weight: randomBreed.weight?.metric ? `${randomBreed.weight.metric} lbs` : 'Unknown',
            origin: randomBreed.origin || 'Unknown',
            lifeSpan: randomBreed.life_span ? `${randomBreed.life_span} years` : 'Unknown',
            imageUrl: imageData[0]?.url || 'https://via.placeholder.com/400x300?text=Cat+Image',
            description: randomBreed.description || '',
        };
    }

    isBreedBanned(breed) {
        const values = [
            breed.name?.toLowerCase(),
            breed.weight?.metric ? `${breed.weight.metric} lbs`.toLowerCase() : '',
            breed.origin?.toLowerCase(),
            breed.life_span ? `${breed.life_span} years`.toLowerCase() : ''
        ];
        return values.some(val => this.banList.has(val));
    }
    isCatBanned(cat) {
        const values = [
            cat.breed?.toLowerCase(),
            cat.weight?.toLowerCase(),
            cat.origin?.toLowerCase(),
            cat.lifeSpan?.toLowerCase()
        ];
        return values.some(val => this.banList.has(val));
    }

    displayCat(cat) {
        this.currentCat = cat;
        this.catName.textContent = cat.name;
        this.renderAttributeButtons(cat);
        this.catImage.src = cat.imageUrl;
        this.catImage.alt = cat.name;
    }

    renderAttributeButtons(cat) {
        this.catAttributes.innerHTML = '';
        this.attributeOrder.forEach(attr => {
            let value = cat[attr.key] || 'Unknown';
            const normalized = value.toLowerCase();
            const btn = document.createElement('button');
            btn.className = 'attr-btn' + (this.banList.has(normalized) ? ' banned' : '');
            btn.textContent = value;
            btn.onclick = () => this.toggleBan(normalized);
            this.catAttributes.appendChild(btn);
        });
    }

    toggleBan(value) {
        if (this.banList.has(value)) {
            this.banList.delete(value);
        } else {
            this.banList.add(value);
        }
        this.renderAttributeButtons(this.currentCat);
        this.renderBanList();
    }

    renderBanList() {
        this.banListElement.innerHTML = '';
        if (this.banList.size === 0) {
            this.banListElement.innerHTML = '<span style="color:#888;font-style:italic;">No banned attributes yet</span>';
            return;
        }
        this.banList.forEach(value => {
            const pill = document.createElement('button');
            pill.className = 'ban-pill';
            pill.textContent = value;
            pill.onclick = () => this.toggleBan(value);
            this.banListElement.appendChild(pill);
        });
    }

    addToHistory(cat) {
        this.history.unshift(cat);
        if (this.history.length > 10) this.history = this.history.slice(0, 10);
        this.renderHistory();
    }

    renderHistory() {
        this.historyList.innerHTML = '';
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<span style="color:#888;font-style:italic;">No discoveries yet</span>';
            return;
        }
        this.history.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'history-item';
            const img = document.createElement('img');
            img.src = cat.imageUrl;
            img.alt = cat.name;
            const desc = document.createElement('span');
            desc.textContent = `A ${cat.breed} cat from ${cat.origin}`;
            item.appendChild(img);
            item.appendChild(desc);
            this.historyList.appendChild(item);
        });
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }
    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }
    showError(message) {
        this.hideLoading();
        alert(message);
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TrippinOnCatsApp();
}); 