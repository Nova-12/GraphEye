package com.grapheye.server;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/")
public class HelloController
{
    private static final Logger logger =
        Logger.getLogger(HelloController.class);

    @RequestMapping(value="/user/{userid}", method=RequestMethod.GET)
    public ModelAndView user(@PathVariable(value="userid") String id)
    {
        logger.info("In user()");

        ModelAndView model = new ModelAndView();
        model.setViewName("user");
        model.addObject("greeting", "Hello user " + id);
        return model;
    }
}

