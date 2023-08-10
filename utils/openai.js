export const openai_request_list = async (prompt, key_storage) => {
    try {
        console.log("Getting response from OpenAI...");
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
        });
        const data = await response.json();
        console.log("Retorno da Openai", data.text)
        localStorage.setItem(key_storage, JSON.stringify(data.text))
        const storedEvents = localStorage.getItem(key_storage);

        if (storedEvents) {
            const parsedEvents = JSON.parse(storedEvents);
            console.log("Parsed Events", parsedEvents);
        }
        return data.text
    } catch (error) {
        console.error('Error consulting OpenAI API:', error);
    }
};
