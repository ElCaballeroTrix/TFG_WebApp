package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Casilla {
    @JsonProperty("fila")
    private int fila=0;
    @JsonProperty("columna")
    private int columna=0;

    public Casilla(int fila, int columna) {
        this.fila = fila;
        this.columna = columna;
    }

    public int getFila() {
        return fila;
    }

    public int getColumna() {
        return columna;
    }

    @Override
    public String toString() {
        return "("+fila+","+columna+")";
    }
}
