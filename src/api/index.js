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
            const rawChunk = chunk
                .replace(/\n{3,}/g, "\n") // 3 or more → one newline
                .replace(/\n\n/g, "") // exactly 2 → remove
                .replace(/data:/g, "");
            console.log({ chunk, rawChunk });
            onChunk(rawChunk);
        }
    }
};

export const ingestAPi = async formData => {
    const res = await fetch("http://localhost:4000/api/ingest", {
        method: "POST",
        body: formData,
    });

    const json = await res.json();

    return json;
};
