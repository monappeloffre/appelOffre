package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.ProviderActivity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProviderActivity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderActivityRepository extends JpaRepository<ProviderActivity,Long> {
    
}
