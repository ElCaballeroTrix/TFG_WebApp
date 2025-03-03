package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA7 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("palabra1")
    private String palabra1;
    @JsonProperty("palabra2")
    private String palabra2;
    @JsonProperty("palabra3")
    private String palabra3;
    @JsonProperty("palabra4")
    private String palabra4;
    @JsonProperty("palabra5")
    private String palabra5;
    @JsonProperty("pistaPalabra1")
    private boolean pistaPalabra1;
    @JsonProperty("pistaPalabra2")
    private boolean pistaPalabra2;
    @JsonProperty("pistaPalabra3")
    private boolean pistaPalabra3;
    @JsonProperty("pistaPalabra4")
    private boolean pistaPalabra4;
    @JsonProperty("pistaPalabra5")
    private boolean pistaPalabra5;
    @JsonProperty("diaMes")
    private String diames;
    @JsonProperty("mes")
    private String mes;
    @JsonProperty("anio")
    private String año;
    @JsonProperty("diaSemana")
    private String diaSemana;
    @JsonProperty("lugar")
    private String lugar;
    @JsonProperty("localidad")
    private String localidad;

    public MOCA7(String usuario, double tiempo, String palabra1, String palabra2, String palabra3, String palabra4, String palabra5, boolean pistaPalabra1, boolean pistaPalabra2, boolean pistaPalabra3, boolean pistaPalabra4, boolean pistaPalabra5, String diames, String mes, String año, String diaSemana, String lugar, String localidad) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.palabra1 = palabra1;
        this.palabra2 = palabra2;
        this.palabra3 = palabra3;
        this.palabra4 = palabra4;
        this.palabra5 = palabra5;
        this.pistaPalabra1 = pistaPalabra1;
        this.pistaPalabra2 = pistaPalabra2;
        this.pistaPalabra3 = pistaPalabra3;
        this.pistaPalabra4 = pistaPalabra4;
        this.pistaPalabra5 = pistaPalabra5;
        this.diames = diames;
        this.mes = mes;
        this.año = año;
        this.diaSemana = diaSemana;
        this.lugar = lugar;
        this.localidad = localidad;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getPalabra1() {
        return palabra1;
    }

    public String getPalabra2() {
        return palabra2;
    }

    public String getPalabra3() {
        return palabra3;
    }

    public String getPalabra4() {
        return palabra4;
    }

    public String getPalabra5() {
        return palabra5;
    }

    public boolean isPistaPalabra1() {
        return pistaPalabra1;
    }

    public boolean isPistaPalabra2() {
        return pistaPalabra2;
    }

    public boolean isPistaPalabra3() {
        return pistaPalabra3;
    }

    public boolean isPistaPalabra4() {
        return pistaPalabra4;
    }

    public boolean isPistaPalabra5() {
        return pistaPalabra5;
    }

    public String getDiames() {
        return diames;
    }

    public String getMes() {
        return mes;
    }

    public String getAño() {
        return año;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public String getLugar() {
        return lugar;
    }

    public String getLocalidad() {
        return localidad;
    }
}
