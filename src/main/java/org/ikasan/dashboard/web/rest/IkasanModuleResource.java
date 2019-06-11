package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.domain.IkasanModule;
import org.ikasan.dashboard.repository.IkasanModuleRepository;
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
 * REST controller for managing {@link org.ikasan.dashboard.domain.IkasanModule}.
 */
@RestController
@RequestMapping("/api")
public class IkasanModuleResource {

    private final Logger log = LoggerFactory.getLogger(IkasanModuleResource.class);

    private static final String ENTITY_NAME = "ikasanModule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IkasanModuleRepository ikasanModuleRepository;

    public IkasanModuleResource(IkasanModuleRepository ikasanModuleRepository) {
        this.ikasanModuleRepository = ikasanModuleRepository;
    }

    /**
     * {@code POST  /ikasan-modules} : Create a new ikasanModule.
     *
     * @param ikasanModule the ikasanModule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ikasanModule, or with status {@code 400 (Bad Request)} if the ikasanModule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ikasan-modules")
    public ResponseEntity<IkasanModule> createIkasanModule(@Valid @RequestBody IkasanModule ikasanModule) throws URISyntaxException {
        log.debug("REST request to save IkasanModule : {}", ikasanModule);
        if (ikasanModule.getId() != null) {
            throw new BadRequestAlertException("A new ikasanModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IkasanModule result = ikasanModuleRepository.save(ikasanModule);
        return ResponseEntity.created(new URI("/api/ikasan-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ikasan-modules} : Updates an existing ikasanModule.
     *
     * @param ikasanModule the ikasanModule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ikasanModule,
     * or with status {@code 400 (Bad Request)} if the ikasanModule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ikasanModule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ikasan-modules")
    public ResponseEntity<IkasanModule> updateIkasanModule(@Valid @RequestBody IkasanModule ikasanModule) throws URISyntaxException {
        log.debug("REST request to update IkasanModule : {}", ikasanModule);
        if (ikasanModule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IkasanModule result = ikasanModuleRepository.save(ikasanModule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ikasanModule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ikasan-modules} : get all the ikasanModules.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ikasanModules in body.
     */
    @GetMapping("/ikasan-modules")
    public List<IkasanModule> getAllIkasanModules() {
        log.debug("REST request to get all IkasanModules");
        return ikasanModuleRepository.findAll();
    }

    /**
     * {@code GET  /ikasan-modules/:id} : get the "id" ikasanModule.
     *
     * @param id the id of the ikasanModule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ikasanModule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ikasan-modules/{id}")
    public ResponseEntity<IkasanModule> getIkasanModule(@PathVariable Long id) {
        log.debug("REST request to get IkasanModule : {}", id);
        Optional<IkasanModule> ikasanModule = ikasanModuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ikasanModule);
    }

    /**
     * {@code DELETE  /ikasan-modules/:id} : delete the "id" ikasanModule.
     *
     * @param id the id of the ikasanModule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ikasan-modules/{id}")
    public ResponseEntity<Void> deleteIkasanModule(@PathVariable Long id) {
        log.debug("REST request to delete IkasanModule : {}", id);
        ikasanModuleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
