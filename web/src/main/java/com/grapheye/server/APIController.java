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

    @RequestMapping(value="/debug", method=RequestMethod.GET)
    public ModelAndView handleDebug()
    {
        ModelAndView model = new ModelAndView();
        model.setViewName("debug");
        model.addObject("grapheyeCorePath", grapheyeCorePath);
        return model;
    }

    @RequestMapping(value="/launch", method=RequestMethod.POST)
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
        CoreExecutor.execute(grapheyeCorePath, args);

        return "{\"error\":null}";
    }

    @RequestMapping(value="/status", method=RequestMethod.GET)
    @ResponseBody
    public String handleStatus()
    {
        String message = CoreExecutor.getStatus().toString();
        JSONObject result = new JSONObject();
        result.put("error", null);
        result.put("status", message);
        return result.toJSONString();
    }

    @RequestMapping(value="/result", method=RequestMethod.GET)
    @ResponseBody
    public String handleResult()
    {
        JSONObject result = ResultFetcher.getResult("pagerank", "pagerank");
        return result.toJSONString();
    }
}

