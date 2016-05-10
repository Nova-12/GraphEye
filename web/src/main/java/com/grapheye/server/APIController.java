package com.grapheye.server;

import java.util.List;

import org.apache.log4j.Logger;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.Model;

@Controller
public class APIController
{
    private static final Logger logger =
        Logger.getLogger(APIController.class);

    // Reads from grapheye.properties
    @Value("${grapheye.core.path}")
    private String grapheyeCorePath;

    @RequestMapping(value="/debug", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
    public ModelAndView handleDebug()
    {
        ModelAndView model = new ModelAndView();
        model.setViewName("debug");
        model.addObject("grapheyeCorePath", grapheyeCorePath);
        return model;
    }

    @RequestMapping(value="/launch", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public String handleLaunch(@RequestBody String requestBody)
    {
        JSONParser parser = new JSONParser();
        JSONObject json = null;
        try {
            json = (JSONObject)parser.parse(requestBody);
        }
        catch (ParseException e) {
            logger.info("/launch: parse failed " + requestBody);
            return "{\"error\":\"bad request\"}";
        }

        LaunchRequest request = new LaunchRequest();
        try {
            request.parse(json);
        }
        catch (JsonTypeException e) {
            logger.info("/launch: bad request format " + requestBody);
            return "{\"error\":\"bad request\"}";
        }

        List<String> args = request.getArgs();

        CoreProcess process = new CoreProcess();
        boolean executed = process.execute(grapheyeCorePath, args);
        if (!executed)
            return "{\"error\":\"Cannot execute job\"}";

        int jobId = JobManager.addJob(request, process);

        JSONObject result = new JSONObject();
        result.put("error", null);
        result.put("jobid", jobId);

        return result.toJSONString();
    }

    @RequestMapping(value="/status/{jobId}", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody
    public String handleStatus(@PathVariable("jobId") int jobId)
    {
        String status = JobManager.getStatus(jobId);
        JSONObject result = new JSONObject();
        if (status == null)
        {
            result.put("error", "No such job");
            result.put("status", null);
        }
        else
        {
            result.put("error", null);
            result.put("status", status);
        }
        return result.toJSONString();
    }

    @RequestMapping(value="/result/{jobId}", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody
    public String handleResult(@PathVariable("jobId") int jobId)
    {
        String status = JobManager.getStatus(jobId);
        if (status == null)
        {
            return "{\"error\":\"No such job\"}";
        }
        if (status != "success")
        {
            return "{\"error\":\"Result not produced\"}";
        }

        JSONObject result = JobManager.getResult(jobId);
        return result.toJSONString();
    }
}

