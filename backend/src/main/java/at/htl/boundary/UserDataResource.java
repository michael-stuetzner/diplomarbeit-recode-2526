package at.htl.boundary;

import at.htl.control.UserDataRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/UserData")
public class UserDataResource {

    @Inject
    UserDataRepository userDataRepository;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response.ok(
                userDataRepository.findAll().list()
        ).build();
    }
}
