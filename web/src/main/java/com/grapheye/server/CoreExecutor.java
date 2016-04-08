package com.grapheye.server;

import java.util.List;

import org.apache.log4j.Logger;
import java.io.IOException;

public class CoreExecutor
{
    private static final Logger logger =
        Logger.getLogger(CoreExecutor.class);

    public enum Status {
        READY("ready"),
        RUNNING("running"),
        SUCCESS("success"),
        FAIL("fail");

        private final String message;
        private Status(String s) { message = s; }
        public String toString() { return message; }
    };

    private static Process process = null;
    private static boolean reaped = false;

    private static boolean execute(String[] cmd)
    {
        if (process == null || reaped == true)
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
            reaped = false;
            return true;
        }
        else
        {
            // There's already running job
            // OR
            // the exit code was not yet reported.
            return false;
        }
    }

    public static boolean execute(String core, List<String> args)
    {
        args.add(0, core);
        String[] cmd = args.toArray(new String[args.size()]);
        return execute(cmd);
    }

    private static boolean isRunning()
    {
        try {
            process.exitValue();
        }
        catch (IllegalThreadStateException e) {
            return true;
        }
        return false;
    }

    public static Status getStatus()
    {
        if (process == null)
            return Status.READY;

        if (isRunning())
            return Status.RUNNING;

        int exitValue = process.exitValue();
        reaped = true;

        if (exitValue == 0)
            return Status.SUCCESS;
        else
            return Status.FAIL;
    }
}

