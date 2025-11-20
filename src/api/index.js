export const queryApi = async (query, onChunk) => {
    const response = await fetch("http://localhost:4000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    if (!response.body) {
        throw new Error("ReadableStream not supported!");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const rawChunk = chunk.replace(/^data:\s?/gm, ""); // remove data:

            onChunk(rawChunk); // <-- Send chunk back to UI
        }
    }
};
