package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Quote;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Quote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuoteRepository extends JpaRepository<Quote,Long> {
    
}
