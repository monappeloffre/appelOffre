package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.Provider;
import fr.monappeloffre.app.domain.Quote;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Quote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuoteRepository extends JpaRepository<Quote,Long> {
    public List<Quote> findByprojectQU(Project project);
    
    public List<Quote> findByProjectQUInAndProviderQ(List<Project> project, Provider provider);
}
