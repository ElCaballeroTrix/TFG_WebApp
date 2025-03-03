package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Parejas {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("movimientos")
    private int movimientos=0;
    @JsonProperty("nivel")
    private int nivel=0;
    @JsonProperty("aciertos")
    private int aciertos=0;
    @JsonProperty("casillaSeleciona1")
    private Casilla casillaSelecciona1;
    @JsonProperty("casillaSeleciona2")
    private Casilla casillaSelecciona2;
    @JsonProperty("casillaValida")
    private Casilla casillaValida;
    @JsonProperty("ppi")
    private double ppi;
    @JsonProperty("tablero")
    private List<Integer> tablero;

    public Parejas(String usuario, double tiempo, int movimientos, int nivel, int aciertos, Casilla casillaSelecciona1, Casilla casillaSelecciona2, Casilla casillaValida, double ppi, List<Integer> tablero) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.movimientos = movimientos;
        this.nivel = nivel;
        this.aciertos = aciertos;
        this.casillaSelecciona1 = casillaSelecciona1;
        this.casillaSelecciona2 = casillaSelecciona2;
        this.casillaValida = casillaValida;
        this.ppi = ppi;
        this.tablero = tablero;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }

    public int getMovimientos() {
        return movimientos;
    }

    public int getNivel() {
        return nivel;
    }

    public int getAciertos() {
        return aciertos;
    }

    public Casilla getCasillaSelecciona1() {
        return casillaSelecciona1;
    }

    public Casilla getCasillaSelecciona2() {
        return casillaSelecciona2;
    }

    public Casilla getCasillaValida() {
        return casillaValida;
    }

    public double getPpi() {
        return ppi;
    }

    public List<Integer> getTablero() {
        return tablero;
    }
}
