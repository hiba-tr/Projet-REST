package com.info.service;

import com.info.model.Person;

public interface PersonService {
	
	public boolean addPerson(Person p);

	public boolean deletePerson(int id);
	
	public Person getPersonByName(String name);

	public Person getPerson(int id);
	
	public Person[] getAllPersons();
	public Person updatePerson(int id, Person p);
}