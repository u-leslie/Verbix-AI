import User from '../models/User.js';
import { configureOpenAI } from '../config/openai-config.js';
import { OpenAIApi } from 'openai';
const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 1000; // 1 second
export const generateChatComplete = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: 'User not registered or token malfunction' });
        // Get user chats
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        // Send all chats to OpenAI API
        let retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                const config = configureOpenAI();
                const openai = new OpenAIApi(config);
                const chatResponse = await openai.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages: chats,
                });
                user.chats.push(chatResponse.data.choices[0].message);
                await user.save();
                return res.status(200).json({ chats: user.chats });
            }
            catch (error) {
                if (error.response && error.response.status === 429) {
                    // Rate limit exceeded, retry after a delay
                    retries += 1;
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * Math.pow(2, retries)));
                }
                else {
                    // Handle other errors
                    console.error(error);
                    return res.status(500).json({ message: 'Something went wrong' });
                }
            }
        }
        return res.status(500).json({ message: 'Max retries exceeded' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
//# sourceMappingURL=generateChatCompletion.js.map