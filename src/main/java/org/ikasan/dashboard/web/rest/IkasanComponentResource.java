package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.domain.IkasanComponent;
import org.ikasan.dashboard.repository.IkasanComponentRepository;
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
 * REST controller for managing {@link org.ikasan.dashboard.domain.IkasanComponent}.
 */
@RestController
@RequestMapping("/api")
public class IkasanComponentResource {

    private final Logger log = LoggerFactory.getLogger(IkasanComponentResource.class);

    private static final String ENTITY_NAME = "ikasanComponent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IkasanComponentRepository ikasanComponentRepository;

    public IkasanComponentResource(IkasanComponentRepository ikasanComponentRepository) {
        this.ikasanComponentRepository = ikasanComponentRepository;
    }

    /**
     * {@code POST  /ikasan-components} : Create a new ikasanComponent.
     *
     * @param ikasanComponent the ikasanComponent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ikasanComponent, or with status {@code 400 (Bad Request)} if the ikasanComponent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ikasan-components")
    public ResponseEntity<IkasanComponent> createIkasanComponent(@Valid @RequestBody IkasanComponent ikasanComponent) throws URISyntaxException {
        log.debug("REST request to save IkasanComponent : {}", ikasanComponent);
        if (ikasanComponent.getId() != null) {
            throw new BadRequestAlertException("A new ikasanComponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IkasanComponent result = ikasanComponentRepository.save(ikasanComponent);
        return ResponseEntity.created(new URI("/api/ikasan-components/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ikasan-components} : Updates an existing ikasanComponent.
     *
     * @param ikasanComponent the ikasanComponent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ikasanComponent,
     * or with status {@code 400 (Bad Request)} if the ikasanComponent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ikasanComponent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ikasan-components")
    public ResponseEntity<IkasanComponent> updateIkasanComponent(@Valid @RequestBody IkasanComponent ikasanComponent) throws URISyntaxException {
        log.debug("REST request to update IkasanComponent : {}", ikasanComponent);
        if (ikasanComponent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IkasanComponent result = ikasanComponentRepository.save(ikasanComponent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ikasanComponent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ikasan-components} : get all the ikasanComponents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ikasanComponents in body.
     */
    @GetMapping("/ikasan-components")
    public List<IkasanComponent> getAllIkasanComponents() {
        log.debug("REST request to get all IkasanComponents");
        return ikasanComponentRepository.findAll();
    }

    /**
     * {@code GET  /ikasan-components/:id} : get the "id" ikasanComponent.
     *
     * @param id the id of the ikasanComponent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ikasanComponent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ikasan-components/{id}")
    public ResponseEntity<IkasanComponent> getIkasanComponent(@PathVariable Long id) {
        log.debug("REST request to get IkasanComponent : {}", id);
        Optional<IkasanComponent> ikasanComponent = ikasanComponentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ikasanComponent);
    }

    /**
     * {@code DELETE  /ikasan-components/:id} : delete the "id" ikasanComponent.
     *
     * @param id the id of the ikasanComponent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ikasan-components/{id}")
    public ResponseEntity<Void> deleteIkasanComponent(@PathVariable Long id) {
        log.debug("REST request to delete IkasanComponent : {}", id);
        ikasanComponentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
