import { Client, Databases, Models } from 'react-native-appwrite'

if (!process.env.EXPO_PUBLIC_APPWRITE_APP_ID) {
    throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not set")
}

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_APP_ID;
const BUNDLE_ID = "com.anonymous.aimeditationagent";
const DB_ID = "6901e26d00099b99862a";
const SESSION_TABLE_ID = "session";

const appwriteConfig = {
    endpoint: "https://sfo.cloud.appwrite.io/v1",
    projectId: PROJECT_ID,
    platform: BUNDLE_ID,
    db: DB_ID,
    tables: {
        session: SESSION_TABLE_ID,
    },
};

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

const database = new Databases(client)
export { appwriteConfig, client, database }

export interface Session extends Models.Document {
    user_id: string;
    status: "in-progress";
    conv_id: string;
    tokens?: number;
    call_duration_secs?: number;
    transcript?: string;
    call_summary_title?: string;

}