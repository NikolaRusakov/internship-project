package cz.plc.prx.docker.dash.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;

/**
 * Serviska pro inicializaci společných dat pro index kontrolery.
 *
 * @author Petr Compel <petr.compel@marbes.cz>
 * @since 24.1.2018
 */
@Service
public class IndexService {

    /** Typ buildu - vývojový nebo nasazení u zákazníka. */
    @Value("${spring.application.buildType:REL}")
    private String buildType;
    @Autowired
    private Environment environment;


    /**
     * Inicializace společných dat do modelu.
     *
     * @param request request
     * @param model   model, do kterého budou zapsána společná data
     */
    public void initDefaults(final HttpServletRequest request, final Model model) {
        model.addAttribute("contextPath", request.getContextPath());
        model.addAttribute("buildVersion", environment.getProperty("build.version", ""));
        model.addAttribute("buildNumber", environment.getProperty("build.number", ""));
        model.addAttribute("isDevBuild", "DEV".equals(buildType));
    }
}
