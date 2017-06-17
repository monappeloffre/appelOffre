package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.Provider;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Provider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderRepository extends JpaRepository<Provider,Long> {
	
	//methode permettant de pouvoir recuperer les provider par rapport au idUser
	public Optional<Provider> findByidUser(Long idUser);
    
}
