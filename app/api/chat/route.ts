import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
//import { OpenAIEmbeddings } from "@langchain/openai"
//import { Chroma } from "@langchain/community/vectorstores/chroma"
//import { ChromaClient } from "chromadb";
import axios from "axios"

//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

//const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY, batchSize: 512, model: "text-embedding-3-small" });
/*
const client = new ChromaClient({
    path: "http://3.217.236.185:8000"
});
*/


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, query, chatId } = await req.json();

    /*
    const collection = await client.getCollection({ name: `opp_${chatId}`, embeddingFunction: undefined as any });

    const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: lastMessage,
    });
    const similaritySearchResults = await collection.query({
        queryEmbeddings: embedding,
        nResults: 2,
    })
    
    */
    
    
    const response = await axios.post(`https://adept-chroma-server.vercel.app/query`, { query, chatId })
    if (response.status !== 200) throw new Error("Failed to get data");

    const results = response.data;
    const context = results?.data?.map((result: any) => result.pageContent)
    

    
    /*
    const vectorStore = new Chroma(embeddings, {
        collectionName: "opp_" + "d732b0f02be44cea99a8b2eef14e4d20",
        url: "http://3.217.236.185:8000", // Optional, will default to this value
        collectionMetadata: {
            "hnsw:space": "cosine",
        }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
    });
    const similaritySearchResults = await vectorStore.similaritySearch(lastMessage || "solicitation", 2);
    */
    //const context = similaritySearchResults.documents.map(doc => doc)
    //console.log(context)


    const result = await streamText({
        model: openai('gpt-3.5-turbo-0125'),
        system: 'You are a helpful assistant. Answer the user question using this context: ' + context.join(', '),
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}