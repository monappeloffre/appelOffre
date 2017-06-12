package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Customer;
import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.Provider;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
	
	//methode permettant de pouvoir recupere les projets par rapport au activité
	public List<Project> findByProjectactivityPROJECTS_ActivityProjectIdIn(List<Long> activityList);
	
	//methode permettant de pouvoir recuperer les provider par rapport au idUser
	public List<Project> findBycustomerP(Customer customer);
    
}
