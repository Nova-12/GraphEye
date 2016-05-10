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
    private static class DoubleValueBlock implements Block<Document>
    {
        private JSONArray resultArray;
        private String valueName;
        public DoubleValueBlock(JSONArray array, String valueName)
        {
            this.resultArray = array;
            this.valueName = valueName;
        }
        @Override
        public void apply(final Document document)
        {
            String node = document.getString("node");
            Double value = document.getDouble(valueName);
            JSONObject item = new JSONObject();
            item.put("node", node);
            item.put(valueName, value);
            resultArray.add(item);
        }
    }
    private static class IntValueBlock implements Block<Document>
    {
        private JSONArray resultArray;
        private String valueName;
        public IntValueBlock(JSONArray array, String valueName)
        {
            this.resultArray = array;
            this.valueName = valueName;
        }
        @Override
        public void apply(final Document document)
        {
            String node = document.getString("node");
            Integer value = document.getInteger(valueName);
            JSONObject item = new JSONObject();
            item.put("node", node);
            item.put(valueName, value);
            resultArray.add(item);
        }
    }

    public static JSONObject getResult(String algorithm, String table)
    {
        MongoClient client = new MongoClient("localhost", 27017);
        MongoDatabase db = client.getDatabase("test");

        JSONObject obj = new JSONObject();
        obj.put("error", "null");
        obj.put("algorithm", algorithm);

        FindIterable<Document> it = db.getCollection(table).find().limit(100);
        JSONArray data = new JSONArray();

        if (algorithm.equals("pagerank"))
            it.forEach(new DoubleValueBlock(data, "rank"));
        else if (algorithm.equals("trianglecount"))
            it.forEach(new IntValueBlock(data, "trianglecount"));
        else if (algorithm.equals("labelpropagation"))
            it.forEach(new IntValueBlock(data, "labelId"));
        else if (algorithm.equals("connectedcomponents"))
            it.forEach(new IntValueBlock(data, "connected"));

        obj.put("data", data);

        return obj;
    }
}

