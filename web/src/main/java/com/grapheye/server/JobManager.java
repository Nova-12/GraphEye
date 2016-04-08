package com.grapheye.server;

import java.util.HashMap;

import org.json.simple.JSONObject;

public class JobManager
{
    private static int nextId = 0;
    private static HashMap<Integer,Job> jobs =
        new HashMap<Integer,Job>();

    private synchronized static int getNextId()
    {
        nextId ++;
        return nextId;
    }

    public static int addJob(LaunchRequest request, CoreProcess process)
    {
        Job job = new Job(request, process);
        int jobId = getNextId();
        jobs.put(new Integer(jobId), job);
        return jobId;
    }

    public static String getStatus(int jobId)
    {
        Integer id = new Integer(jobId);
        if (jobs.containsKey(id))
            return jobs.get(id).getStatus();
        else
            return null;
    }

    public static JSONObject getResult(int jobId)
    {
        Integer id = new Integer(jobId);
        if (jobs.containsKey(id))
            return jobs.get(id).getResult();
        else
            return null;
    }
}

