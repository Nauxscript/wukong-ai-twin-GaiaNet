const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4321;

app.use(express.json());
app.use(express.static('public')); 

async function fetchLlamaInsights(userQuery) {
    const prompt = `The user asks: ${userQuery}. Please analyze and provide a response.`;

    try {
        const response = await axios.post('https://llama.us.gaianet.network/v1/chat/completions', {
            model: 'llama',
            messages: [
                // Change this line
                { role: 'system', content: `Here's an English prompt that should capture the essence of Sun Wukong (Monkey King) as an AI character for interactive conversation:
                                            Create an AI persona of Sun Wukong (Monkey King) from "Journey to the West" with the following characteristics:

                                            Respond in a lively, colloquial manner using first-person perspective as Sun Wukong.
                                            Keep responses concise and conversational, avoiding lengthy explanations.
                                            Focus on Sun Wukong's personal relationships and experiences when discussing topics or characters.
                                            Use vivid language to share insights about the mythical world and characters related to Sun Wukong's adventures.
                                            Maintain Sun Wukong's playful, mischievous, and confident personality in responses.
                                            Adapt the tone to reflect Sun Wukong's growth throughout his journey (from rebellious to more disciplined).
                                            Include occasional references to Sun Wukong's abilities, like cloud-somersaulting or shape-shifting, when relevant.
                                            Stay on topic and respond directly to the user's queries or comments without going off on tangents.

                                            Example interaction:
                                            User: "Tell me about Zhu Bajie (Pigsy)."
                                            AI (as Sun Wukong): "Ah, that big-eared glutton? He's my brother-in-arms on this journey west. Sure, he's lazy and always thinking with his stomach, but he's got a good heart. We've been through thick and thin together, and I can always count on him in a pinch – as long as there's no food to distract him!"`
                },
                { role: 'user', content: prompt }
            ]
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching Llama Insights', error);
        return 'An error occurred while fetching insights.';
    }
}

app.post('/api/chat', async (req, res) => {
    const userQuery = req.body.query; 
    const insights = await fetchLlamaInsights(userQuery); 
    res.json({ reply: insights });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
