package com.grapheye.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Job
{
    /* Saved to DB */
    private int jobid;
    private String algorithm;
    private String collectionName;
    private String title;
    private String group;
    private Date date;

    /* Not saved */
    private String inputType;
    private String inputEdgeFile;
    private String inputNodeFile;
    private CoreProcess process;

    /* List of running or just finished jobs */
    private static Map<Integer,Job> recentJobs =
        new HashMap<Integer,Job>();

    private static String grapheyeCorePath;
    private static final Logger logger =
        Logger.getLogger(Job.class);

    public static Job fromJson(String jsonString)
        throws ParseException, JsonTypeException, IOException
    {
        Job job = new Job();

        job.parseRequest(jsonString);
        job.date = new Date();

        job.jobid = DBClient.getNextJobId();
        job.collectionName = "grpheye_result_" + String.valueOf(job.jobid);

        job.startCore();

        job.jobid = DBClient.addJob(job);

        recentJobs.put(new Integer(job.jobid), job);
        return job;
    }

    public static Job fromJobid(int id)
    {
        Integer id_ = new Integer(id);
        if (recentJobs.containsKey(id_))
            return recentJobs.get(id_);
        else
            return null;
    }

    private void parseRequest(String jsonString) throws ParseException, JsonTypeException
    {
        JSONParser jsonParser = new JSONParser();
        SafeJson json = new SafeJson((JSONObject)jsonParser.parse(jsonString));

        this.algorithm = json.getString("algorithm");

        SafeJson input = new SafeJson(json.getObject("input"));
        this.inputType = input.getString("type");
        if (inputType.equals("text")) {
            this.inputEdgeFile = input.getString("edge");
            this.inputNodeFile = input.getString("node");
        }
        else
            throw new JsonTypeException("invalid input.type: " + inputType);

        this.title = json.getStringOrNull("title");
        this.group = json.getStringOrNull("group");
    }

    private void startCore() throws IOException
    {
        ArrayList<String> args = new ArrayList<String>();
        args.add(this.algorithm);
        args.add(this.collectionName);
        if (this.inputType.equals("text"))
        {
            args.add(this.inputEdgeFile);
            args.add(this.inputNodeFile);
        }
        process = new CoreProcess(args);
    }

    public String getStatus()
    {
        return process.getStatus();
    }

    public JSONObject getResult()
    {
        return DBClient.getResult(algorithm, collectionName);
    }

    public int getJobid() { return jobid; }
    public String getAlgorithm() { return algorithm; }
    public String getTitle() { return title; }
    public String getGroup() { return group; }
    public Date getDate() { return date; }
    public String getCollectionName() { return collectionName; }
}
