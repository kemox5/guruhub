import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStructuredOutputRunnable } from "langchain/chains/openai_functions";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import dotenv from 'dotenv';


dotenv.config();
const model = new ChatOpenAI({
    maxTokens: -1,
    temperature: 0.9,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
});

export function GenerateRoadmap(req: any, res: any) {

    const jsonSchema = {
        title: "Roadmap",
        description: "personalizing learning roadmap with clear steps",
        type: "object",
        properties: {
            title: { title: "title", description: "Topic Title", type: "string" },
            description: { title: "description", description: "A brief overview of the learning path.", type: "string" },
            prerequisites: {
                title: "prerequisites", description: "List of prerequisites", type: "array", items: {
                    type: "string",
                },
            },
            modules: {
                title: "modules", description: "List of modules", type: "array",
                items: {
                    type: "object",
                    properties: {
                        title: { title: "title", description: "Module Title", type: "string" },
                        duration: { title: "duration", description: "Module duration", type: "string" },
                        objectives: { title: "objectives", description: "Module objectives", type: "string" },
                        resources: {
                            title: "resources", description: "Module resources", type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { title: "title", description: "Resource Title", type: "string" },
                                    type: { title: "type", description: "Resource type", type: "string", enum: ['video', 'article', 'course', 'book'] },
                                    url: { title: "url", description: "Resource url", type: "string" },
                                }
                            },
                        },
                    }
                },
            }
        }
    }


    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            'You are a friendly and knowledgeable AI assistant. When users ask you to help them learn a new topic, you create a personalized learning roadmap with clear steps. Your reponse should be a well-structured and informative roadmap.'
        ],
        [
            "human",
            "I want to learn: {topic}"
        ],
    ]);

    const outputParser = new JsonOutputFunctionsParser();
    const runnable = createStructuredOutputRunnable({
        outputSchema: jsonSchema,
        llm: model,
        prompt,
        outputParser
    });


    runnable.invoke({
        topic: req.body.title
    })
        .then((result) => {
            res.status(200).json({
                'success': true,
                "result": result
            })
        })

        .catch((err) => {
            res.status(500).json({
                'success': false,
                "result": err.message
            })
        });
}








