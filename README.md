
# Roadmap Generator

## Objective
Develop a REST API service that leverages LangChain and TypeScript to dynamically generate
personalized learning roadmaps based on a given topic. The service will accept a title as input
and return a detailed learning roadmap in JSON format.

## Run Locally  

- Clone the project  
- Go to the project directory  
- Install dependencies  
~~~bash  
npm install
~~~
- Copy .env.exmaple and rename it to .env
- Add your OPENAI_API_KEY
- Start the server  
~~~bash  
npm run dev
~~~
- Send your request to http://localhost:8000/generate-roadmap

```json
{
    "title": "js"
}
```
