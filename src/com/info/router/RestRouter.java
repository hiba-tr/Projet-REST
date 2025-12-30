package com.info.router;




import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.info.model.Person;
import com.info.service.PersonServiceImpl;


@Path("/users")
public class RestRouter {

	PersonServiceImpl ps = new PersonServiceImpl();

	@GET
	@Path("/affiche")
	@Produces(MediaType.APPLICATION_JSON)
	public Person[] getAllUsers() {
		return ps.getAllPersons();
	}
	@POST
	@Path("/ajouter")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Person addUser(Person user) {
	    ps.addPerson(user);
	    return user;
	}


	
	@PUT
	@Path("/modifier/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Person updateUser(@PathParam("id") int id, Person user) {
	    return ps.updatePerson(id, user);
	}
	@DELETE
	@Path("/supprimer/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteUser(@PathParam("id") int id) {
	    ps.deletePerson(id);
	}
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Person getUserById(@PathParam("id") int id) {
	    return ps.getPerson(id);
	}
	@GET
	@Path("/search/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Person getUserByName(@PathParam("name") String name) {
	    return ps.getPersonByName(name);
	}


}
