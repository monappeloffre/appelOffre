package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Customer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    
}
