package cz.plc.prx.docker.dash.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * Index controler pro aplikaci - vstupní bod.
 *
 * @author Petr Compel <petr.compel@marbes.cz>
 * @since 24.1.2018
 */
@Controller
public class AppIndexController {
    @Autowired
    private IndexService indexService;

    /**
     * Index stránka.
     *
     * @param request request
     * @param model   model
     * @return view
     */
    @RequestMapping(value = {
            "/connection", "/", "/environments", "/instances*", "/others"
    }, method = RequestMethod.GET)
    public String serveAll(final HttpServletRequest request,
                           final Model model) {
        indexService.initDefaults(request, model);
        return "index";
    }

}
