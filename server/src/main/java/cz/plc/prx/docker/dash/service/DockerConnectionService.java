package cz.plc.prx.docker.dash.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import cz.plc.prx.docker.dash.model.DockerConnection;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.SystemUtils;
import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentMap;

import static java.nio.file.StandardOpenOption.APPEND;

/**
 * Docker Connection service and holder
 */
@Service
public class DockerConnectionService {
    private static final Logger log = LoggerFactory.getLogger(DockerConnectionService.class);
    @Value("${app.workingDirectory:.}")
    private String workingDirectory;

    private static final String DEFAULT_CONNECTION = "localhost";
    private Map<String, DockerClient> connections = new HashMap<>();

    public void setConnectionToDB(DockerConnection dc, String workdir, File dir, MultipartRequest request) throws IOException {
        try {
            this.setConnectionToDB(dc);
        } catch (IOException e) {
            e.printStackTrace();
        }
        MultiValueMap<String, MultipartFile> files = request.getMultiFileMap();
        Collection<MultipartFile> listOfFile = new HashSet<>();
        for (List<MultipartFile> temp : files.values()) {
            for (MultipartFile item : temp) {
                listOfFile.add(item);
                File file = new File(workingDirectory + "/certs/" + workdir + "/" + item.getOriginalFilename());
                if (!dir.exists()) {
                    dir.mkdirs();

                    if (!file.exists()) {

                        try (final InputStream is = item.getInputStream();
                             final OutputStream out = new FileOutputStream(file)) {

                            IOUtils.copy(is, out);
                        } catch (IOException e) {
                            log.error("Copy to server failed", e);
//                        e.printStackTrace();
                        }
//                    #TODO send save progress to announce
//                    item.getOriginalFilename();
                    }
                } else {
                    log.error("Directory already exists");
                }
            }
        }


//        File database = new File("./connections.db");
//        DB db = DBMaker
//                .fileDB(database)
//                .transactionEnable()
//                .closeOnJvmShutdown()
//                .fileChannelEnable()
//                .make();
//        ConcurrentMap mapa = db.hashMap("map").createOrOpen();
////        dc.getWithTls().setDockerCertPath(Paths.get(workingDirectory+"/"+dc.getWithTls().getDockerCertPath()).toString())/*.relativize(certFile.toPath()).toString())*/;
//        mapa.put(dc.getName(), dc);
//        db.commit();
//        db.close();
        }

        public void setConnectionToDB (DockerConnection dc) throws IOException {
            File database = new File(workingDirectory + "/" + "connections.db");
            DB db = DBMaker
                    .fileDB(database)
                    .transactionEnable()
                    .closeOnJvmShutdown()
                    .fileChannelEnable()
                    .make();
            ConcurrentMap mapa = db.hashMap("map").createOrOpen();
            mapa.put(UUID.randomUUID(), dc);
            db.commit();
            db.close();

        }

        public void deleteConnectionFromDB (String connection) throws IOException {
            File database = new File("./connections.db");
            DB db = DBMaker
                    .fileDB(database)
                    .transactionEnable()
                    .closeOnJvmShutdown()
                    .fileChannelEnable()
                    .make();
            ConcurrentMap mapa = db.hashMap("map").createOrOpen();
            mapa.remove(connection);
            db.commit();
            db.close();
        }

        public Map<String, DockerConnection> getConnectionFromDB () throws IOException {
            Map<String, DockerConnection> listOfConnections = new HashMap<>();
            File database = new File(workingDirectory + "/" + "connections.db");
            DB db = DBMaker
                    .fileDB(database)
                    .transactionEnable()
                    .closeOnJvmShutdown()
                    .fileChannelEnable()
                    .make();
            ConcurrentMap mapa = db.hashMap("map").createOrOpen();
            mapa.forEach((uuid, connection) -> {
                listOfConnections.put(uuid.toString(), (DockerConnection) connection);
            });
            db.close();
            return listOfConnections;

        }

