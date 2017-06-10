package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.ProviderEligibility;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProviderEligibility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderEligibilityRepository extends JpaRepository<ProviderEligibility,Long> {
    
}
