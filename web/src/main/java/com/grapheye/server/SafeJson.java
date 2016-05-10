package com.grapheye.server;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/* Type-checking JSONObject wrapper
 */
public class SafeJson
{
    private JSONObject json;

    public SafeJson(JSONObject json)
    {
        this.json = json;
    }

    public String getString(String key) throws JsonTypeException
    {
        Object item = json.get(key);
        if (item != null && item instanceof String)
            return (String)item;
        else
            throw new JsonTypeException("Key error: " + key);
    }

    public String getStringOrNull(String key)
    {
        Object item = json.get(key);
        if (item != null && item instanceof String)
            return (String)item;
        else
            return null;
    }

    public JSONObject getObject(String key) throws JsonTypeException
    {
        Object item = json.get(key);
        if (item != null && item instanceof JSONObject)
            return (JSONObject)item;
        else
            throw new JsonTypeException("Key error: " + key);
    }
}

class JsonTypeException extends Exception
{
    public JsonTypeException(String msg)
    {
        super(msg);
    }
}