        public DockerClient getConnection (String connection){
            DockerClient dc = null;
            if (connection.equals("default")) {
                dc = getDefaultConnection();
            } else {
                File database = new File(workingDirectory + "/" + "connections.db");
                DB db = DBMaker
                        .fileDB(database)
                        .transactionEnable()
                        .closeOnJvmShutdown()
                        .fileChannelEnable()
                        .make();
                HashMap<String, DockerConnection> dock = new HashMap();
                ConcurrentMap mapa = db.hashMap("map").createOrOpen();
//            mapa.computeIfPresent(connection,(uuid, data )->{
                mapa.forEach((uuid, data) -> {
                    dock.put(uuid.toString(), (DockerConnection) data);
                });
                db.close();

                try {

                    DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                            .withDockerHost("tcp://" + dock.get(connection).getAddress())
                            .withDockerTlsVerify(true)
                            .withDockerTlsVerify(dock.get(connection).getWithTls().getDockerTLSVerify().toString())
                            .withDockerCertPath(dock.get(connection).getWithTls().getDockerCertPath())
                            .build();
                    dc = DockerClientBuilder.getInstance(config).build();
//            dc.infoCmd();
                } catch (Exception e) {
                    log.error("Connecting to selected remote docker daemon has failed.", e);
                }

           /* DockerConnection dconnection = (DockerConnection) mapa.get(connection);
            if (dconnection.getWithTls() != null) {
                DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                        .withDockerHost(dconnection.getAddress())
                        .build();
                dc = DockerClientBuilder.getInstance(config).build();*/
            /*if (dconnection.getWithTls().getDockerTLSVerify().equals("1") & !dconnection.getWithTls().getDockerCertPath().isEmpty() & !dconnection.getWithTls().getDockerConfig().isEmpty()) {
                DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                          .withDockerHost(dconnection.getAddress())
                        .withDockerTlsVerify(true)
                        .withDockerTlsVerify(dconnection.getWithTls().getDockerTLSVerify().toString())
                        .withDockerCertPath(dconnection.getWithTls().getDockerCertPath())
                        .build();

                dc = DockerClientBuilder.getInstance(config).build();
            }*/
            /*} else {
                DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                        .withDockerHost(dconnection.getAddress())
                        .build();
                dc = DockerClientBuilder.getInstance(config).build();
            }*/
//            db.close();
//            return dc;
            }

            return dc;
        }

        public DockerConnection getConnectionFromDB (String connection) throws IOException {
            DockerConnection dockerConnection = new DockerConnection();
            File database = new File("./connections.db");
            DB db = DBMaker
                    .fileDB(database)
                    .transactionEnable()
                    .closeOnJvmShutdown()
                    .fileChannelEnable()
                    .make();
            ConcurrentMap mapa = db.hashMap("map").createOrOpen();
            db.close();
            return dockerConnection;

        }

        public boolean verifyCertificate (DockerConnection dc, String workdir, MultipartFile[]file){
            boolean isExecutable;
            Path path = Paths.get(workingDirectory + "/" + workdir /*+ "/" + file.getOriginalFilename()*/);
            try {
                for (MultipartFile partFile :
                        file) {
                    Path tempFile = Files.createTempFile(path, FilenameUtils.getName(partFile.getOriginalFilename()), FilenameUtils.getExtension(partFile.getOriginalFilename()));
                    OutputStream os;

                    os = new BufferedOutputStream(Files.newOutputStream(tempFile, APPEND));

                    os.write(partFile.getBytes());
                    os.close();
//            File f = tempFile.toFile();
                }
                DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                        .withDockerHost(dc.getAddress())
                        .withDockerTlsVerify(true)
                        .withDockerTlsVerify(dc.getWithTls().getDockerTLSVerify().toString())
                        .withDockerCertPath(path.toAbsolutePath().toString())
                        .build();
                DockerClient dcc = DockerClientBuilder.getInstance(config).build();
                dcc.infoCmd();
                isExecutable = true;

            } catch (IOException e) {
                e.printStackTrace();
                isExecutable = false;
                return isExecutable;
            }
            return isExecutable;
        }

        /**
         * @return default connection to system docker
         */
        public DockerClient getDefaultConnection () {
            return connections.computeIfAbsent(DEFAULT_CONNECTION, id -> {
                DockerClientConfig config = null;

                if (SystemUtils.IS_OS_MAC_OSX) {
                    config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                            .withDockerHost("unix:///var/run/docker.sock")
                            .build();
                }
                if (SystemUtils.IS_OS_LINUX) {
                    config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                            .withDockerHost("unix:///var/run/docker.sock")
                            .build();
                }
                if (SystemUtils.IS_OS_WINDOWS) {
                    config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                            .withDockerHost("tcp://localhost:2376")
                            .withDockerTlsVerify(true)
                            .withDockerTlsVerify("1")
                            .build();
                }

                return DockerClientBuilder.getInstance(config).build();
            });
        }
    }
