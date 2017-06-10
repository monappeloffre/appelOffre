package fr.monappeloffre.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.monappeloffre.app.domain.ProjectPic;

import fr.monappeloffre.app.repository.ProjectPicRepository;
import fr.monappeloffre.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProjectPic.
 */
@RestController
@RequestMapping("/api")
public class ProjectPicResource {

    private final Logger log = LoggerFactory.getLogger(ProjectPicResource.class);

    private static final String ENTITY_NAME = "projectPic";

    private final ProjectPicRepository projectPicRepository;

    public ProjectPicResource(ProjectPicRepository projectPicRepository) {
        this.projectPicRepository = projectPicRepository;
    }

    /**
     * POST  /project-pics : Create a new projectPic.
     *
     * @param projectPic the projectPic to create
     * @return the ResponseEntity with status 201 (Created) and with body the new projectPic, or with status 400 (Bad Request) if the projectPic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/project-pics")
    @Timed
    public ResponseEntity<ProjectPic> createProjectPic(@RequestBody ProjectPic projectPic) throws URISyntaxException {
        log.debug("REST request to save ProjectPic : {}", projectPic);
        if (projectPic.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new projectPic cannot already have an ID")).body(null);
        }
        ProjectPic result = projectPicRepository.save(projectPic);
        return ResponseEntity.created(new URI("/api/project-pics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /project-pics : Updates an existing projectPic.
     *
     * @param projectPic the projectPic to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated projectPic,
     * or with status 400 (Bad Request) if the projectPic is not valid,
     * or with status 500 (Internal Server Error) if the projectPic couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/project-pics")
    @Timed
    public ResponseEntity<ProjectPic> updateProjectPic(@RequestBody ProjectPic projectPic) throws URISyntaxException {
        log.debug("REST request to update ProjectPic : {}", projectPic);
        if (projectPic.getId() == null) {
            return createProjectPic(projectPic);
        }
        ProjectPic result = projectPicRepository.save(projectPic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projectPic.getId().toString()))
            .body(result);
    }

    /**
     * GET  /project-pics : get all the projectPics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of projectPics in body
     */
    @GetMapping("/project-pics")
    @Timed
    public List<ProjectPic> getAllProjectPics() {
        log.debug("REST request to get all ProjectPics");
        return projectPicRepository.findAll();
    }

    /**
     * GET  /project-pics/:id : get the "id" projectPic.
     *
     * @param id the id of the projectPic to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the projectPic, or with status 404 (Not Found)
     */
    @GetMapping("/project-pics/{id}")
    @Timed
    public ResponseEntity<ProjectPic> getProjectPic(@PathVariable Long id) {
        log.debug("REST request to get ProjectPic : {}", id);
        ProjectPic projectPic = projectPicRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(projectPic));
    }

    /**
     * DELETE  /project-pics/:id : delete the "id" projectPic.
     *
     * @param id the id of the projectPic to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/project-pics/{id}")
    @Timed
    public ResponseEntity<Void> deleteProjectPic(@PathVariable Long id) {
        log.debug("REST request to delete ProjectPic : {}", id);
        projectPicRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
