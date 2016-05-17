package com.grapheye.server;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;
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
    private String date;

    /* Not saved */
    private String inputType;
    private String inputEdgeFile;
    private String inputNodeFile;
    private CoreProcess process;

    /* List of running or just finished jobs */
    private static final Map<Integer,Job> recentJobs =
        new HashMap<Integer,Job>();

    private Job()
    {
    }

    public Job(int jobid, String algorithm, String collectionName,
               String title, String group, String date)
    {
        this.jobid = jobid;
        this.algorithm = algorithm;
        this.collectionName = collectionName;
        this.title = title;
        this.group = group;
        this.date = date;
    }

    public static Job fromJson(String jsonString)
        throws ParseException, JsonTypeException, IOException
    {
        Job job = new Job();
        job.launch(jsonString);
        return job;
    }

    private static String iso8601now() {
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mmZ");
        df.setTimeZone(tz);
        return df.format(new Date());
    }

    private void launch(String jsonString)
        throws ParseException, JsonTypeException, IOException
    {
        parseRequest(jsonString);
        date = iso8601now();

        jobid = DBClient.getNextJobId();
        collectionName = String.format("result_%d", jobid);

        startCore();

        jobid = DBClient.addJob(jobid, algorithm, collectionName, title, group, date);

        recentJobs.put(new Integer(jobid), this);
    }

    public static Job fromJobid(int jobid)
    {
        Integer id = new Integer(jobid);
        if (recentJobs.containsKey(id))
            return recentJobs.get(id);
        else
            return DBClient.loadJob(jobid);
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
        /* TODO: Check if the job saved in DB was a success. */
        if (process == null)
            return "success";
        else
            return process.getStatus();
    }

    public JSONObject getResult()
    {
        JSONObject result = DBClient.getResult(algorithm, collectionName);
        result.put("date", date);
        result.put("title", title);
        result.put("group", group);
        return result;
    }

    public int getJobid() { return jobid; }
}
