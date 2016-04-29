package com.grapheye.server;

import java.util.List;

import org.apache.log4j.Logger;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class CoreProcess
{
    private static final Logger logger =
        Logger.getLogger(CoreProcess.class);

    private Process process;

    public CoreProcess()
    {
        process = null;
    }

    private boolean execute(String[] cmd)
    {
        Process newProcess = null;
        try {
            newProcess = Runtime.getRuntime().exec(cmd);
        }
        catch (IOException e) {
            logger.error("execution error", e);
            return false;
        }
        process = newProcess;
        return true;
    }

    public boolean execute(String core, List<String> args)
    {
        args.add(0, core);
        String[] cmd = args.toArray(new String[args.size()]);
        return execute(cmd);
    }

    private void flushStdio()
    {
        try {
            String line = null;
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
        }
    }

    public boolean isRunning()
    {
        try {
            process.exitValue();
        }
        catch (IllegalThreadStateException e) {
            return true;
        }
        // flushStdio();
        return false;
    }

    public int getExitValue()
    {
        return process.exitValue();
    }
}

