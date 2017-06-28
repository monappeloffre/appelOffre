package fr.monappeloffre.app.web.rest;

import com.codahale.metrics.annotation.Timed;

import fr.monappeloffre.app.domain.Activity;
import fr.monappeloffre.app.domain.Customer;
import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.ProjectActivity;
import fr.monappeloffre.app.domain.ProjectPic;
import fr.monappeloffre.app.domain.Provider;
import fr.monappeloffre.app.domain.ProviderActivity;
import fr.monappeloffre.app.domain.User;
import fr.monappeloffre.app.repository.ActivityRepository;
import fr.monappeloffre.app.repository.ProviderActivityRepository;
import fr.monappeloffre.app.repository.ProviderRepository;
import fr.monappeloffre.app.repository.UserRepository;
import fr.monappeloffre.app.security.SecurityUtils;
import fr.monappeloffre.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Provider.
 */
@RestController
@RequestMapping("/api")
public class ProviderResource {

    private final Logger log = LoggerFactory.getLogger(ProviderResource.class);

    private static final String ENTITY_NAME = "provider";

    private final ProviderRepository providerRepository;

    public ProviderResource(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }
    
    //Ajout du repository pour pouvoir connaitre l'id de la personne loggé
	@Autowired
	UserRepository userRepository;
	@Autowired
	ActivityRepository activityRepository;
	@Autowired
	ProviderActivityRepository providerActivityRepository;

    /**
     * POST  /providers : Create a new provider.
     *
     * @param provider the provider to create
     * @return the ResponseEntity with status 201 (Created) and with body the new provider, or with status 400 (Bad Request) if the provider has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/providers")
    @Timed
    public ResponseEntity<Provider> createProvider(@RequestBody Provider provider) throws URISyntaxException {
        log.debug("REST request to save Provider : {}", provider);
        if (provider.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new provider cannot already have an ID")).body(null);
        }
        
		User currentUserLogged;
		Long idUser = 1l;
		Optional<User> optional = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
		if (optional.isPresent()) {
			currentUserLogged = optional.get();
			idUser = currentUserLogged.getId();
		}
        
        provider.setIdUser(idUser);
        provider.setRegistrationDate(LocalDate.now());
        
        Provider result = providerRepository.save(provider);
        return ResponseEntity.created(new URI("/api/providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /providers : Updates an existing provider.
     *
     * @param provider the provider to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated provider,
     * or with status 400 (Bad Request) if the provider is not valid,
     * or with status 500 (Internal Server Error) if the provider couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/providers")
    @Timed
    public ResponseEntity<Provider> updateProvider(@RequestBody Provider provider) throws URISyntaxException {
        log.debug("REST request to update Provider : {}", provider);
        if (provider.getId() == null) {
            return createProvider(provider);
        }
        Provider result = providerRepository.save(provider);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, provider.getId().toString()))
            .body(result);
    }

    /**
     * GET  /providers : get all the providers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of providers in body
     */
    @GetMapping("/providers")
    @Timed
    public List<Provider> getAllProviders() {
        log.debug("REST request to get all Providers");
        return providerRepository.findAll();
    }

    /**
     * GET  /providers/:id : get the "id" provider.
     *
     * @param id the id of the provider to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the provider, or with status 404 (Not Found)
     */
    @GetMapping("/providers/{id}")
    @Timed
    public ResponseEntity<Provider> getProvider(@PathVariable Long id) {
        log.debug("REST request to get Provider : {}", id);
        Provider provider = providerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(provider));
    }

    /**
     * DELETE  /providers/:id : delete the "id" provider.
     *
     * @param id the id of the provider to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/providers/{id}")
    @Timed
    public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
        log.debug("REST request to delete Provider : {}", id);
        providerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
//    @PostMapping("/providers")
//    @Timed
//    public ResponseEntity<Provider> createProvider() {
//        log.debug("REST request to save Provider : {}", provider);
//        if (provider.getId() != null) {
//            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new provider cannot already have an ID")).body(null);
//        }
//        
//		User currentUserLogged;
//		Long idUser = 1l;
//		Optional<User> optional = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
//		if (optional.isPresent()) {
//			currentUserLogged = optional.get();
//			idUser = currentUserLogged.getId();
//		}
//        
//        provider.setIdUser(idUser);
//        provider.setRegistrationDate(LocalDate.now());
//        
//        Provider result = providerRepository.save(provider);
//        return ResponseEntity.created(new URI("/api/providers/" + result.getId()))
//            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
//            .body(result);
//    }
    
    @PostMapping("/create-new-provider")
	@Timed
	public Provider createProvider(
			@RequestParam("activities") List<Long> idActivity,
			@RequestParam("lastName") String lastName,
			@RequestParam("firstName") String firstName,
			@RequestParam("companyName") String companyName,
			@RequestParam("siret") String siret
			) throws URISyntaxException {

		Project project = new Project();
		Provider provider = new Provider();
		Provider result = null;
		User currentUserLogged;
		Long idUser;
		
		Optional<User> optional = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
		if (optional.isPresent()) {
			currentUserLogged = optional.get();
			idUser = currentUserLogged.getId();
			log.debug("id User logged : "+idUser);
			
			provider.setCompanyName(companyName);
			provider.setFirstName(firstName);
			provider.setIdUser(idUser);
			provider.setLastName(lastName);
			provider.setRegistrationDate(LocalDate.now());
			provider.setSiret(siret);
			
			result = providerRepository.save(provider);
			
			//Ajouter des activitées au projet
			for(Long idActivitee : idActivity){
				Activity activity = activityRepository.findOne(idActivitee);
				ProviderActivity providerActivity = new ProviderActivity();
				providerActivity.setActivityProvider(activity);
				providerActivity.setProviderProviderativity(result);
				providerActivityRepository.save(providerActivity);
			}
			
			
			
		}

		
		
		return result;
	}
}
