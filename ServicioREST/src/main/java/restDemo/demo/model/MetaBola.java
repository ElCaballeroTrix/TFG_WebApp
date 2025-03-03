package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MetaBola {
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("usuarioDetuvoLaBola")
    private boolean usuarioDetuvoLaBola;
    @JsonProperty("puntoPulsado")
    private Coordenadas puntoPulsado;
    @JsonProperty("puntosValidos")
    private PuntosValidos puntosValidos;
    @JsonProperty("distancia")
    private double distanciaRespectoARespuestaMasCercana;
    @JsonProperty("ppi")
    private double ppi;
    @JsonProperty("nivel")
    private int nivel=0;

    public MetaBola(double tiempo, String usuario, boolean usuarioDetuvoLaBola, Coordenadas puntoClickeado, PuntosValidos puntosValidos, double distanciaRespectoARespuestaMasCercana, double ppi, int nivel) {
        this.tiempo = tiempo;
        this.usuario = usuario;
        this.usuarioDetuvoLaBola = usuarioDetuvoLaBola;
        this.puntoPulsado = puntoClickeado;
        this.puntosValidos = puntosValidos;
        this.distanciaRespectoARespuestaMasCercana = distanciaRespectoARespuestaMasCercana;
        this.ppi = ppi;
        this.nivel = nivel;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getUsuario() {
        return usuario;
    }

    public boolean isUsuarioDetuvoLaBola() {
        return usuarioDetuvoLaBola;
    }

    public Coordenadas getPuntoPulsado() {
        return puntoPulsado;
    }

    public PuntosValidos getPuntosValidos() {
        return puntosValidos;
    }

    public double getDistanciaRespectoARespuestaMasCercana() {
        return distanciaRespectoARespuestaMasCercana;
    }

    public double getPpi() {
        return ppi;
    }

    public int getNivel() {
        return nivel;
    }
}
