package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.domain.IntegratedSystem;
import org.ikasan.dashboard.repository.IntegratedSystemRepository;
import org.ikasan.dashboard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.ikasan.dashboard.domain.IntegratedSystem}.
 */
@RestController
@RequestMapping("/api")
public class IntegratedSystemResource {

    private final Logger log = LoggerFactory.getLogger(IntegratedSystemResource.class);

    private static final String ENTITY_NAME = "integratedSystem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IntegratedSystemRepository integratedSystemRepository;

    public IntegratedSystemResource(IntegratedSystemRepository integratedSystemRepository) {
        this.integratedSystemRepository = integratedSystemRepository;
    }

    /**
     * {@code POST  /integrated-systems} : Create a new integratedSystem.
     *
     * @param integratedSystem the integratedSystem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new integratedSystem, or with status {@code 400 (Bad Request)} if the integratedSystem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/integrated-systems")
    public ResponseEntity<IntegratedSystem> createIntegratedSystem(@Valid @RequestBody IntegratedSystem integratedSystem) throws URISyntaxException {
        log.debug("REST request to save IntegratedSystem : {}", integratedSystem);
        if (integratedSystem.getId() != null) {
            throw new BadRequestAlertException("A new integratedSystem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntegratedSystem result = integratedSystemRepository.save(integratedSystem);
        return ResponseEntity.created(new URI("/api/integrated-systems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /integrated-systems} : Updates an existing integratedSystem.
     *
     * @param integratedSystem the integratedSystem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated integratedSystem,
     * or with status {@code 400 (Bad Request)} if the integratedSystem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the integratedSystem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/integrated-systems")
    public ResponseEntity<IntegratedSystem> updateIntegratedSystem(@Valid @RequestBody IntegratedSystem integratedSystem) throws URISyntaxException {
        log.debug("REST request to update IntegratedSystem : {}", integratedSystem);
        if (integratedSystem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IntegratedSystem result = integratedSystemRepository.save(integratedSystem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, integratedSystem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /integrated-systems} : get all the integratedSystems.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of integratedSystems in body.
     */
    @GetMapping("/integrated-systems")
    public List<IntegratedSystem> getAllIntegratedSystems(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all IntegratedSystems");
        return integratedSystemRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /integrated-systems/:id} : get the "id" integratedSystem.
     *
     * @param id the id of the integratedSystem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the integratedSystem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/integrated-systems/{id}")
    public ResponseEntity<IntegratedSystem> getIntegratedSystem(@PathVariable Long id) {
        log.debug("REST request to get IntegratedSystem : {}", id);
        Optional<IntegratedSystem> integratedSystem = integratedSystemRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(integratedSystem);
    }

    /**
     * {@code DELETE  /integrated-systems/:id} : delete the "id" integratedSystem.
     *
     * @param id the id of the integratedSystem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/integrated-systems/{id}")
    public ResponseEntity<Void> deleteIntegratedSystem(@PathVariable Long id) {
        log.debug("REST request to delete IntegratedSystem : {}", id);
        integratedSystemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
