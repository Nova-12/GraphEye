package com.grapheye.server;

import java.util.List;

import org.apache.log4j.Logger;
import java.io.IOException;

public class CoreExecutor
{
    private static final Logger logger =
        Logger.getLogger(CoreExecutor.class);

    public static boolean execute(String core, List<String> args)
    {
        args.add(0, core);
        String[] cmd = args.toArray(new String[args.size()]);
        try {
            Runtime.getRuntime().exec(cmd);
        }
        catch (IOException e) {
            logger.error("execution error", e);
            return false;
        }
        return true;
    }
}

