# AI Chat: Innovative AI-powered chat interface

Welcome to AI Chat, an application that brings the power of multiple AI providers to your fingertips. Engage in dynamic and interactive conversations.

## 🌟 Features

- **Multi-Provider Support**: Seamlessly switch between OpenAI, Google, and Anthropic AI models.
- **Sleek UI**: A modern, responsive interface powered by Next.js and Tailwind CSS.
- **Tool calls**: Specific tools called by the model to perform a specific task
- **Real-time Conversations**: Natural language interactions with AI.
- **Historical Chat Access**: Access previous chats and messages.
- **Secure Authentication**: Powered by Supabase for robust user management.
- **Secure Key Storage**: We never store your keys.

## 🚀 Deployed
Deployed on Vercel. Below are deployed links:
- [Main link](https://ai-chat-interface-sinan.vercel.app)
- [AI with tool calls](https://ai-chat-interface-git-tools-sinan-talha-kosars-projects.vercel.app/?_vercel_share=ocMKt7tWKS5dmGZEgmLvom2EuLZ9Md9K)

> [!NOTE]
> AI with tool calls link: There needs to be some hacky solutions made to get the tool calls to work, which breaks main flow. So I decided to have it on a different branch and link.

## ⚡ Quick Start

1. Clone the repo and run `npm install` to install the dependencies.
2. Create a Supabase project and setup the `.env.local` file with your project's URL and ANON key.
3. Create public.charts and public.messages tables in your supabase project.
4. Add below RLS policies to your messages and charts tables:
```
Table: public.chats
    Policy: UPDATE
    Allow updates for authenticated users

    Policy: DELETE
    Enable delete for users based on user_id


    Policy: INSERT
    Enable insert for users based on user_id


    Policy: SELECT
    Enable users to view their own data only


Table: public.messages
    Policy: DELETE
    allow delete from all


    Policy: INSERT
    Enable insert for authenticated users only


    Policy: SELECT
    Enable read access for all users
```
5. Get a Gemini API key (free) and add it to your `.env.local` file (to summarize chat): (https://aistudio.google.com/app/u/1/apikey)
```
GOOGLE_GENERATIVE_AI_API_KEY=[INSERT GEMINI API KEY]
```
6. Run the app with `npm run dev`. The project should be running on [localhost:3000](http://localhost:3000/).


## 🛠️ Technologies

- Next.js
- React
- Supabase
- Tailwind CSS
- TypeScript
- Vercel AI SDK (OpenAI, Google, Anthropic)
- shadcn/ui
## 🎨 Customization

Tailor the app to your needs:

1. **AI Providers**: Add or modify providers in the `get/map.*Provider.*.ts` files under `utils/` folder.
2. **Styling**: Add/Customize the UI components in the `components/ui` directory. By running `npm run add-component <component-name>` in shadcn/ui.
3. **Environment Variables**: Set up your API keys and configurations in the `.env.local` file.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/) for authentication and database services.
- [Vercel](https://vercel.com/) for hosting and deployment.
- All the amazing open-source libraries that made this project possible.

Embark on your AI conversation today with AI Chat!