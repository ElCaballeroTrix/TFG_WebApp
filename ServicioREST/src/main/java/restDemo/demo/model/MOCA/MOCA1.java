package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA1 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("dibujo")
    private String dibujo;

    public MOCA1(String usuario, double tiempo, String dibujo) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.dibujo = dibujo;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getDibujo() {
        return dibujo;
    }
}
