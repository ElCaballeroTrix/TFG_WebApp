package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Memoria {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("movimientos")
    private int movimientos=0;
    @JsonProperty("nivel")
    private String nivel;
    @JsonProperty("aciertos")
    private int aciertos=0;
    @JsonProperty("temporizador")
    private String temporizador;
    @JsonProperty("casillaSeleciona")
    private Casilla casillaSelecciona;
    @JsonProperty("casillasValida")
    private List<Casilla> casillasValida;
    @JsonProperty("ppi")
    private double ppi;
    @JsonProperty("tablero")
    private List<String> tablero;

    public Memoria(String usuario, double tiempo, int movimientos, String nivel, int aciertos, String temporizador, Casilla casillaSelecciona, List<Casilla> casillasValida, double ppi, List<String> tablero) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.movimientos = movimientos;
        this.nivel = nivel;
        this.aciertos = aciertos;
        this.temporizador = temporizador;
        this.casillaSelecciona = casillaSelecciona;
        this.casillasValida = casillasValida;
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

    public String getNivel() {
        return nivel;
    }

    public int getAciertos() {
        return aciertos;
    }

    public String getTemporizador() {
        return temporizador;
    }

    public Casilla getCasillaSelecciona() {
        return casillaSelecciona;
    }

    public List<Casilla> getCasillasValida() {
        return casillasValida;
    }

    public double getPpi() {
        return ppi;
    }

    public List<String> getTablero() {
        return tablero;
    }
}
