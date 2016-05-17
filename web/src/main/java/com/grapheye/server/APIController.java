package com.grapheye.server;

import java.io.IOException;

import org.apache.log4j.Logger;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
        CoreProcess.setGrapheyeCorePath(grapheyeCorePath);
        Job job = null;

        try {
            job = Job.fromJson(requestBody);
        }
        catch (ParseException e) {
            logger.info("/launch: parse failed: " + requestBody);
            return "{\"error\":\"bad request\"}";
        }
        catch (JsonTypeException e) {
            logger.info("/launch: bad request format: " + requestBody);
            return "{\"error\":\"bad request\"}";
        }
        catch (IOException e) {
            logger.info("/launch: cannot execute job: " + requestBody);
            return "{\"error\":\"Cannot execute job\"}";
        }

        JSONObject result = new JSONObject();
        result.put("error", null);
        result.put("jobid", job.getJobid());

        return result.toJSONString();
    }

    @RequestMapping(value="/status/{jobid}", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody
    public String handleStatus(@PathVariable("jobid") int jobid)
    {
        Job job = Job.fromJobid(jobid);
        JSONObject result = new JSONObject();
        if (job == null)
        {
            result.put("error", "No such job");
            result.put("status", null);
        }
        else
        {
            result.put("error", null);
            result.put("status", job.getStatus());
        }
        return result.toJSONString();
    }

    @RequestMapping(value="/result/{jobid}", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody
    public String handleResult(@PathVariable("jobid") int jobid)
    {
        Job job = Job.fromJobid(jobid);
        if (job == null)
            return "{\"error\":\"No such job\"}";
        if (!job.getStatus().equals("success"))
            return "{\"error\":\"Result not produced\"}";

        JSONObject result = job.getResult();
        return result.toJSONString();
    }

    @RequestMapping(value="/list", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody
    public String handleList()
    {
        JSONArray jobs = DBClient.getJobsList();
        JSONObject obj = new JSONObject();
        obj.put("error", null);
        obj.put("jobs", jobs);
        return obj.toJSONString();
    }
}
