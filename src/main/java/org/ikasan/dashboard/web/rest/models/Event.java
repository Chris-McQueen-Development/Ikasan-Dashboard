package org.ikasan.dashboard.web.rest.models;

import com.google.api.client.util.DateTime;

public class Event {
    String node;
    String eventType;
    DateTime eventTimestamp;

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

    public DateTime getEventTimestamp() {
        return eventTimestamp;
    }

    public void setEventTimestamp(DateTime eventTimestamp) {
        this.eventTimestamp = eventTimestamp;
    }

    // TODO: coordinates, angle, pointerType, type, etc
}
