package org.ikasan.dashboard.web.rest.models;

public class Event {
    String node;
    String eventType;

    public Event() {

    }

    public String getNode() {
        return node;
    }

    public void setNode(String node) {
        this.node = node;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    // TODO: eventtimestamp, coordinates, angle, pointerType, type, etc
}
