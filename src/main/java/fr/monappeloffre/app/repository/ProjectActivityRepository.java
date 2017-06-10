package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.ProjectActivity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProjectActivity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectActivityRepository extends JpaRepository<ProjectActivity,Long> {
    
}
