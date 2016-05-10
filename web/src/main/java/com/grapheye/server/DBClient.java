package com.grapheye.server;

import java.util.Date;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.bson.Document;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Filters;

public class DBClient
{
    private static String dbName = "test";
    private static String jobsCollectionName = "jobs";

    private static MongoClient client = null;
    private static MongoDatabase db = null;

    private static void maybeInit()
    {
        if (client == null) {
            client = new MongoClient("localhost", 27017);
            db = client.getDatabase("test");
        }
    }

    /* TODO: This is not thread-safe. Multiple requests can result in
     * two jobs having same jobid. */
    public static int getNextJobId()
    {
        maybeInit();
        Document lastJob = db.getCollection(jobsCollectionName)
                            .find()
                            .sort(new Document("jobid", -1))
                            .first();
        if (lastJob == null)
            return 1;
        else
            return lastJob.getInteger("jobid").intValue() + 1;
    }

    public static int addJob(int jobid, String algorithm, String collectionName,
                             String title, String group, Date date)
    {
        maybeInit();
        Document jobEntry = new Document("jobid", jobid)
                            .append("algorithm", algorithm)
                            .append("collectionName", collectionName)
                            .append("title", title)
                            .append("group", group)
                            .append("date", date);
        db.getCollection(jobsCollectionName).insertOne(jobEntry);
        return jobid;
    }

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

    public static Job loadJob(int jobid)
    {
        maybeInit();

        Document jobEntry = db.getCollection(jobsCollectionName)
                                .find(new Document("jobid", jobid))
                                .first();
        if (jobEntry == null)
            return null;

        Job job = new Job(jobEntry.getInteger("jobid").intValue(),
                          jobEntry.getString("algorithm"),
                          jobEntry.getString("collectionName"),
                          jobEntry.getString("title"),
                          jobEntry.getString("group"),
                          jobEntry.getDate("date"));
        return job;
    }

    public static JSONObject getResult(String algorithm, String table)
    {
        maybeInit();

        JSONObject obj = new JSONObject();
        obj.put("error", null);
        obj.put("algorithm", algorithm);

        FindIterable<Document> it = db.getCollection(table).find();
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
