package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Registration;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Registration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegistrationRepository extends JpaRepository<Registration,Long> {
    
}
