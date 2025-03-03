package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ArrastraYSuelta {
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
    @JsonProperty("nombreElementoEscogido")
    private String nombreElementoEscogido;
    @JsonProperty("casillaSeleciona")
    private Casilla casillaSelecciona;
    @JsonProperty("casillaValida")
    private Casilla casillaValida;
    @JsonProperty("listaObjetos")
    private List<String> listaObjetos;
    @JsonProperty("listaCajas")
    private List<String> listaCajas;
    @JsonProperty("ppi")
    private double ppi;

    public ArrastraYSuelta(String usuario, double tiempo, int movimientos, int nivel, int aciertos, String nombreElementoEscogido, Casilla casillaSelecciona, Casilla casillaValida, List<String> listaObjetos, List<String> listaCajas, double ppi) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.movimientos = movimientos;
        this.nivel = nivel;
        this.aciertos = aciertos;
        this.nombreElementoEscogido = nombreElementoEscogido;
        this.casillaSelecciona = casillaSelecciona;
        this.casillaValida = casillaValida;
        this.listaObjetos = listaObjetos;
        this.listaCajas = listaCajas;
        this.ppi = ppi;
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

    public String getNombreElementoEscogido() {
        return nombreElementoEscogido;
    }

    public Casilla getCasillaSelecciona() {
        return casillaSelecciona;
    }

    public Casilla getCasillaValida() {
        return casillaValida;
    }

    public List<String> getListaObjetos() {
        return listaObjetos;
    }

    public List<String> getListaCajas() {
        return listaCajas;
    }

    public double getPpi() {
        return ppi;
    }
}
