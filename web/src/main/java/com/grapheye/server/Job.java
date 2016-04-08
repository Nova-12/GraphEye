package com.grapheye.server;

import org.json.simple.JSONObject;

public class Job
{
    private LaunchRequest request;
    private CoreProcess process;

    public Job(LaunchRequest request, CoreProcess process)
    {
        this.request = request;
        this.process = process;
    }

    public String getStatus()
    {
        if (process.isRunning())
            return "running";

        if (process.getExitValue() == 0)
            return "success";
        else
            return "fail";
    }

    public JSONObject getResult()
    {
        return ResultFetcher.getResult(
                request.getAlgorithm(),
                request.getOutputTable()
        );
    }
}

