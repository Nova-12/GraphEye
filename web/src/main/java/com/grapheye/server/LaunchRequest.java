package com.grapheye.server;

import org.apache.log4j.Logger;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class LaunchRequest
{
    private String inputEdgeFile = null;
    private String inputNodeFile = null;
    private String algorithm = null;
    private String outputTable = null;

    public LaunchRequest()
    {
    }

    public void parse(JSONObject jsonObject) throws JsonTypeException
    {
        LaunchRequest request = new LaunchRequest();
        SafeJson json = new SafeJson(jsonObject);

        SafeJson input = new SafeJson(json.getObject("input"));
        parseInput(input);

        this.algorithm = json.getString("algorithm");
        this.outputTable = json.getString("output");
    }

    private void parseInput(SafeJson input) throws JsonTypeException
    {
        String inputType = input.getString("type");
        if (inputType.equals("text"))
        {
            this.inputEdgeFile = input.getString("edge");
            this.inputNodeFile = input.getString("node");
        }
        else
            throw new JsonTypeException("invalid input.type: " + inputType);
    }
}

