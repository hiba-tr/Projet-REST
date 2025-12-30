package com.info.service;

import java.util.List;


import javax.jws.WebService;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import com.info.model.Person;

@WebService(endpointInterface = "com.info.service.PersonService")
public class PersonServiceImpl implements PersonService {

    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("tp333PU");
    private EntityManager em = emf.createEntityManager();

    @Override
    public boolean addPerson(Person p) {
        try {
            em.getTransaction().begin();
            em.persist(p);
            em.getTransaction().commit();
            System.out.println("Ajout avec succès");
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            if (em.getTransaction().isActive()) em.getTransaction().rollback();
            return false;
        }
    }

    @Override
    public boolean deletePerson(int id) {
        try {
            Person p = em.find(Person.class, id);
            if (p != null) {
                em.getTransaction().begin();
                em.remove(p);
                em.getTransaction().commit();
                return true;
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            if (em.getTransaction().isActive()) em.getTransaction().rollback();
            return false;
        }
    }

    @Override
    public Person updatePerson(int id, Person p) {
        try {
            Person existing = em.find(Person.class, id);
            if (existing != null) {
                em.getTransaction().begin();
                existing.setName(p.getName());
                existing.setAge(p.getAge());
                em.getTransaction().commit();
                return existing;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            if (em.getTransaction().isActive()) em.getTransaction().rollback();
            return null;
        }
    }

    @Override
    public Person getPerson(int id) {
        try {
            return em.find(Person.class, id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Person getPersonByName(String name) {
        try {
            TypedQuery<Person> query = em.createQuery("SELECT p FROM Person p WHERE p.name = :name", Person.class);
            query.setParameter("name", name);
            List<Person> results = query.getResultList();
            return results.isEmpty() ? null : results.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Person[] getAllPersons() {
        try {
            TypedQuery<Person> query = em.createQuery("SELECT p FROM Person p", Person.class);
            List<Person> persons = query.getResultList();
            return persons.toArray(new Person[0]);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
