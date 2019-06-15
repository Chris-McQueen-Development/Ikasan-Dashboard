package org.ikasan.dashboard.web.rest.models;

public class VisualisationNode {

    private String name;
    private String type;
    private VisualisationNodeStatus status;

    public VisualisationNode(){
        // required by jackson
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public VisualisationNodeStatus getStatus() {
        return status;
    }

    public void setStatus(VisualisationNodeStatus status) {
        this.status = status;
    }
}
