package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA2 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("dibujoReloj")
    private String dibujoReloj;

    public MOCA2(String usuario, double tiempo, String dibujoReloj) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.dibujoReloj = dibujoReloj;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getDibujoReloj() {
        return dibujoReloj;
    }
}
