package com.grapheye.server;

import java.util.List;

import org.apache.log4j.Logger;
import java.io.IOException;

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

    public boolean isRunning()
    {
        try {
            process.exitValue();
        }
        catch (IllegalThreadStateException e) {
            return true;
        }
        return false;
    }

    public int getExitValue()
    {
        return process.exitValue();
    }
}

