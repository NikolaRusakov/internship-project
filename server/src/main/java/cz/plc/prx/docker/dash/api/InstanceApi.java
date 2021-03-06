/**
 * NOTE: This class is auto generated by the swagger code generator program (2.2.3).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package cz.plc.prx.docker.dash.api;

import cz.plc.prx.docker.dash.model.InstanceExt;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import javax.validation.constraints.*;
import javax.validation.Valid;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-10-12T16:13:23.987Z")

@Api(value = "instance", description = "the instance API")
@RequestMapping("/api")
public interface InstanceApi {

    @ApiOperation(value = "Delete selected instance by its ID", notes = "", response = Void.class, tags={ "Instance", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "successful operation", response = Void.class) })
    
    @RequestMapping(value = "/instance/{id}",
        produces = { "application/json" }, 
        method = RequestMethod.DELETE)
    ResponseEntity<Void> instanceDelete(@ApiParam(value = "name of selected Instance",required=true ) @PathVariable("id") String id);


    @ApiOperation(value = "Get an instance selected by its ID", notes = "", response = InstanceExt.class, tags={ "Instance", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "successful operation", response = InstanceExt.class),
        @ApiResponse(code = 404, message = "A container with the specified Instance ID was not found.", response = Void.class) })
    
    @RequestMapping(value = "/instance/{id}",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<InstanceExt> instanceGet(@ApiParam(value = "name of selected Instance",required=true ) @PathVariable("id") String id);


    @ApiOperation(value = "Restart an instance selected by its ID", notes = "", response = Void.class, tags={ "Instance", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "successful operation", response = Void.class) })
    
    @RequestMapping(value = "/instance/{id}/restart",
        produces = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<Void> instanceRestart(@ApiParam(value = "name of selected container",required=true ) @PathVariable("id") String id);


    @ApiOperation(value = "Start an instance selected by its ID", notes = "", response = Void.class, tags={ "Instance", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "successful operation", response = Void.class) })
    
    @RequestMapping(value = "/instance/{id}/start",
        produces = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<Void> instanceStart(@ApiParam(value = "name of selected container",required=true ) @PathVariable("id") String id);


    @ApiOperation(value = "Stop an instance selected by its ID", notes = "", response = Void.class, tags={ "Instance", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "successful operation", response = Void.class) })
    
    @RequestMapping(value = "/instance/{id}/stop",
        produces = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<Void> instanceStop(@ApiParam(value = "name of selected container",required=true ) @PathVariable("id") String id);

}
