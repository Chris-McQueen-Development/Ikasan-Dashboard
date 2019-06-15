package org.ikasan.dashboard.web.rest.models;

import java.util.List;
import java.util.stream.Collectors;

public class VisualisationEdge {

    private String from;
    private String to;

    public VisualisationEdge() {
        // required by jackson
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public boolean isValidFor(VisualisationResponse state) {
        List<String> availableNodes = state
            .getNodes()
            .stream()
            .map(VisualisationNode::getName)
            .collect(Collectors.toList());

        return
            availableNodes.contains(getTo()) &&
            availableNodes.contains(getFrom()) &&
            !getTo().equals(getFrom());
    }
}
