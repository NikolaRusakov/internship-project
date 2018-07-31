package cz.plc.prx.docker.dash.api;

import cz.plc.prx.docker.dash.model.*;
import cz.plc.prx.docker.dash.service.DockerConnectionService;
import cz.plc.prx.docker.dash.service.EnvironmentService;
import cz.plc.prx.docker.dash.service.InstanceService;
import cz.plc.prx.docker.dash.model.DockerConnection;
import cz.plc.prx.docker.dash.model.Environment;
import cz.plc.prx.docker.dash.model.Groups;
import cz.plc.prx.docker.dash.model.InstanceExt;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import io.swagger.annotations.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import javax.validation.constraints.Size;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-12-17T20:59:13.674Z")

@Controller
public class ConnectionsApiController implements ConnectionsApi {
    private static final Logger log = LoggerFactory.getLogger(ConnectionsApiController.class);

    @Value("${app.workingDirectory:.}")
    private String workingDirectory;

    @Autowired
    DockerConnectionService dcservice;

    @Autowired
    private EnvironmentService environmentService;

    @Autowired
    private InstanceService instanceService;

    public ResponseEntity<Void> connectionDelete(@ApiParam(value = "name of selected connection", required = true) @PathVariable("connection") String connection) {
        try {
            dcservice.deleteConnectionFromDB(connection);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<List<DockerConnection>> connectionGet(@ApiParam(value = "name of selected connection", required = true) @PathVariable("connection") String connection) {
        List<DockerConnection> dockerConnection = new ArrayList<>();
        try {
            dockerConnection.add(dcservice.getConnectionFromDB(connection));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<DockerConnection>>(dockerConnection, HttpStatus.OK);
    }

    public ResponseEntity<Void> connectionsTls(@ApiParam(value = "name of selected connection", required = true) @PathVariable("connection") String connection,
                                               @ApiParam(value = "", required = true) @RequestParam(value = "name", required = true) String name,
                                               @ApiParam(value = "", required = true) @RequestParam(value = "address", required = true) String address,
                                               @ApiParam(value = "", required = true) @RequestParam(value = "workdir", required = true) String workdir,
                                               @ApiParam(value = "", required = true) @RequestParam(value = "dockerTLSVerify", required = true) Integer dockerTLSVerify,
                                               @Size(min = 3, max = 3) MultipartRequest request) {
        DockerConnection dc;
        File dir = new File(workingDirectory + "/certs/" + workdir + "/");
        dc = new DockerConnection();
        dc.setAddress(address);
        dc.setName(name);
        TLSConfiguration tls = new TLSConfiguration();
        tls.setDockerCertPath(dir.getPath().toString());
        tls.setDockerTLSVerify(dockerTLSVerify.intValue());
        dc.setWithTls(tls);
        try {
            dcservice.setConnectionToDB(dc, workdir, dir, request);
        } catch (IOException e) {
            e.printStackTrace();
        }
//
//        MultiValueMap<String, MultipartFile> files = request.getMultiFileMap();
//        Collection<MultipartFile> listOfFile = new HashSet<>();
//        for (List<MultipartFile> temp : files.values()) {
//            for (MultipartFile item : temp) {
//                listOfFile.add(item);
//                File file = new File(workingDirectory + "/certs/" + workdir + "/" + item.getOriginalFilename());
//                if (!dir.exists()) {
//                    dir.mkdirs();
//                }
//                if (!file.exists()) {
//
//                    try (final InputStream is = item.getInputStream();
//                         final OutputStream out = new FileOutputStream(file)) {
//
//                        IOUtils.copy(is, out);
//                    } catch (IOException e) {
//                        log.trace("Copy to server failed",e);
////                        e.printStackTrace();
//                    }
////                    #TODO send save progress to announce
////                    item.getOriginalFilename();
//                }
//            }
//        }

        return new ResponseEntity<Void>(HttpStatus.MULTI_STATUS);
    }

    public ResponseEntity<Void> connectionPost(@ApiParam(value = "", required = true) @RequestParam(value = "name", required = true) String name,
                                               @ApiParam(value = "", required = true) @RequestParam(value = "address", required = true) String address,
                                               @ApiParam(value = "", required = false) @RequestParam(value = "workdir", required = false) String workdir,
                                               @ApiParam(value = "", required = false) @RequestParam(value = "dockerTLSVerify", required = false) Integer dockerTLSVerify
//                                               @ApiParam(value = "")@RequestParam(value = "file",required = false) MultipartFile[] file
//                                               @ApiParam(value = "The files to upload.") @RequestParam(value="upfile", required=false)  List<byte[]> upfile
    ) {
        if (name != null | name != "" & address != null) {
            DockerConnection dc;
            dc = new DockerConnection();
            dc.setAddress(address);
            dc.setName(name);
            TLSConfiguration tls = new TLSConfiguration();
            if (dockerTLSVerify == 1 || dockerTLSVerify != null) {

                tls.setDockerTLSVerify(dockerTLSVerify);
                try {
                    dcservice.setConnectionToDB(dc);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                try {
                    dcservice.setConnectionToDB(dc);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            /*
            try {
                File directory = new File(workingDirectory + "/" + workdir);
                if (!directory.exists()) {
                    Files.createDirectories(directory.toPath());
                }
                Path path = Paths.get(workingDirectory + "/" + workdir + "/" + file.getOriginalFilename());

                if (!Files.exists(path)) {
                    OutputStream os = new BufferedOutputStream(Files.newOutputStream(path, CREATE));
                    os.write(file.getBytes());
                    os.close();
                    File f = path.toFile();
                    dcservice.setConnectionToDB(dc, f);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }*/
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Map<String, DockerConnection>> connectionsGet() {
        Map<String, DockerConnection> connections = new HashMap<>();
        try {
            connections = dcservice.getConnectionFromDB();
//            dcservice.getConnection("e9efc872-ddd1-460f-8763-29a3d2f1a347");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Map<String, DockerConnection>>(connections, HttpStatus.OK);
    }

    public ResponseEntity<List<Environment>> connectionsConnectionEnvironmentGet(@ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        List<Environment> all = environmentService.getAll(connection);
        return new ResponseEntity<List<Environment>>(all, HttpStatus.OK);
    }


    public ResponseEntity<Void> environmentRestart(@ApiParam(value = "name of selected Environment", required = true) @PathVariable("id") String id,
                                                   @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        environmentService.environmentServiceAction(id, EnvironmentService.ServiceAction.Restart, connection);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Void> environmentStart(@ApiParam(value = "name of selected Environment", required = true) @PathVariable("id") String id,
                                                 @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        environmentService.environmentServiceAction(id, EnvironmentService.ServiceAction.Start, connection);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Void> environmentStop(@ApiParam(value = "name of selected Environment", required = true) @PathVariable("id") String id,
                                                @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        environmentService.environmentServiceAction(id, EnvironmentService.ServiceAction.Stop, connection);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Groups> getAll(@ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        List<Environment> environment = environmentService.getAll(connection);
        List<Instance> instance = instanceService.getAll(connection);
        Groups groups = new Groups();
        groups.setOthers(instance);
        groups.setEnvironments(environment);
        return new ResponseEntity<Groups>(groups, HttpStatus.OK);
    }

    public ResponseEntity<Void> instanceDelete(@ApiParam(value = "name of selected Instance", required = true) @PathVariable("id") String id,
                                               @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        dcservice.getConnection(connection).removeContainerCmd(id).exec();
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<InstanceExt> instanceGet(@ApiParam(value = "name of selected Instance", required = true) @PathVariable("id") String id,
                                                   @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        InstanceExt inst = instanceService.getByID(id);
        return new ResponseEntity<InstanceExt>(inst, HttpStatus.OK);
    }

    public ResponseEntity<Void> instanceRestart(@ApiParam(value = "name of selected container", required = true) @PathVariable("id") String id,
                                                @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        dcservice.getConnection(connection).restartContainerCmd(id).exec();
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Void> instanceStart(@ApiParam(value = "name of selected container", required = true) @PathVariable("id") String id,
                                              @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        dcservice.getConnection(connection).startContainerCmd(id).exec();
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Void> instanceStop(@ApiParam(value = "name of selected container", required = true) @PathVariable("id") String id,
                                             @ApiParam(value = "", required = true) @PathVariable("connection") String connection) {
        dcservice.getConnection(connection).stopContainerCmd(id).exec();
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
