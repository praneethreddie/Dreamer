const API_KEY = 'YOUR_GEMINI_API_KEY';

// Get DOM elements
const dreamForm = document.getElementById('dreamForm');
const dreamDescription = document.getElementById('dreamDescription');
const loadingIndicator = document.getElementById('loadingIndicator');
const interpretation = document.getElementById('interpretation');
const interpretationText = document.getElementById('interpretationText');

// Add emotion button functionality
const emotionTags = document.querySelectorAll('.emotion-tag');

emotionTags.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});

// Update form submission with loading screen
dreamForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading screen
    document.querySelector('.loading-screen').classList.remove('hidden');
    interpretation.classList.add('hidden');
    
    try {
        const result = await analyzeDream(dreamDescription.value);
        displayInterpretation(result);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to analyze dream. Please try again.');
    } finally {
        document.querySelector('.loading-screen').classList.add('hidden');
    }
});

async function analyzeDream(dreamText) {
    // First API call for dream interpretation
    const interpretationResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Analyze this dream and provide interpretation in this format:
                    🔮 Key Symbols:
                    🎯 Main Theme:
                    💭 Emotional Significance:
                    ✨ Possible Meaning:

                    Dream: ${dreamText}`
                }]
            }]
        })
    });

    // Second API call for image prompt generation
    const promptResponse = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Create a detailed image generation prompt for this dream. Make it artistic and dreamlike: ${dreamText}
                    Format: Create a single paragraph, detailed prompt suitable for AI image generation.`
                }]
            }]
        })
    });

    const interpretationData = await interpretationResponse.json();
    const promptData = await promptResponse.json();

    return {
        interpretation: interpretationData.candidates[0].content.parts[0].text,
        imagePrompt: promptData.candidates[0].content.parts[0].text
    };
}

function displayInterpretation(result) {
    interpretation.classList.remove('hidden');
    
    interpretationText.innerHTML = `
        <div class="interpretation-section">
            <div class="dream-summary">
                <span class="dream-date">${new Date().toLocaleDateString()}</span>
                <div class="selected-emotions">
                    ${getSelectedEmotions()}
                </div>
            </div>
            ${result.interpretation.split('\n').map(line => `<p>${line}</p>`).join('')}
        </div>
        
        <div class="ai-tools-section">
            <h3>✨ Visualize Your Dream</h3>
            
            <div class="ai-tool-card">
                <div class="tool-header">
                    <span class="tool-icon">🎨</span>
                    <h4>AI Image Generation Prompt</h4>
                </div>
                <div class="ai-services">
                    <a href="https://www.midjourney.com" target="_blank" class="service-btn">Midjourney</a>
                    <a href="https://labs.openai.com" target="_blank" class="service-btn">DALL-E</a>
                    <a href="https://stability.ai" target="_blank" class="service-btn">Stable Diffusion</a>
                </div>
                <div class="prompt-box">
                    <p class="prompt-text">${result.imagePrompt}</p>
                    <button class="copy-btn" id="copyButton">
                        📋 Copy Prompt
                    </button>
                </div>
            </div>
        </div>
        
        <button class="new-dream-btn" onclick="resetForm()">
            🌟 Interpret Another Dream
        </button>
    `;

    // Add event listener after creating the button
    document.getElementById('copyButton').addEventListener('click', function() {
        const promptText = document.querySelector('.prompt-text').textContent;
        navigator.clipboard.writeText(promptText)
            .then(() => {
                this.innerHTML = '✅ Copied!';
                setTimeout(() => {
                    this.innerHTML = '📋 Copy Prompt';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy prompt. Please try again.');
            });
    });
}

function getSelectedEmotions() {
    const activeEmotions = document.querySelectorAll('.emotion-tag.active');
    return Array.from(activeEmotions)
        .map(emotion => emotion.textContent)
        .join(', ');
}

function resetForm() {
    dreamDescription.value = '';
    document.querySelectorAll('.emotion-tag.active').forEach(tag => {
        tag.classList.remove('active');
    });
    interpretation.classList.add('hidden');
    dreamDescription.focus();
} 