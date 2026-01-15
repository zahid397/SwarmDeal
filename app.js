// SwarmDeal - AI Group Buying App
// Vanilla JavaScript Application with Full Mock Interactivity

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
    
    // Feature buttons
    const groupDiscountsBtn = document.getElementById('group-discounts-btn');
    const fastAiMatchingBtn = document.getElementById('fast-ai-matching-btn');
    const verifiedSellersBtn = document.getElementById('verified-sellers-btn');
    
    // Modal elements
    const dealCreationModal = document.getElementById('deal-creation-modal');
    const modalClose = document.getElementById('modal-close');
    const cancelDealBtn = document.getElementById('cancel-deal-btn');
    const submitDealBtn = document.getElementById('submit-deal-btn');
    const dealRequestInput = document.getElementById('deal-request-input');
    
    // Mock deal data
    const mockDeals = [
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
            icon: "headphones",
            joined: false,
            activated: false
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
            icon: "laptop",
            joined: false,
            activated: false
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
            icon: "blender",
            joined: false,
            activated: false
        }
    ];
    
    // App State
    const state = {
        deals: [...mockDeals],
        totalUsers: 142,
        isDarkMode: false,
        currentUserId: 1000,
        featureStates: {
            groupDiscounts: false,
            fastAiMatching: false,
            verifiedSellers: false
        }
    };
    
    // Initialize the app
    function init() {
        renderDeals();
        updateStats();
        setupEventListeners();
        showToast("Welcome to SwarmDeal! Click any button to see it in action.");
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        // Chat functionality
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Demo button
        demoBtn.addEventListener('click', runDemo);
        
        // Toast close
        toastClose.addEventListener('click', hideToast);
        
        // Feature buttons
        groupDiscountsBtn.addEventListener('click', handleGroupDiscounts);
        fastAiMatchingBtn.addEventListener('click', handleFastAiMatching);
        verifiedSellersBtn.addEventListener('click', handleVerifiedSellers);
        
        // Modal functionality
        modalClose.addEventListener('click', closeModal);
        cancelDealBtn.addEventListener('click', closeModal);
        submitDealBtn.addEventListener('click', submitDealRequest);
        
        // Add click listener to deal cards container for event delegation
        dealsContainer.addEventListener('click', handleDealContainerClick);
    }
    
    // Handle clicks in deals container (event delegation)
    function handleDealContainerClick(e) {
        // Handle join deal button clicks
        if (e.target.classList.contains('join-deal') || e.target.closest('.join-deal')) {
            const button = e.target.classList.contains('join-deal') ? e.target : e.target.closest('.join-deal');
            const dealId = parseInt(button.dataset.dealId);
            joinDeal(dealId);
        }
        
        // Handle share button clicks
        if (e.target.classList.contains('share-deal') || e.target.closest('.share-deal')) {
            const button = e.target.classList.contains('share-deal') ? e.target : e.target.closest('.share-deal');
            const dealId = parseInt(button.dataset.dealId);
            shareDeal(dealId);
        }
        
        // Handle deal card clicks (for creating similar deals)
        if (e.target.closest('.deal-card') && !e.target.classList.contains('join-deal') && !e.target.closest('.join-deal') && !e.target.classList.contains('share-deal') && !e.target.closest('.share-deal')) {
            const dealCard = e.target.closest('.deal-card');
            const dealId = parseInt(dealCard.dataset.dealId);
            const deal = state.deals.find(d => d.id === dealId);
            
            if (deal) {
                showToast(`Interested in ${deal.productName}? Click "Join Swarm" to get the discount!`);
            }
        }
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
        const isActivated = deal.progress >= deal.required;
        
        const dealCard = document.createElement('div');
        dealCard.className = `deal-card ${deal.featured ? 'featured' : ''} ${isActivated ? 'activated' : ''}`;
        dealCard.dataset.dealId = deal.id;
        
        dealCard.innerHTML = `
            <div class="deal-badge ${isActivated ? 'activated' : ''}">${isActivated ? 'ACTIVATED' : 'HOT DEAL'}</div>
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
                        <div class="progress-fill ${isActivated ? 'activated' : ''}" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                
                <div class="deal-pricing">
                    <div class="original-price">$${deal.originalPrice.toFixed(2)}</div>
                    <div class="current-price">$${deal.currentPrice.toFixed(2)}<span class="price-note">/unit</span></div>
                    <div class="discount-badge">${deal.discount}% OFF</div>
                </div>
                
                <div class="deal-actions">
                    <button class="btn-primary join-deal ${deal.joined ? 'joined' : ''}" data-deal-id="${deal.id}">
                        <i class="fas fa-user-plus"></i> ${deal.joined ? 'Joined!' : 'Join Swarm'}
                    </button>
                    <button class="btn-secondary share-deal" data-deal-id="${deal.id}">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `;
        
        return dealCard;
    }
    
    // Handle Group Discounts feature
    function handleGroupDiscounts() {
        const featureElement = groupDiscountsBtn;
        
        // Toggle active state
        state.featureStates.groupDiscounts = !state.featureStates.groupDiscounts;
        featureElement.classList.toggle('active', state.featureStates.groupDiscounts);
        
        // Show feedback
        showToast(state.featureStates.groupDiscounts 
            ? "Group discounts activated! You'll see special pricing as more people join." 
            : "Group discounts deactivated");
        
        // Simulate async operation
        simulateAsyncOperation(() => {
            // Add AI message explaining group discounts
            addAIMessage("Group discounts work by pooling buyer demand. The more people join a deal, the lower the price gets for everyone! Currently, deals can reach up to 60% off retail prices.");
            
            // If active, show special badge on all deals
            if (state.featureStates.groupDiscounts) {
                document.querySelectorAll('.deal-card').forEach(card => {
                    card.classList.add('featured');
                });
            } else {
                document.querySelectorAll('.deal-card').forEach((card, index) => {
                    if (index !== 0) card.classList.remove('featured');
                });
            }
        });
    }
    
    // Handle Fast AI Matching feature
    function handleFastAiMatching() {
        const featureElement = fastAiMatchingBtn;
        
        // Toggle active state
        state.featureStates.fastAiMatching = !state.featureStates.fastAiMatching;
        featureElement.classList.toggle('active', state.featureStates.fastAiMatching);
        
        // Show feedback
        showToast(state.featureStates.fastAiMatching 
            ? "Fast AI Matching activated! Finding the best deals for you..." 
            : "Fast AI Matching deactivated");
        
        // Simulate async operation with longer delay
        simulateAsyncOperation(() => {
            // Show typing indicator
            showTypingIndicator();
            
            // Add AI message after delay
            setTimeout(() => {
                hideTypingIndicator();
                
                // Create mock deal based on user history
                const mockDealTypes = [
                    "wireless earbuds with noise cancellation",
                    "ergonomic office chair",
                    "smart home security camera",
                    "fitness tracker with heart rate monitor",
                    "portable power bank 20000mAh"
                ];
                
                const randomDealType = mockDealTypes[Math.floor(Math.random() * mockDealTypes.length)];
                const mockPrice = (Math.random() * 200 + 50).toFixed(2);
                const mockDiscount = Math.floor(Math.random() * 30 + 20);
                
                addAIMessage(`Using Fast AI Matching, I've found an excellent deal on ${randomDealType}! The AI predicts you'll save ~${mockDiscount}% compared to retail. Should I create a swarm deal for this?`);
                
                // Ask user if they want to create a deal
                setTimeout(() => {
                    addUserMessage(`Yes, create a deal for ${randomDealType}`);
                    setTimeout(() => {
                        addAIMessage(`Perfect! I've created a swarm deal for ${randomDealType}. It will appear in the deals panel once enough people show interest.`);
                        
                        // Create a new deal
                        const newDealId = state.deals.length + 1;
                        const newDeal = {
                            id: newDealId,
                            productName: `${randomDealType.charAt(0).toUpperCase() + randomDealType.slice(1)}`,
                            description: "High-quality product found using AI matching",
                            originalPrice: parseFloat(mockPrice) * 1.5,
                            currentPrice: parseFloat(mockPrice),
                            discount: mockDiscount,
                            progress: Math.floor(Math.random() * 5 + 1),
                            required: Math.floor(Math.random() * 15 + 10),
                            featured: true,
                            color: getRandomColor(),
                            icon: getRandomIcon(randomDealType),
                            joined: false,
                            activated: false
                        };
                        
                        state.deals.unshift(newDeal);
                        renderDeals();
                        updateStats();
                        
                        // Show notification
                        setTimeout(() => {
                            showToast(`New deal created: ${newDeal.productName}!`);
                        }, 500);
                    }, 1000);
                }, 2000);
            }, 2000);
        }, 1000);
    }
    
    // Handle Verified Sellers feature
    function handleVerifiedSellers() {
        const featureElement = verifiedSellersBtn;
        
        // Toggle active state
        state.featureStates.verifiedSellers = !state.featureStates.verifiedSellers;
        featureElement.classList.toggle('active', state.featureStates.verifiedSellers);
        
        // Show feedback
        showToast(state.featureStates.verifiedSellers 
            ? "Verified Sellers filter activated! Only showing deals from trusted suppliers." 
            : "Verified Sellers filter deactivated");
        
        // Simulate async operation
        simulateAsyncOperation(() => {
            // Add AI message explaining verified sellers
            addAIMessage("Verified sellers are suppliers who have passed our quality and reliability checks. All deals marked with the verified badge come with buyer protection and guaranteed satisfaction.");
            
            // If active, mark all deals as from verified sellers (visual feedback)
            if (state.featureStates.verifiedSellers) {
                document.querySelectorAll('.deal-card').forEach(card => {
                    const badge = card.querySelector('.deal-badge');
                    if (badge && !badge.classList.contains('activated')) {
                        badge.innerHTML = '<i class="fas fa-shield-alt"></i> VERIFIED';
                        badge.style.background = "linear-gradient(90deg, #06d6a0, #06a078)";
                    }
                });
            } else {
                // Reset badges
                renderDeals();
            }
        });
    }
    
    // Join a deal
    function joinDeal(dealId) {
        const deal = state.deals.find(d => d.id === dealId);
        
        if (deal && !deal.joined) {
            // Update deal state
            deal.progress += 1;
            deal.joined = true;
            state.totalUsers += 1;
            
            // Check if deal is now activated
            if (deal.progress >= deal.required && !deal.activated) {
                deal.activated = true;
                showToast(`🎉 Deal unlocked! ${deal.productName} is now available at the discounted price.`);
                
                // Add celebration effect
                const dealCard = document.querySelector(`.deal-card[data-deal-id="${dealId}"]`);
                if (dealCard) {
                    dealCard.classList.add('activated');
                }
            } else {
                showToast(`You joined the swarm for ${deal.productName}! ${deal.required - deal.progress} more needed to activate.`);
            }
            
            // Update UI
            renderDeals();
            updateStats();
            
            // Add user message to chat
            addUserMessage(`I just joined the ${deal.productName} swarm deal!`);
            
            // Simulate AI response
            setTimeout(() => {
                addAIMessage(`Great! You're now part of the ${deal.productName} swarm. The price drops as more people join. Share with friends to unlock it faster!`);
            }, 1000);
        } else if (deal && deal.joined) {
            showToast(`You've already joined the ${deal.productName} swarm!`);
        }
    }
    
    // Share a deal
    function shareDeal(dealId) {
        const deal = state.deals.find(d => d.id === dealId);
        
        if (deal) {
            showToast(`Sharing ${deal.productName} deal with friends...`);
            
            // Simulate sharing delay
            simulateAsyncOperation(() => {
                showToast(`${deal.productName} deal shared successfully! Invite link copied to clipboard.`);
                
                // Add small visual feedback
                const shareBtn = document.querySelector(`.share-deal[data-deal-id="${dealId}"]`);
                if (shareBtn) {
                    const originalHTML = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<i class="fas fa-check"></i>';
                    shareBtn.style.backgroundColor = "var(--success)";
                    
                    setTimeout(() => {
                        shareBtn.innerHTML = originalHTML;
                        shareBtn.style.backgroundColor = "";
                    }, 1500);
                }
            });
        }
    }
    
    // Send a chat message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Add user message
        addUserMessage(text);
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response after delay
        setTimeout(() => {
            hideTypingIndicator();
            
            // Generate AI response based on message content
            const response = generateAIResponse(text);
            addAIMessage(response);
            
            // If message sounds like a product request, offer to create a deal
            if (isProductRequest(text)) {
                setTimeout(() => {
                    addAIMessage(`Would you like me to create a swarm deal for "${text}"? Click the "Create Deal" button above to get started!`);
                }, 1000);
            }
        }, 1500 + Math.random() * 1000);
    }
    
    // Add user message to chat
    function addUserMessage(text) {
        const message = {
            sender: 'user',
            text: text,
            time: 'Just now'
        };
        
        addMessageToChat(message);
    }
    
    // Add AI message to chat
    function addAIMessage(text) {
        const message = {
            sender: 'ai',
            text: text,
            time: 'Just now'
        };
        
        addMessageToChat(message);
    }
    
    // Add message to chat UI
    function addMessageToChat(message) {
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
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate AI response based on user input
    function generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            return "Hello! I'm your AI shopping assistant. Tell me what you're looking for, and I'll find the best group buying deals for you!";
        }
        
        if (lowerMessage.includes('headphone') || lowerMessage.includes('headset') || lowerMessage.includes('earbud')) {
            return "I see you're interested in audio gear! I found a great deal on premium wireless headphones. Check the 'Premium Wireless Headset' deal in the right panel - it's already 31% off with 18 people joined!";
        }
        
        if (lowerMessage.includes('laptop') || lowerMessage.includes('computer') || lowerMessage.includes('gaming')) {
            return "For gaming laptops, the RTX 4060 model in our deals section has a 23% discount. We need 8 more people to activate the deal. Want me to add you to the swarm?";
        }
        
        if (lowerMessage.includes('air fryer') || lowerMessage.includes('oven') || lowerMessage.includes('cook')) {
            return "The 6-in-1 Air Fryer Oven deal is almost activated! Only 6 more people needed. It's currently 33% off retail price.";
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('discount') || lowerMessage.includes('save')) {
            return "Swarm deals typically save 20-60% compared to retail. The discount increases as more people join the same deal. Our current deals range from 23% to 33% off!";
        }
        
        if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
            return "SwarmDeal works by pooling buyer demand: 1) You request a product 2) AI finds the best supplier 3) People join the swarm 4) Price drops as swarm grows 5) Deal activates at target count 6) Everyone gets the discount!";
        }
        
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Let me know if you need help finding any specific products or have questions about how swarm deals work.";
        }
        
        // Default response for product requests
        if (isProductRequest(userMessage)) {
            return `I'll search for the best group buying deals on "${userMessage}". This usually takes 1-2 minutes while I negotiate with suppliers. In the meantime, check out our active deals on the right!`;
        }
        
        // Generic helpful response
        const genericResponses = [
            "I can help you find great group buying deals! Try being specific about what you want (brand, features, budget) for better results.",
            "Check out the active deals on the right - they're all available at swarm discounts right now!",
            "You can use the Fast AI Matching feature to quickly find deals tailored to your preferences.",
            "The more people who join a deal, the lower the price gets for everyone. It's like bulk buying with strangers!"
        ];
        
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
    
    // Check if message is a product request
    function isProductRequest(message) {
        const productIndicators = ['buy', 'looking for', 'need', 'want', 'searching for', 'find me', 'get me'];
        const lowerMessage = message.toLowerCase();
        
        return productIndicators.some(indicator => lowerMessage.includes(indicator)) || 
               lowerMessage.split(' ').length <= 6; // Short messages are often product names
    }
    
    // Run demo sequence
    function runDemo() {
        showToast("Starting demo sequence...");
        
        const demoSteps = [
            () => {
                addUserMessage("Show me how SwarmDeal works");
                setTimeout(() => {
                    addAIMessage("Sure! Let me demonstrate with a quick example. First, let me activate Fast AI Matching...");
                }, 1000);
            },
            () => {
                // Simulate clicking Fast AI Matching
                handleFastAiMatching();
            },
            () => {
                setTimeout(() => {
                    addUserMessage("I need a new smartwatch");
                    setTimeout(() => {
                        showTypingIndicator();
                        setTimeout(() => {
                            hideTypingIndicator();
                            addAIMessage("Found a great deal on fitness smartwatches! Creating a swarm deal now...");
                            
                            // Create a mock smartwatch deal
                            setTimeout(() => {
                                const newDeal = {
                                    id: state.deals.length + 1,
                                    productName: "Fitness Smartwatch Pro",
                                    description: "Heart rate monitor, GPS, 7-day battery, waterproof",
                                    originalPrice: 249.99,
                                    currentPrice: 179.99,
                                    discount: 28,
                                    progress: 3,
                                    required: 15,
                                    featured: true,
                                    color: "#ff006e",
                                    icon: "clock",
                                    joined: false,
                                    activated: false
                                };
                                
                                state.deals.unshift(newDeal);
                                renderDeals();
                                updateStats();
                                
                                showToast("New deal created: Fitness Smartwatch Pro!");
                            }, 1000);
                        }, 2000);
                    }, 1500);
                }, 3000);
            },
            () => {
                setTimeout(() => {
                    // Join the new deal
                    joinDeal(state.deals[0].id);
                }, 2000);
            },
            () => {
                setTimeout(() => {
                    showToast("Demo complete! Try clicking any button to explore more features.");
                }, 2000);
            }
        ];
        
        // Execute demo steps with delays
        demoSteps.forEach((step, index) => {
            setTimeout(step, index * 4000);
        });
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
    
    // Show modal
    function showModal() {
        dealCreationModal.classList.add('show');
        dealRequestInput.focus();
    }
    
    // Close modal
    function closeModal() {
        dealCreationModal.classList.remove('show');
        dealRequestInput.value = '';
    }
    
    // Submit deal request
    function submitDealRequest() {
        const requestText = dealRequestInput.value.trim();
        
        if (!requestText) {
            showToast("Please describe what you're looking for!");
            return;
        }
        
        closeModal();
        showToast("Creating your deal request...");
        
        // Simulate AI processing
        simulateAsyncOperation(() => {
            addUserMessage(`I want to buy: ${requestText}`);
            
            setTimeout(() => {
                showTypingIndicator();
                
                setTimeout(() => {
                    hideTypingIndicator();
                    
                    // Create a mock deal based on request
                    const mockColors = ["#3a86ff", "#8338ec", "#ff006e", "#06d6a0", "#ffbe0b"];
                    const mockIcons = ["shopping-cart", "box", "gift", "tag", "star"];
                    
                    const newDeal = {
                        id: state.deals.length + 1,
                        productName: requestText.charAt(0).toUpperCase() + requestText.slice(1),
                        description: "Custom deal created from your request",
                        originalPrice: (Math.random() * 500 + 50).toFixed(2),
                        currentPrice: (Math.random() * 400 + 30).toFixed(2),
                        discount: Math.floor(Math.random() * 40 + 15),
                        progress: 1,
                        required: Math.floor(Math.random() * 20 + 10),
                        featured: true,
                        color: mockColors[Math.floor(Math.random() * mockColors.length)],
                        icon: mockIcons[Math.floor(Math.random() * mockIcons.length)],
                        joined: true,
                        activated: false
                    };
                    
                    // Calculate discount from prices
                    newDeal.discount = Math.round((1 - (newDeal.currentPrice / newDeal.originalPrice)) * 100);
                    
                    state.deals.unshift(newDeal);
                    state.totalUsers += 1;
                    
                    renderDeals();
                    updateStats();
                    
                    addAIMessage(`Perfect! I've created a swarm deal for "${requestText}". You're the first to join! Share with friends to get the discount faster.`);
                    
                    showToast(`Deal created! You're now part of the ${newDeal.productName} swarm.`);
                }, 1500);
            }, 500);
        });
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
    
    // Simulate async operation with loading state
    function simulateAsyncOperation(callback, delay = 1000) {
        // Could add loading spinner here
        setTimeout(callback, delay);
    }
    
    // Helper function to get random color
    function getRandomColor() {
        const colors = ["#3a86ff", "#8338ec", "#ff006e", "#06d6a0", "#ffbe0b", "#ef476f"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Helper function to get appropriate icon for product type
    function getRandomIcon(productType) {
        if (productType.includes('earbud') || productType.includes('headphone')) return 'headphones';
        if (productType.includes('chair')) return 'chair';
        if (productType.includes('camera')) return 'camera';
        if (productType.includes('fitness') || productType.includes('tracker')) return 'running';
        if (productType.includes('power') || productType.includes('battery')) return 'battery-full';
        return 'shopping-cart';
    }
    
    // Initialize the app
    init();
    
    // Auto-show modal after 3 seconds for first-time users
    setTimeout(() => {
        if (!localStorage.getItem('swarmdeal_visited')) {
            localStorage.setItem('swarmdeal_visited', 'true');
            showModal();
        }
    }, 3000);
});
