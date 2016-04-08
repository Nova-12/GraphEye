package com.grapheye.server;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class LaunchRequest
{
    private String inputType = null;
    private String inputEdgeFile = null;
    private String inputNodeFile = null;
    private String algorithm = null;
    private String outputTable = null;

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
        this.inputType = input.getString("type");
        if (inputType.equals("text"))
        {
            this.inputEdgeFile = input.getString("edge");
            this.inputNodeFile = input.getString("node");
        }
        else
            throw new JsonTypeException("invalid input.type: " + inputType);
    }

    public List<String> getArgs()
    {
        ArrayList<String> args = new ArrayList<String>();
        args.add(outputTable);
        args.add(inputEdgeFile);
        args.add(inputNodeFile);
        return args;
    }
}

