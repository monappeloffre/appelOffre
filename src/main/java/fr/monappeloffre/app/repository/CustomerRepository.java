package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Customer;
import fr.monappeloffre.app.domain.Provider;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

	//methode permettant de pouvoir recuperer le customer par rapport au idUser
	public Optional<Customer> findByidUser(Long idUser);
}
