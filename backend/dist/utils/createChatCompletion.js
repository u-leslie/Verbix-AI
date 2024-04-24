export const createChatCompletion = async (chats) => {
    const maxRetries = 3;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const chatResponse = await openai.post('/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: chats,
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.OPEN_AI_SECRET}`,
                },
            });
            return chatResponse.data;
        }
        catch (error) {
            if (error.response && error.response.status === 429) {
                const waitTime = Math.pow(2, retries) * 1000; // Exponential backoff in seconds
                console.log(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                retries++;
            }
            else {
                throw error; // If it's not a rate limit error, propagate the error
            }
        }
    }
    throw new Error('Max retries reached. Unable to get a successful response.');
};
//# sourceMappingURL=createChatCompletion.js.map