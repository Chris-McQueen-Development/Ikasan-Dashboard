package org.ikasan.dashboard.web.rest.models;

import java.util.ArrayList;
import java.util.List;

public class VisualisationResponse {

    private List<VisualisationNode> nodes = new ArrayList<>();
    private List<VisualisationEdge> edges = new ArrayList<>();
    private List<Event> events = new ArrayList<>();

    public VisualisationResponse() {
        // required by jackson
    }

    public List<VisualisationNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<VisualisationNode> nodes) {
        this.nodes = nodes;
    }

    public List<VisualisationEdge> getEdges() {
        return edges;
    }

    public void setEdges(List<VisualisationEdge> edges) {
        this.edges = edges;
    }

    public List<Event> getEvents() { return events; }

    public void setEvents(List<Event> events) { this.events = events; }
}
