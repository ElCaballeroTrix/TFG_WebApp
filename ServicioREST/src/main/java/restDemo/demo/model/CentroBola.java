package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
public class CentroBola {
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("puntoPulsado")
    private Coordenadas puntoPulsado;
    @JsonProperty("distancia")
    private double distanciaRespectoAlMedio;
    @JsonProperty("ppi")
    private double ppi;
    @JsonProperty("nivel")
    private int nivel=0;

    public CentroBola(double tiempo, String usuario, Coordenadas puntoClickeado, double distanciaRespectoAlMedio, double ppi, int nivel) {
        this.tiempo = tiempo;
        this.usuario = usuario;
        this.puntoPulsado = puntoClickeado;
        this.distanciaRespectoAlMedio = distanciaRespectoAlMedio;
        this.ppi = ppi;
        this.nivel = nivel;
    }


    public double getTiempo() {
        return tiempo;
    }

    public void setTiempo(double tiempo) {
        this.tiempo = tiempo;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public double getDistanciaRespectoAlMedio() {
        return distanciaRespectoAlMedio;
    }

    public void setDistanciaRespectoAlMedio(double distanciaRespectoAlMedio) {
        this.distanciaRespectoAlMedio = distanciaRespectoAlMedio;
    }
    public Coordenadas getPuntoPulsado() {
        return puntoPulsado;
    }

    public void setPuntoPulsado(Coordenadas puntoPulsado) {
        this.puntoPulsado = puntoPulsado;
    }

    public double getPpi() {
        return ppi;
    }

    public int getNivel() {
        return nivel;
    }
}
