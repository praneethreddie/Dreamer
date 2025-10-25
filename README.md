# Dreamer 🌙✨

A dream interpretation tool that analyzes your dreams using Google Gemini API and generates image prompts for visualization.

## Overview

Dreamer is an innovative application that helps you understand your dreams better by:
- Interpreting the symbolism and meaning behind your dreams
- Providing psychological insights into your subconscious mind
- Generating detailed image prompts that you can use with AI art generators to visualize your dreams

## Experience it on https://dremer.vercel.app/

## Features

- 🧠 **Dream Analysis**: Get detailed interpretations of your dreams using Google Gemini's advanced AI
- 🎨 **Image Prompt Generation**: Receive carefully crafted prompts for AI art tools
- 💭 **Symbolic Understanding**: Explore the deeper meaning of dream symbols and themes
- 📝 **Dream Journal**: Save and track your dreams and their interpretations
- 🖼️ **Visualization Support**: Compatible with popular AI art tools like:
  - DALL-E
  - Midjourney
  - ChatGPT with DALL-E

## Installation

```bash
# Clone the repository
git clone https://github.com/praneethreddie/dreamer.git

# Navigate to project directory
cd dreamer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

## Configuration

1. Create a `.env` file in the root directory
2. Add your Google Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

## Usage

1. Start the application:
```bash
npm start
```

2. Enter your dream description when prompted

3. Receive:
   - Detailed dream interpretation
   - Psychological analysis
   - Generated image prompt

4. Use the generated prompt with your preferred AI art generator to visualize your dream

## Example

```javascript
Input: "I dreamt of flying over a purple ocean under a golden sky"

Output:
{
  "interpretation": "Flying represents freedom and transcendence...",
  "imagePrompt": "Surreal landscape with vast purple ocean stretching to horizon, 
                  golden ethereal sky with wispy clouds, perspective from above, 
                  dreamlike atmosphere, soft lighting, digital art style..."
}
```

## Dependencies

- Node.js >= 16.x
- Google Gemini API
- Express.js
- dotenv

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Google Gemini API for dream interpretation
- AI art communities for inspiration
- Dream psychology resources and research

## Support

For support, questions, or feature requests, please:
- Open an issue
- Contact: praneethreddyvallem@email.com

## Future Plans

- Multiple language support
- Dream pattern analysis over time
- Integration with more AI art platforms
- Mobile app development
- Community features for sharing interpretations
