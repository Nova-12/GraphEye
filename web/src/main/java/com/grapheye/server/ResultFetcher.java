package com.grapheye.server;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import org.bson.Document;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;

public class ResultFetcher
{
    private static class PageRankBlock implements Block<Document>
    {
        private JSONArray array;
        public PageRankBlock(JSONArray array)
        {
            this.array = array;
        }
        @Override
        public void apply(final Document document)
        {
            String node = document.getString("node");
            Double rank = document.getDouble("rank");

            JSONObject item = new JSONObject();
            item.put("node", node);
            item.put("rank", rank);
            array.add(item);
        }
    }

    public static JSONObject getResult(String algorithm, String table)
    {
        MongoClient client = new MongoClient("localhost", 27017);
        MongoDatabase db = client.getDatabase("test");

        if (algorithm.equals("pagerank"))
        {
            FindIterable<Document> it = db.getCollection(table).find()
                .sort(new Document("rank", 1))
                .limit(10);

            JSONObject obj = new JSONObject();
            obj.put("error", null);
            obj.put("algorithm", "pagerank");

            JSONArray data = new JSONArray();
            it.forEach(new PageRankBlock(data));
            obj.put("data", data);
            return obj;
        }
        else
        {
            JSONObject obj = new JSONObject();
            obj.put("error", "Unsupported algorithm");
            return obj;
        }
    }
}

