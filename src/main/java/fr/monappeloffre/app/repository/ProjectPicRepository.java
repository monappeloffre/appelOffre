package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.ProjectPic;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProjectPic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectPicRepository extends JpaRepository<ProjectPic,Long> {
    
}
