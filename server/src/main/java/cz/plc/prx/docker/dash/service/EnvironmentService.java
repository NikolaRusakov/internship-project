package cz.plc.prx.docker.dash.service;

import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.model.Container;
import cz.plc.prx.docker.dash.model.Environment;
import cz.plc.prx.docker.dash.model.Instance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EnvironmentService {
    private final String COMPOSE_PROJECT = "com.docker.compose.project";
    private final String LABEL_BLACKLIST = "LABEL_BLACKLIST";

    public enum ServiceAction {
        Stop,
        Start,
        Restart,
        Delete,
    }

    @Autowired
    DockerConnectionService dcService;

    @Autowired
    ObjectFactory objectFactory;

    public void environmentServiceAction(String id, ServiceAction serviceAction, String connection) {
        List<Environment> environments = getAll(connection);
        switch (serviceAction) {
            case Start:
                for (Environment en :
                        environments) {
                    List<Instance> services = en.getServices();
                    for (Instance instance :
                            services) {
                        if (Boolean.valueOf(instance.getLabels().containsValue(id)))
                            dcService.getConnection(connection).startContainerCmd(instance.getId()).exec();

                    }
                }
                break;
            case Stop:
                for (Environment en :
                        environments) {
                    List<Instance> services = en.getServices();
                    for (Instance instance :
                            services) {
                        if (Boolean.valueOf(instance.getLabels().containsValue(id)))
                            dcService.getConnection(connection).stopContainerCmd(instance.getId()).exec();
                    }
                }
                break;
            case Restart:
                for (Environment en :
                        environments) {
                    List<Instance> services = en.getServices();
                    for (Instance instance :
                            services) {
                        if (Boolean.valueOf(instance.getLabels().containsValue(id)))
                            dcService.getConnection(connection).restartContainerCmd(instance.getId()).exec();

                    }
                }
                break;
            case Delete:
                for (Environment en :
                        environments) {
                    List<Instance> services = en.getServices();
                    for (Instance instance :
                            services) {
                        if (Boolean.valueOf(instance.getLabels().containsValue(id)))
                            dcService.getConnection(connection).removeContainerCmd(instance.getId()).exec();

                    }
                }
                break;
            default:
                break;
        }
    }

    public Environment getEnvironmentByID(String id, String connection) {
        try {

            dcService.getConnectionFromDB();
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<Environment> environments = getAll(connection);
        Environment environment = new Environment();
        for (Environment en :
                environments) {
            List<Instance> services = en.getServices();
            List<Instance> filteredServices = new ArrayList<>();
            for (Instance instance :
                    services) {
                if (Boolean.valueOf(instance.getLabels().containsValue(id))) {
                    filteredServices.add(instance);
                }
            }
            if (!filteredServices.isEmpty())
                environment.services(filteredServices);
        }
        return environment;
    }

    public List<Environment> getAll(String connection) {
        List<Container> containerList = dcService.getConnection(connection).listContainersCmd().withShowAll(true).exec();
        Map<String, List<Container>> services = new HashMap<String, List<Container>>();
        List<Container> servicesContainers = containerList.stream().filter(line -> line.getLabels().containsKey(COMPOSE_PROJECT))
                .collect(Collectors.toList());

        for (Container element : servicesContainers) {
            boolean whitelisted = (!element.getLabels().containsKey(LABEL_BLACKLIST) || !Boolean.valueOf(element.getLabels().get(LABEL_BLACKLIST)));
            if (whitelisted) {

                if (!services.containsKey(element.getLabels().get(COMPOSE_PROJECT))) {
                    List<Container> service = new ArrayList<>();
                    services.put(element.getLabels().get(COMPOSE_PROJECT), service);
                }
                for (Map.Entry<String, List<Container>> entry : services.entrySet()) {

                    if (element.getLabels().get(COMPOSE_PROJECT).compareTo(entry.getKey()) == 0) {
                        List<Container> service = entry.getValue();
                        service.add(element);
                        entry.setValue(service);
                    }

                }
            }
        }

        List<Environment> environments = new ArrayList<Environment>();
        for (Map.Entry<String, List<Container>> entry : services.entrySet()) {
            List<Container> convertContainer = entry.getValue();
            Environment env = new Environment();
            convertContainer.forEach(container -> {

                Instance obj = objectFactory.convert(container, Instance.class);

                env.addServicesItem(obj);

            });
            environments.add(env);
        }


        return environments;
    }
}
