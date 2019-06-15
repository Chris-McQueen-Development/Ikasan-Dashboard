package org.ikasan.dashboard.web.rest.models;

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
}
