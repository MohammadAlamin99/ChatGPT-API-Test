const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.SendText = async (req) => {
    const { prompt } = req.body;
    if (!prompt) return { status: "fail", response: "Prompt is required" };

    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: prompt,
        });

        return {
            status: "success",
            response: response.output_text,
        };
    } catch (err) {
        console.error(err);
        return { status: "fail", response: err.message };
    }
};

