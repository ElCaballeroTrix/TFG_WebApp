package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Coordenadas {
    @JsonProperty("x")
    private double x=0.0;
    @JsonProperty("y")
    private double y=0.0;

    public Coordenadas(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }
}
