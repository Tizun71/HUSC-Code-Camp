export const useAgent = () => {
    return {
        chat: async (message: string, chatHistory: any[] = []) => {
            try {
                const response = await fetch('/api/agent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message,
                        chatHistory,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to get response from agent');
                }

                const data = await response.json();
                return data.response;
            } catch (error) {
                console.error('Error in useAgent.chat:', error);
                throw error;
            }
        }
    }
}
