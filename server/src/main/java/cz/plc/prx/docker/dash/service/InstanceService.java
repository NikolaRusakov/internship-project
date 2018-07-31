package cz.plc.prx.docker.dash.service;

import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.model.Container;
import cz.plc.prx.docker.dash.model.ContainerConf;
import cz.plc.prx.docker.dash.model.Instance;
import cz.plc.prx.docker.dash.model.InstanceExt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstanceService {

    @Autowired
    DockerConnectionService dcService;

    @Autowired
    ObjectFactory objectFactory;
    private final String COMPOSE_PROJECT = "com.docker.compose.project";

    public List<Instance> getAll() {
        List<Container> containerList = dcService.getDefaultConnection().listContainersCmd().withShowAll(true).exec();
        List<Container> result = containerList.stream()
                .filter(line -> !line.getLabels().containsKey(COMPOSE_PROJECT))
                .collect(Collectors.toList());
        return objectFactory.convert(result, Instance.class);
    }

    public List<Instance> getAll(String connection) {
        List<Container> containerList = dcService.getConnection(connection).listContainersCmd().withShowAll(true).exec();
        List<Container> result = containerList.stream()
                .filter(line -> !line.getLabels().containsKey(COMPOSE_PROJECT))
                .collect(Collectors.toList());
        return objectFactory.convert(result, Instance.class);
    }

    public InstanceExt getByID(String Id) {
        InspectContainerResponse exec = dcService.getDefaultConnection().inspectContainerCmd(Id).exec();
        InstanceExt obj = objectFactory.convert(exec, InstanceExt.class);
        obj.setConfig(objectFactory.convert(obj.getConfig(), ContainerConf.class));
        return obj;
    }
}
