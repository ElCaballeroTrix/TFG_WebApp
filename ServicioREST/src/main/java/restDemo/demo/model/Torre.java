package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Torre {
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("casillaPulsada")
    private Casilla casillaPulsada;
    @JsonProperty("casillaValida")
    private Casilla casillaValida;
    @JsonProperty("ppi")
    private double ppi;
    @JsonProperty("nivel")
    private int nivel=0;
    @JsonProperty("fuerzaJugador")
    private int fuerzaJugador=0;
    @JsonProperty("tablero")
    private List<List<String>> tablero;

    public Torre(double tiempo, String usuario, Casilla puntoClickeado, Casilla puntoValido, double ppi, int nivel, int fuerzaJugador, List<List<String>> tablero) {
        this.tiempo = tiempo;
        this.usuario = usuario;
        this.casillaPulsada = puntoClickeado;
        this.casillaValida = puntoValido;
        this.ppi = ppi;
        this.nivel = nivel;
        this.fuerzaJugador = fuerzaJugador;
        this.tablero = tablero;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getUsuario() {
        return usuario;
    }

    public Casilla getCasillaPulsada() {
        return casillaPulsada;
    }

    public Casilla getCasillaValida() {
        return casillaValida;
    }

    public double getPpi() {
        return ppi;
    }

    public int getNivel() {
        return nivel;
    }

    public int getFuerzaJugador() {
        return fuerzaJugador;
    }

    public List<List<String>> getTablero() {
        return tablero;
    }
}
