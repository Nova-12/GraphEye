package com.grapheye.server;

import java.util.List;

import org.apache.log4j.Logger;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;


/*
 * Spark module process handler to obtain status.
 */
public class CoreProcess
{
    private static String grapheyeCorePath;
    private static final Logger logger =
        Logger.getLogger(CoreProcess.class);

    private Process process;

    public CoreProcess(List<String> args) throws IOException
    {
        args.add(0, grapheyeCorePath);
        String[] cmd = args.toArray(new String[args.size()]);
        process = Runtime.getRuntime().exec(cmd);
    }

    public static void setGrapheyeCorePath(String path)
    {
        grapheyeCorePath = path;
    }

    private void flushStdio()
    {
        try {
            String line;
            BufferedReader stdout = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            BufferedReader stderr = new BufferedReader(
                    new InputStreamReader(process.getErrorStream()));
            while ((line = stdout.readLine()) != null) {
                logger.debug(line);
            }
            while ((line = stderr.readLine()) != null) {
                logger.error(line);
            }
        }
        catch (IOException e) {
            logger.error("Error communicating with subprocess", e);
        }
    }

    public String getStatus()
    {
        int exitValue;
        try {
            flushStdio();
            exitValue = process.exitValue();
        }
        catch (IllegalThreadStateException e) {
flushStdio();
            return "running";
        }
flushStdio();
        if (exitValue == 0)
            return "success";
        else
            return "fail";
    }
}
