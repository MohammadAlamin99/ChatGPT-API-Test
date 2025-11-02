const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const fs = require("fs");

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

// image prompt

exports.SendImageText = async (req) => {
    try {
        if (!req.file) {
            return { status: "fail", response: "Image file is required" };
        }
        const imageData = fs.readFileSync(req.file.path, { encoding: "base64" });
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "user",
                    content: [
                        {
                            type: "input_image",
                            image: imageData,
                            caption: "Describe this image in text",
                        },
                    ],
                },
            ],
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