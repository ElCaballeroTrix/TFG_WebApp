package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PuntosValidos {
    @JsonProperty("mayorQue")
    private Coordenadas mayorQue;
    @JsonProperty("menorQue")
    private Coordenadas menorQue;

    public PuntosValidos(Coordenadas mayorQue,Coordenadas menorQue) {
        this.mayorQue = mayorQue;
        this.menorQue=menorQue;
    }

    public Coordenadas getMayorQue() {
        return mayorQue;
    }

    public void setMayorQue(Coordenadas mayorQue) {
        this.mayorQue = mayorQue;
    }

    public Coordenadas getMenorQue() {
        return menorQue;
    }
}
