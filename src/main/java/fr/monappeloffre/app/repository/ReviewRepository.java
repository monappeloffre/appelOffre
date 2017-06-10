package fr.monappeloffre.app.repository;

import fr.monappeloffre.app.domain.Review;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    
}
