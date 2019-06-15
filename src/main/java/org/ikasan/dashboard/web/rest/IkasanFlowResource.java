package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.domain.IkasanFlow;
import org.ikasan.dashboard.repository.IkasanFlowRepository;
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
 * REST controller for managing {@link org.ikasan.dashboard.domain.IkasanFlow}.
 */
@RestController
@RequestMapping("/api")
public class IkasanFlowResource {

    private final Logger log = LoggerFactory.getLogger(IkasanFlowResource.class);

    private static final String ENTITY_NAME = "ikasanFlow";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IkasanFlowRepository ikasanFlowRepository;

    public IkasanFlowResource(IkasanFlowRepository ikasanFlowRepository) {
        this.ikasanFlowRepository = ikasanFlowRepository;
    }

    /**
     * {@code POST  /ikasan-flows} : Create a new ikasanFlow.
     *
     * @param ikasanFlow the ikasanFlow to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ikasanFlow, or with status {@code 400 (Bad Request)} if the ikasanFlow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ikasan-flows")
    public ResponseEntity<IkasanFlow> createIkasanFlow(@Valid @RequestBody IkasanFlow ikasanFlow) throws URISyntaxException {
        log.debug("REST request to save IkasanFlow : {}", ikasanFlow);
        if (ikasanFlow.getId() != null) {
            throw new BadRequestAlertException("As new ikasanFlow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IkasanFlow result = ikasanFlowRepository.save(ikasanFlow);
        return ResponseEntity.created(new URI("/api/ikasan-flows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ikasan-flows} : Updates an existing ikasanFlow.
     *
     * @param ikasanFlow the ikasanFlow to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ikasanFlow,
     * or with status {@code 400 (Bad Request)} if the ikasanFlow is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ikasanFlow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ikasan-flows")
    public ResponseEntity<IkasanFlow> updateIkasanFlow(@Valid @RequestBody IkasanFlow ikasanFlow) throws URISyntaxException {
        log.debug("REST request to update IkasanFlow : {}", ikasanFlow);
        if (ikasanFlow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IkasanFlow result = ikasanFlowRepository.save(ikasanFlow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ikasanFlow.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ikasan-flows} : get all the ikasanFlows.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ikasanFlows in body.
     */
    @GetMapping("/ikasan-flows")
    public List<IkasanFlow> getAllIkasanFlows() {
        log.debug("REST request to get all IkasanFlows");
        return ikasanFlowRepository.findAll();
    }

    /**
     * {@code GET  /ikasan-flows/:id} : get the "id" ikasanFlow.
     *
     * @param id the id of the ikasanFlow to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ikasanFlow, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ikasan-flows/{id}")
    public ResponseEntity<IkasanFlow> getIkasanFlow(@PathVariable Long id) {
        log.debug("REST request to get IkasanFlow : {}", id);
        Optional<IkasanFlow> ikasanFlow = ikasanFlowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ikasanFlow);
    }

    /**
     * {@code DELETE  /ikasan-flows/:id} : delete the "id" ikasanFlow.
     *
     * @param id the id of the ikasanFlow to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ikasan-flows/{id}")
    public ResponseEntity<Void> deleteIkasanFlow(@PathVariable Long id) {
        log.debug("REST request to delete IkasanFlow : {}", id);
        ikasanFlowRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
