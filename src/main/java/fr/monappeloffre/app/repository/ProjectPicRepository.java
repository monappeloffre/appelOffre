package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.ProjectPic;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProjectPic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectPicRepository extends JpaRepository<ProjectPic,Long> {
	
    public List<ProjectPic> findByprojectPIC(Project project);
}
