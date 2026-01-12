// SwarmDeal - AI Group Buying App
// Vanilla JavaScript Application

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const dealsContainer = document.getElementById('deals-container');
    const themeToggle = document.getElementById('theme-toggle');
    const demoBtn = document.getElementById('demo-btn');
    const toast = document.getElementById('toast');
    const toastClose = document.getElementById('toast-close');
    const activeDealsEl = document.getElementById('active-deals');
    const totalUsersEl = document.getElementById('total-users');
    
    // App State
    const state = {
        messages: [
            {
                sender: 'ai',
                text: "Hi! I'm your AI shopping assistant. Tell me what you'd like to buy, and I'll search for the best group buying deals. The more people interested, the lower the price!",
                time: 'Just now'
            },
            {
                sender: 'user',
                text: "I'm looking for a high-quality wireless headset for work",
                time: '2 min ago'
            },
            {
                sender: 'ai',
                text: "Great choice! Let me search for wireless headsets with good microphone quality and noise cancellation.",
                time: '1 min ago'
            }
        ],
        deals: [
            {
                id: 1,
                productName: "Premium Wireless Headset",
                description: "Noise-cancelling microphone, 30hr battery, premium comfort",
                originalPrice: 129.99,
                currentPrice: 89.99,
                discount: 31,
                progress: 18,
                required: 25,
                featured: true,
                color: "#3a86ff",
                icon: "headphones"
            },
            {
                id: 2,
                productName: "Gaming Laptop RTX 4060",
                description: "15.6\" FHD 144Hz, Intel i7, 16GB RAM, 1TB SSD",
                originalPrice: 1299.99,
                currentPrice: 999.99,
                discount: 23,
                progress: 12,
                required: 20,
                featured: false,
                color: "#8338ec",
                icon: "laptop"
            },
            {
                id: 3,
                productName: "6-in-1 Air Fryer Oven",
                description: "Digital touchscreen, 8 presets, family size capacity",
                originalPrice: 179.99,
                currentPrice: 119.99,
                discount: 33,
                progress: 24,
                required: 30,
                featured: false,
                color: "#ff006e",
                icon: "blender"
            }
        ],
        totalUsers: 142,
        isDarkMode: false,
        lastMessageId: 3
    };
    
    // Initialize the app
    function init() {
        renderMessages();
        renderDeals();
        updateStats();
        
        // Event Listeners
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        themeToggle.addEventListener('click', toggleTheme);
        demoBtn.addEventListener('click', runDemo);
        toastClose.addEventListener('click', hideToast);
        
        // Show welcome toast after a delay
        setTimeout(() => {
            showToast("Welcome to SwarmDeal! Try asking for a product like 'yoga mat' or 'gaming console'.");
        }, 1500);
    }
    
    // Render chat messages
    function renderMessages() {
        chatMessages.innerHTML = '';
        
        state.messages.forEach(message => {
            const messageEl = createMessageElement(message);
            chatMessages.appendChild(messageEl);
        });
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Create a message element
    function createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}-message`;
        
        const avatarIcon = message.sender === 'ai' ? 'robot' : 'user';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-sender">${message.sender === 'ai' ? 'SwarmAI' : 'You'}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `;
        
        return messageDiv;
    }
    
    // Send a message
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Add user message to state and UI
        const userMessage = {
            sender: 'user',
            text: text,
            time: 'Just now',
            id: ++state.lastMessageId
        };
        
        state.messages.push(userMessage);
        renderMessages();
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Prepare context (last 5 messages)
        const context = state.messages.slice(-5).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));
        
        try {
            // Simulate AI response for demo
            simulateAIResponse(text, context);
            
            // UNCOMMENT FOR REAL BACKEND INTEGRATION:
            /*
            const response = await fetch('https://swarmdeal.onrender.com/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    address: "guest_user",
                    context: context
                })
            });
            
            const data = await response.json();
            hideTypingIndicator();
            
            // Add AI response
            const aiMessage = {
                sender: 'ai',
                text: data.response,
                time: 'Just now',
                id: ++state.lastMessageId
            };
            
            state.messages.push(aiMessage);
            renderMessages();
            
            // If there's a deal in the response, add it
            if (data.deal) {
                addNewDeal(data.deal);
            }
            */
            
        } catch (error) {
            console.error('Error sending message:', error);
            hideTypingIndicator();
            
            // Show error message
            const errorMessage = {
                sender: 'ai',
                text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
                time: 'Just now',
                id: ++state.lastMessageId
            };
            
            state.messages.push(errorMessage);
            renderMessages();
        }
    }
    
    // Simulate AI response for demo purposes
    function simulateAIResponse(userMessage, context) {
        // Hide typing indicator after a delay
        setTimeout(() => {
            hideTypingIndicator();
            
            // AI responses based on user input
            let aiResponse = "";
            let newDeal = null;
            
            const lowerMessage = userMessage.toLowerCase();
            
            if (lowerMessage.includes('yoga') || lowerMessage.includes('exercise') || lowerMessage.includes('mat')) {
                aiResponse = "I found some great yoga mats with excellent grip and cushioning! I'm negotiating a group buy discount with a premium supplier.";
                newDeal = {
                    productName: "Premium Non-Slip Yoga Mat",
                    description: "Eco-friendly TPE material, 6mm thickness, with alignment lines",
                    originalPrice: 69.99,
                    currentPrice: 39.99,
                    discount: 43,
                    progress: 8,
                    required: 15,
                    featured: true,
                    color: "#06d6a0",
                    icon: "spa"
                };
            } else if (lowerMessage.includes('phone') || lowerMessage.includes('iphone') || lowerMessage.includes('samsung')) {
                aiResponse = "Excellent! I found a great deal on the latest smartphones. The more people join, the bigger the discount!";
                newDeal = {
                    productName: "Flagship Smartphone (Latest Model)",
                    description: "256GB storage, pro camera system, 5G connectivity",
                    originalPrice: 1099.99,
                    currentPrice: 849.99,
                    discount: 23,
                    progress: 5,
                    required: 10,
                    featured: false,
                    color: "#1a1a1a",
                    icon: "mobile-alt"
                };
            } else if (lowerMessage.includes('coffee') || lowerMessage.includes('espresso') || lowerMessage.includes('maker')) {
                aiResponse = "I've located a premium espresso machine with a built-in grinder. Let's see how many people want to join this deal!";
                newDeal = {
                    productName: "Automatic Espresso Machine",
                    description: "15-bar pressure, milk frother, programmable settings",
                    originalPrice: 399.99,
                    currentPrice: 279.99,
                    discount: 30,
                    progress: 11,
                    required: 20,
                    featured: true,
                    color: "#8B4513",
                    icon: "coffee"
                };
            } else if (lowerMessage.includes('watch') || lowerMessage.includes('smartwatch') || lowerMessage.includes('fitness')) {
                aiResponse = "Smartwatches are perfect for group buying! I found a model with heart rate monitoring and GPS.";
                newDeal = {
                    productName: "Fitness Smartwatch",
                    description: "Heart rate monitor, GPS, 7-day battery, waterproof",
                    originalPrice: 249.99,
                    currentPrice: 179.99,
                    discount: 28,
                    progress: 16,
                    required: 25,
                    featured: false,
                    color: "#ff006e",
                    icon: "clock"
                };
            } else if (lowerMessage.includes('book') || lowerMessage.includes('kindle') || lowerMessage.includes('ebook')) {
                aiResponse = "I found a great deal on e-readers! Perfect for book lovers who want to save money.";
                newDeal = {
                    productName: "E-Reader with Backlight",
                    description: "300 PPI, waterproof, 32GB storage, weeks of battery",
                    originalPrice: 149.99,
                    currentPrice: 99.99,
                    discount: 33,
                    progress: 9,
                    required: 15,
                    featured: false,
                    color: "#2a9d8f",
                    icon: "book"
                };
            } else {
                aiResponse = "Thanks for your request! I'm searching for the best group buying deals for \"" + userMessage + "\". This might take a moment...";
                
                // Simulate finding a generic deal
                setTimeout(() => {
                    const genericDeal = {
                        productName: userMessage.charAt(0).toUpperCase() + userMessage.slice(1),
                        description: "High-quality product with great reviews and warranty",
                        originalPrice: 199.99,
                        currentPrice: 149.99,
                        discount: 25,
                        progress: 7,
                        required: 15,
                        featured: false,
                        color: "#3a86ff",
                        icon: "shopping-cart"
                    };
                    
                    addNewDeal(genericDeal);
                    
                    // Second AI message with the deal
                    const secondAIMessage = {
                        sender: 'ai',
                        text: `Great news! I found a deal on "${genericDeal.productName}" with ${genericDeal.discount}% off if we get ${genericDeal.required} people to join. Currently at ${genericDeal.progress} people.`,
                        time: 'Just now',
                        id: ++state.lastMessageId
                    };
                    
                    state.messages.push(secondAIMessage);
                    renderMessages();
                }, 1000);
            }
            
            // Add AI response to state and UI
            const aiMessage = {
                sender: 'ai',
                text: aiResponse,
                time: 'Just now',
                id: ++state.lastMessageId
            };
            
            state.messages.push(aiMessage);
            renderMessages();
            
            // If there's a deal, add it
            if (newDeal) {
                setTimeout(() => {
                    addNewDeal(newDeal);
                }, 500);
            }
            
        }, 1500 + Math.random() * 1000); // Random delay to simulate AI thinking
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // Render all deals
    function renderDeals() {
        dealsContainer.innerHTML = '';
        
        state.deals.forEach(deal => {
            const dealEl = createDealElement(deal);
            dealsContainer.appendChild(dealEl);
        });
    }
    
    // Create a deal card element
    function createDealElement(deal) {
        const progressPercent = Math.round((deal.progress / deal.required) * 100);
        
        const dealCard = document.createElement('div');
        dealCard.className = `deal-card ${deal.featured ? 'featured' : ''}`;
        dealCard.dataset.id = deal.id;
        
        dealCard.innerHTML = `
            ${deal.featured ? '<div class="deal-badge">HOT DEAL</div>' : ''}
            <div class="deal-image" style="background-color: ${deal.color};">
                <i class="fas fa-${deal.icon}"></i>
            </div>
            <div class="deal-content">
                <h3 class="deal-title">${deal.productName}</h3>
                <p class="deal-description">${deal.description}</p>
                
                <div class="deal-progress">
                    <div class="progress-info">
                        <span class="progress-label">Group Progress</span>
                        <span class="progress-value">${deal.progress}/${deal.required}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                
                <div class="deal-pricing">
                    <div class="original-price">$${deal.originalPrice.toFixed(2)}</div>
                    <div class="current-price">$${deal.currentPrice.toFixed(2)}<span class="price-note">/unit</span></div>
                    <div class="discount-badge">${deal.discount}% OFF</div>
                </div>
                
                <div class="deal-actions">
                    <button class="btn-primary join-deal">
                        <i class="fas fa-user-plus"></i> Join Swarm
                    </button>
                    <button class="btn-secondary">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener to join button
        const joinBtn = dealCard.querySelector('.join-deal');
        joinBtn.addEventListener('click', function() {
            joinDeal(deal.id);
        });
        
        return dealCard;
    }
    
    // Add a new deal
    function addNewDeal(dealData) {
        const newDeal = {
            ...dealData,
            id: state.deals.length + 1
        };
        
        state.deals.unshift(newDeal); // Add to beginning
        renderDeals();
        updateStats();
        
        // Show toast notification
        showToast(`New deal found: ${dealData.productName}!`);
        
        // Animate the new deal card
        const newDealCard = document.querySelector(`.deal-card[data-id="${newDeal.id}"]`);
        if (newDealCard) {
            newDealCard.style.animation = 'none';
            setTimeout(() => {
                newDealCard.style.animation = 'slideInRight 0.5s ease-out';
            }, 10);
        }
    }
    
    // Join a deal
    function joinDeal(dealId) {
        const deal = state.deals.find(d => d.id === dealId);
        if (deal) {
            deal.progress += 1;
            state.totalUsers += 1;
            
            // Update UI
            renderDeals();
            updateStats();
            
            // Show success message
            showToast(`You joined the swarm for ${deal.productName}!`);
            
            // If deal is now complete, show special message
            if (deal.progress >= deal.required) {
                setTimeout(() => {
                    showToast(`🎉 Deal unlocked! ${deal.productName} is now available at the discounted price.`);
                }, 1000);
            }
        }
    }
    
    // Update stats display
    function updateStats() {
        activeDealsEl.textContent = state.deals.length;
        totalUsersEl.textContent = state.totalUsers;
    }
    
    // Toggle dark/light theme
    function toggleTheme() {
        state.isDarkMode = !state.isDarkMode;
        
        if (state.isDarkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            showToast("Dark mode activated");
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            showToast("Light mode activated");
        }
    }
    
    // Show a toast notification
    function showToast(message) {
        const toastText = toast.querySelector('.toast-text');
        toastText.textContent = message;
        
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
    }
    
    // Hide the toast
    function hideToast() {
        toast.classList.remove('show');
    }
    
    // Run a demo sequence
    function runDemo() {
        const demoMessages = [
            "Find me a good coffee maker",
            "I need a new fitness tracker",
            "Looking for a portable bluetooth speaker"
        ];
        
        let index = 0;
        
        function typeDemoMessage() {
            if (index < demoMessages.length) {
                chatInput.value = demoMessages[index];
                
                // Simulate sending after a short delay
                setTimeout(() => {
                    sendMessage();
                    index++;
                    
                    // Schedule next message
                    if (index < demoMessages.length) {
                        setTimeout(typeDemoMessage, 3000);
                    }
                }, 500);
            }
        }
        
        typeDemoMessage();
    }
    
    // Initialize the app
    init();
});
