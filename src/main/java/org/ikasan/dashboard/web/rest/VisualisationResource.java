package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.web.rest.models.Event;
import org.ikasan.dashboard.web.rest.models.VisualisationEdge;
import org.ikasan.dashboard.web.rest.models.VisualisationNode;
import org.ikasan.dashboard.web.rest.models.VisualisationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/channel/visualisation")
public class VisualisationResource {

    private static VisualisationResponse currentVisualisations = new VisualisationResponse();

    private static final Logger log = LoggerFactory.getLogger(VisualisationResource.class);

    @GetMapping("/")
    public VisualisationResponse getVisualisation() {
        log.info("REST request to visualisation end point made, returning in-memory results");
        return currentVisualisations;
    }

    @PostMapping("/edge")
    public void addEdge(@Valid @RequestBody VisualisationEdge edge) {
        log.info("Adding edge to current visualisation");

        if (edge.isValidFor(currentVisualisations)) {
            currentVisualisations.getEdges().add(edge);
            log.info("Added edge successfully");
        } else {
            log.error("Edge was not valid, not added");
            throw new RuntimeException("no node exists with the name specified in either to or from");
        }
    }

    @PostMapping("/node")
    public void addNode(@Valid @RequestBody VisualisationNode node) {
        log.info("Adding node to current visualisation");

        if(node.isValidFor(currentVisualisations)) {
            currentVisualisations.getNodes().add(node);
            log.info("Added node successfully");
        } else {
            log.error("node was not valid, not added");
            throw new RuntimeException("node with same name already exists");
        }
    }

    @PostMapping("/event")
    public void addEvent(@Valid @RequestBody Event event) {
        log.info("Event occurred and logged.");

        currentVisualisations.getEvents().add(event);
    }

    @DeleteMapping("/reset")
    public void reset() {
        currentVisualisations = new VisualisationResponse();
    }
}
